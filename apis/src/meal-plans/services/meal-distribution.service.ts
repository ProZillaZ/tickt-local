import { Injectable, Logger } from '@nestjs/common';
import { Recipe } from '@tickt-ltd/types';
import { RecipeDocument } from '../../recipes/schemas/recipe.schema';
import { RecipeMapper } from '../../recipes/mappers/recipe.mapper';
import { MealType } from '@tickt-ltd/types/nutrition/enums/meal-type.enum';

@Injectable()
export class MealDistributionService {
	private readonly logger = new Logger(MealDistributionService.name);

	/**
	 * Distributes recipes across a week (7 days) based on meal count and strategy
	 */
	distributeRecipesForWeek(
		recipes: RecipeDocument[],
		mealCount: number,
		distributionStrategy: 'balanced' | 'preference-based' | 'random' = 'balanced'
	): Recipe[][] {

		// Get appropriate meal types for the meal count
		const mealTypes = this.getMealTypesForCount(mealCount);

		// Separate recipes by meal type
		const recipesByMealType = this.categorizeRecipesByMealType(recipes);

		// Distribute recipes across 7 days
		return this.distributeAcrossDays(recipesByMealType, mealTypes, distributionStrategy);
	}

	/**
	 * Gets appropriate meal types based on meal count (1-6)
	 */
	getMealTypesForCount(mealCount: number): MealType[] {
		if (mealCount < 1 || mealCount > 6) {
			this.logger.warn(`Invalid meal count ${mealCount}, defaulting to 3 meals`);
			mealCount = 3;
		}

		switch (mealCount) {
			case 1:
				return [MealType.DINNER];
			case 2:
				return [MealType.BREAKFAST, MealType.DINNER];
			case 3:
				return [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER];
			case 4:
				return [MealType.BREAKFAST, MealType.LUNCH, MealType.SNACK, MealType.DINNER];
			case 5:
				return [MealType.BREAKFAST, MealType.SNACK, MealType.LUNCH, MealType.SNACK, MealType.DINNER];
			case 6:
				return [MealType.BREAKFAST, MealType.SNACK, MealType.LUNCH, MealType.SNACK, MealType.DINNER, MealType.SNACK];
			default:
				return [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER];
		}
	}

	/**
	 * Categorizes recipes by their meal types
	 */
	private categorizeRecipesByMealType(recipes: RecipeDocument[]): Record<MealType, RecipeDocument[]> {
		return {
			[MealType.BREAKFAST]: recipes.filter(r => r.mealTypes.includes(MealType.BREAKFAST)),
			[MealType.LUNCH]: recipes.filter(r => r.mealTypes.includes(MealType.LUNCH)),
			[MealType.DINNER]: recipes.filter(r => r.mealTypes.includes(MealType.DINNER)),
			[MealType.SNACK]: recipes.filter(r => r.mealTypes.includes(MealType.SNACK))
		};
	}

	/**
	 * Distributes recipes across 7 days using the specified strategy
	 */
	private distributeAcrossDays(
		recipesByMealType: Record<MealType, RecipeDocument[]>,
		mealTypes: MealType[],
		strategy: string
	): Recipe[][] {
		const weekRecipes: Recipe[][] = [];

		for (let day = 0; day < 7; day++) {
			const dayRecipes: Recipe[] = [];

			for (let meal = 0; meal < mealTypes.length; meal++) {
				const mealType = mealTypes[meal];
				const availableRecipes = recipesByMealType[mealType];

				if (availableRecipes && availableRecipes.length > 0) {
					const selectedRecipe = this.selectRecipeForMeal(
						availableRecipes,
						day,
						meal,
						mealTypes.length,
						strategy
					);

					if (selectedRecipe) {
						const recipe = RecipeMapper.fromDocumentToModel(selectedRecipe);
						dayRecipes.push(recipe);
					}
				} else {
					this.logger.warn(`No ${mealType} recipes available for day ${day + 1}`);
				}
			}

			weekRecipes.push(dayRecipes);
		}

		return weekRecipes;
	}

	/**
	 * Selects a recipe for a specific meal using the chosen strategy
	 */
	private selectRecipeForMeal(
		availableRecipes: RecipeDocument[],
		day: number,
		meal: number,
		totalMeals: number,
		strategy: string
	): RecipeDocument | null {
		if (availableRecipes.length === 0) {
			return null;
		}

		switch (strategy) {
			case 'balanced':
				return this.selectBalancedRecipe(availableRecipes, day, meal, totalMeals);
			case 'random':
				return this.selectRandomRecipe(availableRecipes);
			case 'preference-based':
				return this.selectPreferenceBasedRecipe(availableRecipes, day, meal);
			default:
				return this.selectBalancedRecipe(availableRecipes, day, meal, totalMeals);
		}
	}

	/**
	 * Balanced selection - distributes recipes evenly across the week
	 */
	private selectBalancedRecipe(
		recipes: RecipeDocument[],
		day: number,
		meal: number,
		totalMeals: number
	): RecipeDocument {
		const recipeIndex = (day * totalMeals + meal) % recipes.length;
		return recipes[recipeIndex];
	}

	/**
	 * Random selection - picks a random recipe
	 */
	private selectRandomRecipe(recipes: RecipeDocument[]): RecipeDocument {
		const randomIndex = Math.floor(Math.random() * recipes.length);
		return recipes[randomIndex];
	}

	/**
	 * Preference-based selection - considers recipe difficulty and nutritional balance
	 */
	private selectPreferenceBasedRecipe(
		recipes: RecipeDocument[],
		day: number,
		meal: number
	): RecipeDocument {
		// Simple preference logic - prefer easier recipes for breakfast, varied for other meals
		if (meal === 0) { // Breakfast
			const easyRecipes = recipes.filter(r => r.difficulty === 'easy');
			if (easyRecipes.length > 0) {
				return easyRecipes[day % easyRecipes.length];
			}
		}

		// Fallback to balanced selection
		return recipes[day % recipes.length];
	}

}
