// Builder
export { MealPlanBuilder } from './services/meal-planning/meal-plan.builder';

// Services
export { MealService } from './services/meal-planning/meal.service';
export { DayMealPlanService } from './services/meal-planning/day-meal-plan.service';
export { WeekMealPlanService } from './services/meal-planning/week-meal-plan.service';
export { IngredientSelectionService } from './services/ingredients/ingredient-selection.service';
export { NutritionalInfoService } from './services/nutritional-info.service';
export { QuantityCalculationService } from './services/ingredients/quantity-calculation.service';
export { CaloricIntakeService} from './services/caloric-intake.service';
export { TargetWeightService } from './services/target-weight.service';
export { FrameSizeService } from './services/frame-size.service';
export { HealthMetricsService } from './services/health-metrics.service';
export { MacronutrientService } from './services/macronutrient.service';

// Recipe Services
export { RecipeQuantityAdjustmentService } from './services/recipes/recipe-quantity-adjustment.service';

// Models
export { Ingredient } from './models/ingredients/ingredient';
export { MacroAllocation } from './models/macros/macro-allocation';
export { UserProfile, DietFilters } from '@tickt-ltd/types';
export { Meal } from './models/meals/meal';

// Constants
export { CALORIES_PER_GRAM, DAYS_IN_WEEK, DEFAULT_MEAL_COUNT, CalorieAdjustmentsConfig } from './utils/constants';

// Allergen Utilities
export { 
	ALLERGEN_ALIASES,
	getAllergenAliases,
	getSupportedAllergens,
	isValidAllergen,
	preprocessIngredient,
	isWordMatch,
	ingredientContainsAllergen
} from './utils/allergen-mappings';
