import { DayMealPlan } from "./day-meal-plan";
import { RecipeNutritionalInfo } from "../nutritional-info/nutritional-info";

export interface WeekMealPlan {
  id: string;
  dayPlans: DayMealPlan[];
  weekNutritionalInfo: RecipeNutritionalInfo;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
