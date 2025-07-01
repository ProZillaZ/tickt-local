import {DAYS_IN_WEEK, DEFAULT_MEAL_COUNT} from "../../utils/constants";
import {CaloricIntakeService} from "../caloric-intake.service";
import {MealService} from "./meal.service";
import {MacronutrientService} from "../macronutrient.service";
import {NutritionalInfoService} from "../nutritional-info.service";
import {DayMealPlanService} from "./day-meal-plan.service";
import {WeekMealPlanService} from "./week-meal-plan.service";
import { UserProfile, DietFilters } from '@tickt-engineering/types';
import {IngredientSelectionService} from "../ingredients/ingredient-selection.service";
import {QuantityCalculationService} from "../ingredients/quantity-calculation.service";
import {ingredients} from "../../data/ingredients/ingredients.data";
import {MacroAllocation} from "../../models/macros/macro-allocation";
import {WeekMealPlan} from "../../models/meal-plans/week-meal-plan";

export class MealPlanBuilder {
    private readonly userProfile: UserProfile;
    private readonly dietFilters: DietFilters;

    private readonly caloricIntakeService: CaloricIntakeService;
    private readonly macronutrientService: MacronutrientService;
    private readonly ingredientSelectionService: IngredientSelectionService;
    private readonly quantityCalculationService: QuantityCalculationService;
    private readonly nutritionalInfoService: NutritionalInfoService;
    private readonly mealService: MealService;
    private readonly dayMealPlanService: DayMealPlanService;
    private readonly weekMealPlanService: WeekMealPlanService;

    constructor(userProfile: UserProfile) {
        this.userProfile = userProfile;
        this.dietFilters = userProfile.dietFilters || {};
        this.caloricIntakeService = new CaloricIntakeService();
        this.ingredientSelectionService = new IngredientSelectionService(ingredients);
        this.quantityCalculationService = new QuantityCalculationService()
        this.macronutrientService = new MacronutrientService();
        this.nutritionalInfoService = new NutritionalInfoService();
        this.mealService = new MealService(
            this.ingredientSelectionService,
            this.quantityCalculationService,
            this.nutritionalInfoService,
            this.macronutrientService
        );
        this.dayMealPlanService = new DayMealPlanService(
            this.mealService,
            this.macronutrientService,
            this.nutritionalInfoService
        );
        this.weekMealPlanService = new WeekMealPlanService(
            this.dayMealPlanService,
            this.nutritionalInfoService
        );
    }

    /**
     * Builds and returns the WeekMealPlan.
     * @returns A WeekMealPlan object containing the generated meal plan.
     */
    build(): WeekMealPlan {
        const totalWeekMacroAllocation = this.calculateTotalWeekMacroAllocation();

        return this.weekMealPlanService.createWeekMealPlan(
            this.userProfile.dietType,
            this.dietFilters.allergies || [],
            totalWeekMacroAllocation,
            this.dietFilters.mealCount || DEFAULT_MEAL_COUNT
        );
    }

    /**
     * Calculates the total weekly macro allocation based on the user's profile.
     * @returns The weekly macro allocation.
     */
    private calculateTotalWeekMacroAllocation(): MacroAllocation {
        const {gender, weightKg, heightCm, age, activityLevel, goal: dietGoal} = this.userProfile;

        const bmr = this.caloricIntakeService.calculateBmr(gender, weightKg, heightCm, age);
        const tdee = this.caloricIntakeService.adjustBmrForActivityLevel(bmr, activityLevel);
        const dailyCalories = this.caloricIntakeService.adjustCaloriesForDietGoal(tdee, dietGoal);
        const dailyMacroAllocation = this.macronutrientService.calculateMacroCalories(dailyCalories);

        return this.macronutrientService.scale(dailyMacroAllocation, DAYS_IN_WEEK);
    }
}
