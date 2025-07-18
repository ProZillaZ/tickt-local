import { RecipeNutritionalInfo } from "@tickt-ltd/types";

export class RecipeNutritionalInfoFactory {
  /**
   * Creates a default empty RecipeNutritionalInfo object with all values set to 0.
   * @returns A RecipeNutritionalInfo object with all fields initialized to 0.
   */
  public static createEmpty(): RecipeNutritionalInfo {
    return new RecipeNutritionalInfo(0, 0, 0, 0, 0);
  }

  /**
   * Creates a RecipeNutritionalInfo object with specified values.
   * @param calories - The number of calories.
   * @param protein - The amount of protein in grams.
   * @param carbs - The amount of carbohydrates in grams.
   * @param fats - The amount of fats in grams.
   * @param fiber - Tha amount of fiber in grams.
   * @returns A RecipeNutritionalInfo object with the specified values.
   */
  public static createWithValues(
    calories: number,
    protein: number,
    carbs: number,
    fats: number,
    fiber: number = 0
  ): RecipeNutritionalInfo {
    return new RecipeNutritionalInfo(calories, protein, carbs, fats, fiber);
  }
}
