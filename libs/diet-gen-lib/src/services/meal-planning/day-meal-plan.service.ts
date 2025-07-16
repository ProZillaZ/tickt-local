import { DietType, Allergen, MealCount, Recipe } from '@tickt-ltd/types';
import {MacroAllocation} from "../../models/macros/macro-allocation";
import {DAYS_IN_WEEK, DEFAULT_MEAL_COUNT} from "../../utils/constants";
import {DayMealPlan} from "../../models/meal-plans/day-meal-plan";
import {DayMealPlanFactory} from "../../models/meal-plans/day-meal-plan.factory";
import {MealService} from "./meal.service";
import {NutritionalInfoService} from "../nutritional-info.service";
import {MacronutrientService} from "../macronutrient.service";

export class DayMealPlanService {
    constructor(
        private mealService: MealService,
        private macronutrientService: MacronutrientService,
        private nutritionalInfoService: NutritionalInfoService
    ) {}

    createDailyMealPlans(
        dietType: DietType,
        allergens: Allergen[],
        totalWeekMacroAllocation: MacroAllocation,
        mealCount: MealCount = DEFAULT_MEAL_COUNT
    ): DayMealPlan[] {
        const dayMacroAllocations: MacroAllocation[] = this.macronutrientService.distribute(totalWeekMacroAllocation, DAYS_IN_WEEK);
        const dayMealPlans: DayMealPlan[] = [];

        for (let i = 0; i < DAYS_IN_WEEK; i++) {
            const dayMacroAllocation = dayMacroAllocations[i];
            const isFreeDay = this.isFreeDay(i);
            const dayMealPlan = this.createDailyMealPlan(
                dietType,
                allergens,
                dayMacroAllocation,
                mealCount,
                isFreeDay
            );
            dayMealPlans.push(dayMealPlan);
        }

        return dayMealPlans;
    }

    /**
     * Creates a daily meal plan, which can include free days when no structured meals are provided.
     * @param dietType - The diet type of the user (e.g., 'omnivore', 'vegetarian', 'vegan').
     * @param allergens - A list of allergens to exclude.
     * @param dayMacroAllocation - The total macronutrient allocation for the day.
     * @param mealCount - The number of meals the user wants (between 1 and 6).
     * @param isFreeDay - Whether this day is a free day with no structured meals.
     * @returns A DayMealPlan object containing meals organized by time and total nutritional info.
     */
    createDailyMealPlan(
        dietType: DietType,
        allergens: Allergen[],
        dayMacroAllocation: MacroAllocation,
        mealCount: MealCount = DEFAULT_MEAL_COUNT,
        isFreeDay: boolean = false
    ): DayMealPlan {
        if (isFreeDay) {
            return DayMealPlanFactory.createEmpty(isFreeDay);
        }

        const meals = this.mealService.createMeals(dayMacroAllocation, mealCount, dietType, allergens);
        const dayNutritionalInfo = this.nutritionalInfoService.calculateDayNutritionalInfo(meals);

        return DayMealPlanFactory.createDayMealPlan(meals, dayNutritionalInfo);
    }

    /**
     * Creates daily meal plans using provided recipes for a full week.
     * @param weekRecipes - Array of 7 days, each containing recipes for that day.
     * @param totalWeekMacroAllocation - The total macronutrient allocation for the week.
     * @param mealCount - The number of meals per day.
     * @returns An array of DayMealPlan objects with recipes.
     */
    createDailyRecipeMealPlans(
        weekRecipes: Recipe[][],
        totalWeekMacroAllocation: MacroAllocation,
        mealCount: MealCount = DEFAULT_MEAL_COUNT
    ): DayMealPlan[] {
        const dayMacroAllocations: MacroAllocation[] = this.macronutrientService.distribute(
            totalWeekMacroAllocation,
            DAYS_IN_WEEK
        );

        return weekRecipes.map((dayRecipes, dayIndex) => {
            const dayMacroAllocation = dayMacroAllocations[dayIndex];
            const isFreeDay = this.isFreeDay(dayIndex);

            return this.createDailyRecipeMealPlan(
                dayRecipes,
                dayMacroAllocation,
                mealCount,
                isFreeDay
            );
        });
    }

    /**
     * Creates a daily meal plan using provided recipes.
     * @param dayRecipes - Array of recipes for the day.
     * @param dayMacroAllocation - The total macronutrient allocation for the day.
     * @param mealCount - The number of meals the user wants.
     * @param isFreeDay - Whether this day is a free day with no structured meals.
     * @returns A DayMealPlan object containing recipes.
     */
    createDailyRecipeMealPlan(
        dayRecipes: Recipe[],
        dayMacroAllocation: MacroAllocation,
        mealCount: MealCount = DEFAULT_MEAL_COUNT,
        isFreeDay: boolean = false
    ): DayMealPlan {
        if (isFreeDay || dayRecipes.length === 0) {
            return DayMealPlanFactory.createEmpty(isFreeDay);
        }

        // Distribute the daily macro allocation across the meals
        const mealMacroAllocations: MacroAllocation[] = this.macronutrientService.distribute(
            dayMacroAllocation,
            mealCount
        );

        // Create recipe-based meals
        const recipes = this.mealService.createRecipeMeals(
            dayRecipes,
            mealMacroAllocations
        );

        const dayNutritionalInfo = this.nutritionalInfoService.calculateDayNutritionalInfo(recipes);

        return DayMealPlanFactory.createDayMealPlan(recipes, dayNutritionalInfo);
    }

    /**
     * Determines if a specific day should be a free day (no structured meals).
     * @param dayIndex - The index of the day in the week (0-6).
     * @returns A boolean indicating whether the day should be a free day.
     */
    private isFreeDay(dayIndex: number): boolean {
        // Saturday is by default a free day
        return dayIndex === 5; // Saturday is the 6th day (index 5)
    }
}
