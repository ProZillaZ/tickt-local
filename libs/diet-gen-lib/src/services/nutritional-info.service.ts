import {NutritionalInfo} from '../models/nutritional-info/nutritional-info';
import {Ingredient} from '../models/ingredients/ingredient';
import {Meal} from '../models/meals/meal';
import {NutritionalInfoFactory} from '../models/nutritional-info/nutritional-info.factory';
import {DayMealPlan} from '../models/meal-plans/day-meal-plan';

export class NutritionalInfoService {

    /**
     * Calculates the total nutritional information for a single meal.
     * @param ingredients - The ingredients for which to calculate nutritional info.
     * @returns The total nutritional information for the meal.
     */
    calculateMealNutritionalInfo(ingredients: Ingredient[]): NutritionalInfo {
        return ingredients.reduce(
            (totals, ingredient) => {
                totals.totalCalories += ingredient.calories * (ingredient.quantity / 100);
                totals.totalProtein += (ingredient.protein * ingredient.quantity) / 100;
                totals.totalCarbs += (ingredient.carbs * ingredient.quantity) / 100;
                totals.totalFats += (ingredient.fat * ingredient.quantity) / 100;
                return totals;
            },
            NutritionalInfoFactory.createEmpty()
        );
    }

    /**
     * Calculates the total nutritional information for a day meal plan.
     * @param meals - The meals of the day meal plan for which to calculate nutritional info.
     * @returns The total nutritional information for the day.
     */
    calculateDayNutritionalInfo(meals: Meal[]): NutritionalInfo {
        return meals.reduce(
            (totals, meal) => {
                totals.totalCalories += meal.nutritionalInfo.totalCalories;
                totals.totalProtein += meal.nutritionalInfo.totalProtein;
                totals.totalCarbs += meal.nutritionalInfo.totalCarbs;
                totals.totalFats += meal.nutritionalInfo.totalFats;
                return totals;
            },
            NutritionalInfoFactory.createEmpty()
        );
    }

    /**
     * Calculates the total nutritional information for a week meal plan.
     * @param dayMealPlans - The meal plans of the week for which to calculate nutritional info.
     * @returns The total nutritional information for the week.
     */
    calculateWeekNutritionalInfo(dayMealPlans: DayMealPlan[]): NutritionalInfo {
        return dayMealPlans.reduce(
            (totals, dayMealPlan) => {
                totals.totalCalories += dayMealPlan.dayNutritionalInfo.totalCalories;
                totals.totalProtein += dayMealPlan.dayNutritionalInfo.totalProtein;
                totals.totalCarbs += dayMealPlan.dayNutritionalInfo.totalCarbs;
                totals.totalFats += dayMealPlan.dayNutritionalInfo.totalFats;
                return totals;
            },
            NutritionalInfoFactory.createEmpty()
        );
    }
}
