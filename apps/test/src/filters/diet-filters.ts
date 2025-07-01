import {Allergen} from "./allergen.enum";
import {Cuisine} from "./cuisine.enum";
import {IngredientMeasurement} from "./ingredient-measurement.enum";
import {MealCount} from "./meal-count.enum";
import {GoalPace} from "./goal-pace.enum";

export interface DietFilters {
    pace?: GoalPace; // Slow, moderate, fast
    mealCount?: MealCount; // 1 to 6 meals per day
    foodMeasurement?: IngredientMeasurement; // Weight or serving size
    favoriteCuisines?: Cuisine[]; // List of favorite cuisines
    allergies?: Allergen[]; // List of allergies
}