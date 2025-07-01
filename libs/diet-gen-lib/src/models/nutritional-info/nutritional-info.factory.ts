import {NutritionalInfo} from "./nutritional-info";

export class NutritionalInfoFactory {

    /**
     * Creates a default empty NutritionalInfo object with all values set to 0.
     * @returns A NutritionalInfo object with all fields initialized to 0.
     */
    public static createEmpty(): NutritionalInfo {
        return {
            totalCalories: 0,
            totalProtein: 0,
            totalCarbs: 0,
            totalFats: 0
        };
    }

    /**
     * Creates a NutritionalInfo object with specified values.
     * @param calories - The number of calories.
     * @param protein - The amount of protein in grams.
     * @param carbs - The amount of carbohydrates in grams.
     * @param fats - The amount of fats in grams.
     * @returns A NutritionalInfo object with the specified values.
     */
    public static createWithValues(
        calories: number,
        protein: number,
        carbs: number,
        fats: number
    ): NutritionalInfo {
        return {
            totalCalories: calories,
            totalProtein: protein,
            totalCarbs: carbs,
            totalFats: fats
        };
    }
}
