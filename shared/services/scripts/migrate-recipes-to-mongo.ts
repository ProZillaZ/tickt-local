import fs from 'fs';
import path from 'path';
import { MongoClient, Db } from 'mongodb';
import { RecipeMapper } from '../utils/recipe-mapper';

interface MigrationConfig {
	mongoUrl: string;
	databaseName: string;
	collectionName: string;
	recipesFilePath: string;
	batchSize: number;
	dryRun: boolean;
}

interface MigrationResult {
	totalRecipes: number;
	successfulMigrations: number;
	errors: Array<{ index: number; recipe: any; errors: string[] }>;
	insertErrors: Array<{ recipe: any; error: string }>;
}

/**
 * Recipe migration utility for importing Firebase recipes into MongoDB
 */
class RecipeMigration {
	private config: MigrationConfig;
	private client: MongoClient | null = null;
	private db: Db | null = null;

	constructor(config: MigrationConfig) {
		this.config = config;
	}

	/**
	 * Connects to MongoDB
	 */
	private async connect(): Promise<void> {
		console.log('Connecting to MongoDB...');
		this.client = new MongoClient(this.config.mongoUrl);
		await this.client.connect();
		this.db = this.client.db(this.config.databaseName);
		console.log(`Connected to database: ${this.config.databaseName}`);
	}

	/**
	 * Disconnects from MongoDB
	 */
	private async disconnect(): Promise<void> {
		if (this.client) {
			await this.client.close();
			console.log('Disconnected from MongoDB');
		}
	}

	/**
	 * Reads and parses the recipes JSON file
	 */
	private readRecipesFile(): any[] {
		console.log(`Reading recipes from: ${this.config.recipesFilePath}`);

		if (!fs.existsSync(this.config.recipesFilePath)) {
			throw new Error(`Recipes file not found: ${this.config.recipesFilePath}`);
		}

		const fileContent = fs.readFileSync(this.config.recipesFilePath, 'utf-8');
		const recipes = JSON.parse(fileContent);

		if (!Array.isArray(recipes)) {
			throw new Error('Recipes file must contain an array of recipes');
		}

		console.log(`Found ${recipes.length} recipes in file`);
		return recipes;
	}

	/**
	 * Inserts recipes in batches
	 */
	private async insertRecipesBatch(recipes: any[]): Promise<Array<{ recipe: any; error: string }>> {
		if (!this.db) {
			throw new Error('Database connection not established');
		}

		const collection = this.db.collection(this.config.collectionName);
		const insertErrors: Array<{ recipe: any; error: string }> = [];

		// Process in batches
		for (let i = 0; i < recipes.length; i += this.config.batchSize) {
			const batch = recipes.slice(i, i + this.config.batchSize);
			console.log(`Processing batch ${Math.floor(i / this.config.batchSize) + 1}/${Math.ceil(recipes.length / this.config.batchSize)} (${batch.length} recipes)`);

			if (this.config.dryRun) {
				console.log('DRY RUN: Would insert batch of', batch.length, 'recipes');
				continue;
			}

			try {
				const result = await collection.insertMany(batch, { ordered: false });
				console.log(`Successfully inserted ${result.insertedCount} recipes in this batch`);
			} catch (error: any) {
				console.error('Batch insert error:', error.message);

				// Handle individual insert failures in unordered mode
				if (error.writeErrors) {
					error.writeErrors.forEach((writeError: any) => {
						const failedRecipe = batch[writeError.index];
						insertErrors.push({
							recipe: failedRecipe,
							error: writeError.errmsg || 'Unknown insert error'
						});
					});
				} else {
					// If we can't determine individual failures, mark the whole batch
					batch.forEach(recipe => {
						insertErrors.push({
							recipe,
							error: error.message || 'Batch insert failed'
						});
					});
				}
			}

			// Small delay between batches to avoid overwhelming the database
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		return insertErrors;
	}

	/**
	 * Checks if the collection already has recipes (to prevent accidental duplicates)
	 */
	private async checkExistingRecipes(): Promise<number> {
		if (!this.db) {
			throw new Error('Database connection not established');
		}

		const collection = this.db.collection(this.config.collectionName);
		const count = await collection.countDocuments();
		console.log(`Found ${count} existing recipes in collection`);
		return count;
	}

	/**
	 * Runs the complete migration process
	 */
	async migrate(): Promise<MigrationResult> {
		const startTime = Date.now();
		console.log('Starting recipe migration...');
		console.log('Configuration:', {
			...this.config,
			mongoUrl: this.config.mongoUrl.replace(/\/\/.*@/, '//***:***@') // Hide credentials in logs
		});

		try {
			// Connect to database
			await this.connect();

			// Check existing recipes
			const existingCount = await this.checkExistingRecipes();
			if (existingCount > 0 && !this.config.dryRun) {
				const proceed = process.argv.includes('--force');
				if (!proceed) {
					throw new Error(`Collection already contains ${existingCount} recipes. Use --force to proceed anyway.`);
				}
				console.log('Proceeding with migration despite existing recipes (--force flag detected)');
			}

			// Read recipes file
			const firebaseRecipes = this.readRecipesFile();

			// Map and validate recipes
			console.log('Mapping Firebase recipes to MongoDB format...');
			const { successful, errors } = RecipeMapper.mapMultipleRecipes(firebaseRecipes);

			console.log(`Successfully mapped ${successful.length} recipes`);
			if (errors.length > 0) {
				console.warn(`Found ${errors.length} recipes with validation errors`);
				errors.forEach(({ index, errors: validationErrors }) => {
					console.warn(`Recipe ${index}: ${validationErrors.join(', ')}`);
				});
			}

			// Insert recipes
			let insertErrors: Array<{ recipe: any; error: string }> = [];
			if (successful.length > 0) {
				console.log(`Inserting ${successful.length} recipes into MongoDB...`);
				insertErrors = await this.insertRecipesBatch(successful);
			}

			// Calculate results
			const result: MigrationResult = {
				totalRecipes: firebaseRecipes.length,
				successfulMigrations: successful.length - insertErrors.length,
				errors,
				insertErrors
			};

			// Final summary
			const duration = ((Date.now() - startTime) / 1000).toFixed(2);
			console.log('\n=== Migration Summary ===');
			console.log(`Total recipes in file: ${result.totalRecipes}`);
			console.log(`Successfully migrated: ${result.successfulMigrations}`);
			console.log(`Validation errors: ${result.errors.length}`);
			console.log(`Insert errors: ${result.insertErrors.length}`);
			console.log(`Duration: ${duration}s`);
			console.log(`Mode: ${this.config.dryRun ? 'DRY RUN' : 'LIVE'}`);

			if (result.insertErrors.length > 0) {
				console.log('\nInsert errors:');
				result.insertErrors.forEach(({ error }, index) => {
					console.log(`${index + 1}. ${error}`);
				});
			}

			return result;

		} finally {
			await this.disconnect();
		}
	}
}

/**
 * Main execution function
 */
async function main() {
	// Configuration
	const config: MigrationConfig = {
		mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017',
		databaseName: process.env.DATABASE_NAME || 'mealtickt',
		collectionName: 'recipes',
		recipesFilePath: path.join(__dirname, '../../../apis/src/recipes/data/recipes.json'),
		batchSize: 50,
		dryRun: process.argv.includes('--dry-run')
	};

	const migration = new RecipeMigration(config);

	try {
		const result = await migration.migrate();

		// Exit with appropriate code
		const hasErrors = result.errors.length > 0 || result.insertErrors.length > 0;
		process.exit(hasErrors ? 1 : 0);

	} catch (error) {
		console.error('Migration failed:', error instanceof Error ? error.message : error);
		process.exit(1);
	}
}

// Run if this file is executed directly
if (require.main === module) {
	main();
}
