import { Difficulty } from '../enums';
import { Cuisine, DietType, MealType } from '../../nutrition';

/**
 * Filter interface for recipe search operations
 * Contains all possible filter criteria for recipe queries
 */
export interface RecipeFilter {
	mealTypes?: MealType[];
	dietTypes?: DietType[];
	cuisines?: Cuisine[];
	difficulty?: Difficulty;
	maxCookTime?: number;
	maxPrepTime?: number;
	tags?: string[];
	ingredients?: string[];
	allergens?: string[];
	searchText?: string;
}
