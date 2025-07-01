import { Difficulty } from '../enums';
import { Cuisine, DietType, MealType } from '../../nutrition';

export interface RecipeGenInputDto {
	dietType: DietType;
	allergies?: string[];
	preferredCuisines?: string[];
	dislikedIngredients?: string[];
	calorieTarget?: number;
	proteinTarget: number;
	carbsTarget?: number;
	fatsTarget?: number;
	cuisines: Cuisine[];
	mealType: MealType;
	difficulty: Difficulty;
	totalTime: number;
	servings: number;
}
