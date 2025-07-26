import { FirebaseTransformer } from './firebase-transformer';

interface FirebaseRecipe {
	id: string;
	name: string;
	description: string;
	ingredients: Array<{
		name: string;
		amount: number;
		unit: string;
	}>;
	instructions: Array<{
		stepNumber: number;
		description: string;
	}>;
	prepTime: number;
	cookTime: number;
	servings: number;
	mealTypes: string[];
	dietTypes: string[];
	tags: Array<{ name: string }>;
	difficulty: string;
	nutritionalInfo: {
		calories: number;
		protein: number;
		carbohydrates: number;
		fat: number;
		fiber: number;
	};
	imageUrl?: string;
	createdAt?: any;
	updatedAt?: any;
	// Firebase-only fields (will be ignored)
	imageId?: string;
	imageMetadata?: any;
	imageGeneratedAt?: any;
	chillTime?: number;
	totalTime?: number;
}

interface MongoRecipe {
	name: string;
	description: string;
	ingredients: Array<{
		name: string;
		amount: number;
		unit: string;
	}>;
	instructions: Array<{
		stepNumber: number;
		description: string;
	}>;
	prepTime: number;
	cookTime: number;
	servings: number;
	cuisines: string[];
	mealTypes: string[];
	dietTypes: string[];
	tags: Array<{ name: string }>;
	difficulty: string;
	nutritionalInfo: {
		calories: number;
		protein: number;
		carbohydrates: number;
		fat: number;
		fiber: number;
	};
	imageUrl?: string;
	createdBy?: string;
	firebaseId?: string;
}

/**
 * Utility for mapping Firebase recipe data to MongoDB schema format
 */
export class RecipeMapper {
	/**
	 * Maps a Firebase recipe to MongoDB format
	 * @param firebaseRecipe Recipe data from Firebase
	 * @returns Recipe data compatible with MongoDB schema
	 */
	static mapFirebaseToMongo(firebaseRecipe: FirebaseRecipe): MongoRecipe {
		// Transform any Firebase timestamps
		const transformed = FirebaseTransformer.transformTimestamps(firebaseRecipe);

		return {
			name: transformed.name,
			description: transformed.description,
			ingredients: transformed.ingredients || [],
			instructions: transformed.instructions || [],
			prepTime: transformed.prepTime || 0,
			cookTime: transformed.cookTime || 0,
			servings: transformed.servings || 1,
			cuisines: [], // Default empty array as Firebase doesn't have this field
			mealTypes: transformed.mealTypes || [],
			dietTypes: transformed.dietTypes || [],
			tags: transformed.tags || [],
			difficulty: transformed.difficulty || 'easy',
			nutritionalInfo: transformed.nutritionalInfo || {
				calories: 0,
				protein: 0,
				carbohydrates: 0,
				fat: 0,
				fiber: 0
			},
			imageUrl: transformed.imageUrl,
			firebaseId: firebaseRecipe.id,
			// Note: We don't set createdBy as these are imported recipes
		};
	}

	/**
	 * Validates that a Firebase recipe has required fields
	 * @param recipe Recipe to validate
	 * @returns Array of validation errors, empty if valid
	 */
	static validateFirebaseRecipe(recipe: any): string[] {
		const errors: string[] = [];

		if (!recipe.name || typeof recipe.name !== 'string') {
			errors.push('Missing or invalid name');
		}

		if (!recipe.description || typeof recipe.description !== 'string') {
			errors.push('Missing or invalid description');
		}

		if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
			errors.push('Missing or empty ingredients array');
		}

		if (!Array.isArray(recipe.instructions) || recipe.instructions.length === 0) {
			errors.push('Missing or empty instructions array');
		}

		if (typeof recipe.prepTime !== 'number' || recipe.prepTime < 0) {
			errors.push('Missing or invalid prepTime');
		}

		if (typeof recipe.cookTime !== 'number' || recipe.cookTime < 0) {
			errors.push('Missing or invalid cookTime');
		}

		if (typeof recipe.servings !== 'number' || recipe.servings < 1) {
			errors.push('Missing or invalid servings');
		}

		if (!Array.isArray(recipe.mealTypes) || recipe.mealTypes.length === 0) {
			errors.push('Missing or empty mealTypes array');
		}

		if (!recipe.difficulty || typeof recipe.difficulty !== 'string') {
			errors.push('Missing or invalid difficulty');
		}

		return errors;
	}

	/**
	 * Maps multiple Firebase recipes to MongoDB format with validation
	 * @param firebaseRecipes Array of Firebase recipes
	 * @returns Object with successful mappings and errors
	 */
	static mapMultipleRecipes(firebaseRecipes: any[]): {
		successful: MongoRecipe[];
		errors: Array<{ index: number; recipe: any; errors: string[] }>;
	} {
		const successful: MongoRecipe[] = [];
		const errors: Array<{ index: number; recipe: any; errors: string[] }> = [];

		firebaseRecipes.forEach((recipe, index) => {
			const validationErrors = this.validateFirebaseRecipe(recipe);
			
			if (validationErrors.length > 0) {
				errors.push({ index, recipe, errors: validationErrors });
			} else {
				try {
					const mapped = this.mapFirebaseToMongo(recipe);
					successful.push(mapped);
				} catch (error) {
					errors.push({ 
						index, 
						recipe, 
						errors: [`Mapping error: ${error instanceof Error ? error.message : 'Unknown error'}`] 
					});
				}
			}
		});

		return { successful, errors };
	}
}