import {NutritionalInfo} from '@tickt-ltd/types';

export class NutritionalInfoFactory {

    /**
     * Creates a default empty NutritionalInfo object with all values set to 0.
     * @returns A NutritionalInfo object with all fields initialized to 0.
     */
    public static createEmpty(): NutritionalInfo {
        return new NutritionalInfo(0, 0, 0, 0, 0);
    }

    /**
     * Creates a NutritionalInfo object with specified values.
     * @param calories - The number of calories.
     * @param protein - The amount of protein in grams.
     * @param carbohydrates - The amount of carbohydrates in grams.
     * @param fat - The amount of fats in grams.
     * @param fiber - Tha amount of fiber in grams.
     * @returns A NutritionalInfo object with the specified values.
     */
    public static createWithValues(
        calories: number,
        protein: number,
        carbohydrates: number,
        fat: number,
        fiber: number = 0
    ): NutritionalInfo {
        return new NutritionalInfo(calories, protein, carbohydrates, fat, fiber);
    }
}
