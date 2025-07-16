import { Recipe } from "@tickt-ltd/types";
import { DayMealPlan } from "./day-meal-plan";
import { RecipeNutritionalInfo } from "@tickt-ltd/types";
import { Meal } from "../meals/meal";
import { v4 as uuidv4 } from "uuid";
import { RecipeNutritionalInfoFactory } from "../nutritional-info/nutritional-info.factory";

export class DayMealPlanFactory {
  /**
   * Creates a default empty DayMealPlan object with all values set to 0.
   * @returns A DayMealPlan object with all fields initialized to 0.
   */
  static createEmpty(isFreeDay: boolean): DayMealPlan {
    return {
      id: uuidv4(),
      meals: [],
      dayNutritionalInfo: RecipeNutritionalInfoFactory.createEmpty(),
      date: new Date(),
      isFreeDay,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static createDayMealPlan(
    meals: (Meal | Recipe)[],
    dayNutritionalInfo: RecipeNutritionalInfo,
    isFreeDay: boolean = false
  ): DayMealPlan {
    return {
      id: uuidv4(),
      meals,
      dayNutritionalInfo,
      date: new Date(),
      isFreeDay,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
