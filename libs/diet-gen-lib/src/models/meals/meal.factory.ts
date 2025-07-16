import { v4 as uuidv4 } from "uuid";
import { MealType, RecipeNutritionalInfo } from "@tickt-ltd/types";
import { Meal } from "./meal";
import { RecipeNutritionalInfoFactory } from "../nutritional-info/nutritional-info.factory";
import { Ingredient } from "../ingredients/ingredient";

export class MealFactory {
  /**
   * Creates an empty Meal object with default values.
   * @param mealType - The type of meal (e.g., breakfast, lunch, dinner, snack).
   * @returns A Meal object with default values.
   */
  static createEmptyMeal(mealType: MealType): Meal {
    return {
      id: uuidv4(),
      mealType,
      ingredients: [],
      nutritionalInfo: RecipeNutritionalInfoFactory.createEmpty(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Creates a Meal object with specified ingredients and nutritional info.
   * @param mealType - The type of meal (e.g., breakfast, lunch, dinner, snack).
   * @param ingredients - The ingredients that make up the meal.
   * @param nutritionalInfo - The nutritional information for the meal.
   * @returns A Meal object with the specified values.
   */
  static createMeal(
    mealType: MealType,
    ingredients: Ingredient[],
    nutritionalInfo: RecipeNutritionalInfo
  ): Meal {
    return {
      id: uuidv4(),
      mealType,
      ingredients,
      nutritionalInfo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
