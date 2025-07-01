import { Allergen, Cuisine, IngredientMeasurement, MealCount, GoalPace } from '../enums';

export interface DietFilters {
	pace?: GoalPace;

	mealCount?: MealCount;

	foodMeasurement?: IngredientMeasurement;

	favoriteCuisines?: Cuisine[];

	allergies?: Allergen[];
}
