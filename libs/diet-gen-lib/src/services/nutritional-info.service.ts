import { Recipe, DayMealPlan, NutritionalInfo } from '@tickt-ltd/types';
import {Ingredient} from '../models/ingredients/ingredient';
import {Meal} from '../models/meals/meal';
import {NutritionalInfoFactory} from '../models/nutritional-info/nutritional-info.factory';

export class NutritionalInfoService {
    /**
     * Type guard to check if an item is a Meal (has ingredients with quantity property)
     * @param item - The item to check
     * @returns True if item is a Meal, false if it's a Recipe
     */
    private isMeal(item: Meal | Recipe): item is Meal {
        return 'ingredients' in item &&
               Array.isArray(item.ingredients) &&
               item.ingredients.length > 0 &&
               'quantity' in item.ingredients[0];
    }

    /**
     * Calculates the total nutritional information for a single meal.
     * @param ingredients - The ingredients for which to calculate nutritional info.
     * @returns The total nutritional information for the meal.
     */
    calculateMealNutritionalInfo(ingredients: Ingredient[]): NutritionalInfo {
        const totals = ingredients.reduce(
            (acc, ingredient) => {
                const calories = ingredient.calories * (ingredient.quantity / 100);
                const protein = (ingredient.protein * ingredient.quantity) / 100;
                const carbs = (ingredient.carbs * ingredient.quantity) / 100;
                const fats = (ingredient.fat * ingredient.quantity) / 100;

                return {
                    calories: acc.calories + calories,
                    protein: acc.protein + protein,
                    carbohydrates: acc.carbohydrates + carbs,
                    fat: acc.fat + fats,
                    fiber: acc.fiber // Ingredients don't have fiber data in diet-gen-lib
                };
            },
            { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0 }
        );

        return new NutritionalInfo(
            totals.calories,
            totals.protein,
            totals.carbohydrates,
            totals.fat,
            totals.fiber
        );
    }

    /**
     * Calculates the total nutritional information for a day meal plan.
     * @param items - The meals or recipes of the day meal plan for which to calculate nutritional info.
     * @returns The total nutritional information for the day.
     */
    calculateDayNutritionalInfo(items: (Meal | Recipe)[]): NutritionalInfo {
        return items.reduce(
            (totals, item) => {
                if (this.isMeal(item)) {
                    // Handle Meal - aggregate ingredient nutrition
                    totals.calories += item.nutritionalInfo.calories;
                    totals.protein += item.nutritionalInfo.protein;
                    totals.carbohydrates += item.nutritionalInfo.carbohydrates;
                    totals.fat += item.nutritionalInfo.fat;
                    totals.fiber += item.nutritionalInfo.fiber;
                } else {
                    // Handle Recipe - use recipe nutrition directly
                    totals.calories += item.nutritionalInfo.calories;
                    totals.protein += item.nutritionalInfo.protein;
                    totals.carbohydrates += item.nutritionalInfo.carbohydrates;
                    totals.fat += item.nutritionalInfo.fat;
                    totals.fiber += item.nutritionalInfo.fiber;
                }
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
                totals.calories += dayMealPlan.dayNutritionalInfo.calories;
                totals.protein += dayMealPlan.dayNutritionalInfo.protein;
                totals.carbohydrates += dayMealPlan.dayNutritionalInfo.carbohydrates;
                totals.fat += dayMealPlan.dayNutritionalInfo.fat;
                totals.fiber += dayMealPlan.dayNutritionalInfo.fiber;
                return totals;
            },
            NutritionalInfoFactory.createEmpty()
        );
    }
}
