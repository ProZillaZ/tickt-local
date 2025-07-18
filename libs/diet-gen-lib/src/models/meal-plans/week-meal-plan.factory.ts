import { v4 as uuidv4 } from "uuid";
import { WeekMealPlan } from "./week-meal-plan";
import { RecipeNutritionalInfoFactory } from "../nutritional-info/nutritional-info.factory";
import { DayMealPlan } from "./day-meal-plan";
import { RecipeNutritionalInfo } from "../nutritional-info/nutritional-info";

export class WeekMealPlanFactory {
  /**
   * Creates a default empty WeekMealPlan object with all values set to 0.
   * @returns A WeekMealPlan object with all fields initialized to 0.
   */
  static createEmpty(): WeekMealPlan {
    const startDate = new Date();

    return {
      id: uuidv4(),
      dayPlans: [],
      weekNutritionalInfo: RecipeNutritionalInfoFactory.createEmpty(),
      startDate,
      endDate: this.calculateEndDate(startDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Creates a WeekMealPlan object with specified days and week nutritional info.
   * @param dayPlans - An array of DayMealPlan objects representing each day of the week.
   * @param weekNutritionalInfo - The aggregated nutritional information for the week.
   * @returns A WeekMealPlan object with the specified values.
   */
  static createWeekMealPlan(
    dayPlans: DayMealPlan[],
    weekNutritionalInfo: RecipeNutritionalInfo
  ): WeekMealPlan {
    const startDate = new Date();

    return {
      id: uuidv4(),
      dayPlans,
      weekNutritionalInfo,
      startDate,
      endDate: this.calculateEndDate(startDate),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Calculates the end date, which is exactly 7 days after the start date.
   * @param startDate - The start date of the week meal plan.
   * @returns The calculated end date.
   */
  private static calculateEndDate(startDate: Date): Date {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);
    return endDate;
  }
}
