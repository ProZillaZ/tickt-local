import {DayMealPlanService} from "./day-meal-plan.service";
import {NutritionalInfoService} from "../nutritional-info.service";
import { DietType, Allergen, MealCount } from '@tickt-engineering/types';
import {MacroAllocation} from "../../models/macros/macro-allocation";
import {WeekMealPlan} from "../../models/meal-plans/week-meal-plan";
import {DayMealPlan} from "../../models/meal-plans/day-meal-plan";
import {DEFAULT_MEAL_COUNT} from "../../utils/constants";
import {WeekMealPlanFactory} from "../../models/meal-plans/week-meal-plan.factory";

export class WeekMealPlanService {
    constructor(
        private dayMealPlanService: DayMealPlanService,
        private nutritionalInfoService: NutritionalInfoService
    ) {
    }

    /**
     * Creates a week meal plan by generating daily meal plans for each day of the week.
     * @param dietType - The diet type of the user (e.g., 'omnivore', 'vegetarian', 'vegan').
     * @param allergens - A list of allergens to exclude.
     * @param totalWeekMacroAllocation - The total macronutrient allocation for the week.
     * @param mealCount - The number of meals the user wants each day (between 1 and 6).
     * @returns A weekMealPlan object containing all the daily meal plans and the aggregated nutritional information.
     */
    createWeekMealPlan(
        dietType: DietType,
        allergens: Allergen[],
        totalWeekMacroAllocation: MacroAllocation,
        mealCount: MealCount = DEFAULT_MEAL_COUNT
    ): WeekMealPlan {
        const dayMealPlans: DayMealPlan[] = this.dayMealPlanService.createDailyMealPlans(dietType, allergens, totalWeekMacroAllocation, mealCount);

        // Calculate total nutritional info for the week
        const weekNutritionalInfo = this.nutritionalInfoService.calculateWeekNutritionalInfo(dayMealPlans);

        // Create and return the weekMealPlan object
        return WeekMealPlanFactory.createWeekMealPlan(dayMealPlans, weekNutritionalInfo);
    }
}
