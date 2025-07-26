import { Injectable, Logger } from '@nestjs/common';
import { RecipesService } from '../recipes.service';
import { RecipeQueryDto } from '../dto/recipe-query.dto';
import { RecipeDocument } from '../schemas/recipe.schema';
import { UserProfile } from '@tickt-ltd/types'

@Injectable()
export class RecipeSelectionService {
	private readonly logger = new Logger(RecipeSelectionService.name);

	constructor(private readonly recipesService: RecipesService) {}

	/**
	 * Selects recipes based on user criteria and preferences
	 */
	async selectRecipes(userProfile: UserProfile): Promise<RecipeDocument[]> {
		try {
			const recipes = await this.selectRecipesByCriteria(userProfile);

			if (!recipes || recipes.length === 0) {
				this.logger.warn('No recipes found matching user criteria');
				return [];
			}

			this.logger.log(`Found ${recipes.length} recipes matching criteria`);
			return recipes;

		} catch (error) {
			this.logger.error(`Failed to select recipes: ${error.message}`, error.stack);
			return [];
		}
	}

	/**
	 * Selects recipes based on user criteria with multi-cuisine support and fallback strategy
	 */
	private async selectRecipesByCriteria(userProfile: UserProfile): Promise<RecipeDocument[]> {
		const { dietFilters } = userProfile;
		const allRecipes: RecipeDocument[] = [];
		const recipesPerCuisine = 50;

		// If no favorite cuisines specified, get general recipes
		if (!dietFilters?.favoriteCuisines || dietFilters.favoriteCuisines.length === 0) {
			this.logger.log('No favorite cuisines specified, fetching general recipes');
			const query = this.buildBaseQuery(userProfile, 100);
			const response = await this.recipesService.findAll(query);
			return response.data || [];
		}

		this.logger.log(`Attempting to find recipes for cuisines: ${dietFilters.favoriteCuisines.join(', ')}`);

		for (const cuisine of dietFilters.favoriteCuisines) {
			try {
				const query = this.buildBaseQuery(userProfile, recipesPerCuisine);
				query.cuisine = cuisine as any; // Cast to match enum type

				const response = await this.recipesService.findAll(query);
				const cuisineRecipes = response.data || [];

				this.logger.log(`Found ${cuisineRecipes.length} recipes for cuisine: ${cuisine}`);
				allRecipes.push(...cuisineRecipes);
			} catch (error) {
				this.logger.warn(`Failed to fetch recipes for cuisine ${cuisine}: ${error.message}`);
			}
		}

		const uniqueRecipes = this.removeDuplicateRecipes(allRecipes);
		this.logger.log(`Found ${uniqueRecipes.length} unique recipes across ${dietFilters.favoriteCuisines.length} cuisines`);

		if (uniqueRecipes.length === 0) {
			this.logger.warn(`No recipes found for specified cuisines: ${dietFilters.favoriteCuisines.join(', ')}`);
			this.logger.log('Executing fallback strategy: fetching general recipes for diet type');

			const fallbackQuery = this.buildBaseQuery(userProfile, 100);
			// Don't specify cuisine in fallback query to get all recipes for the diet type
			const fallbackResponse = await this.recipesService.findAll(fallbackQuery);
			const fallbackRecipes = fallbackResponse.data || [];

			this.logger.log(`Fallback strategy found ${fallbackRecipes.length} general recipes for diet type: ${userProfile.dietType}`);

			if (fallbackRecipes.length > 0) {
				this.logger.log('Sample fallback recipes:');
				fallbackRecipes.slice(0, 3).forEach((recipe, index) => {
					this.logger.log(`   ${index + 1}. "${recipe.name}" [Cuisines: ${recipe.cuisines?.join(', ') || 'None'}]`);
				});
			}

			return fallbackRecipes;
		}

		return uniqueRecipes;
	}

	/**
	 * Builds base recipe query with common filters
	 */
	private buildBaseQuery(userProfile: import('@tickt-ltd/types').UserProfile, limit: number): RecipeQueryDto {
		const query = new RecipeQueryDto();

		query.dietType = userProfile.dietType;
		query.limit = limit;

		return query;
	}

	/**
	 * Removes duplicate recipes based on ID
	 */
	private removeDuplicateRecipes(recipes: RecipeDocument[]): RecipeDocument[] {
		const seen = new Set<string>();
		return recipes.filter(recipe => {
			const id = recipe._id.toString();
			if (seen.has(id)) {
				return false;
			}
			seen.add(id);
			return true;
		});
	}

}