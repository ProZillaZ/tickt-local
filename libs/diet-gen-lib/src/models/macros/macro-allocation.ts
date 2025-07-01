import {CALORIES_PER_GRAM} from '../../utils/constants';

/**
 * Represents the allocation of macronutrient calories (proteins, carbs, fats) in a diet plan.
 */
export class MacroAllocation {
    proteinCalories: number;
    carbCalories: number;
    fatCalories: number;

    /**
     * Creates an instance of MacroAllocation.
     * @param proteinCalories - The calories allocated to protein.
     * @param carbCalories - The calories allocated to carbohydrates.
     * @param fatCalories - The calories allocated to fats.
     */
    constructor(proteinCalories: number, carbCalories: number, fatCalories: number) {
        this.proteinCalories = proteinCalories;
        this.carbCalories = carbCalories;
        this.fatCalories = fatCalories;
    }

    /**
     * Converts the macronutrient calorie values to grams based on standard conversion rates.
     * @returns An object containing the grams of protein, carbs, and fats.
     */
    toGrams(): { proteinGrams: number, carbGrams: number, fatGrams: number } {
        return {
            proteinGrams: this.proteinCalories / CALORIES_PER_GRAM.PROTEIN,
            carbGrams: this.carbCalories / CALORIES_PER_GRAM.CARBS,
            fatGrams: this.fatCalories / CALORIES_PER_GRAM.FAT,
        };
    }
}
