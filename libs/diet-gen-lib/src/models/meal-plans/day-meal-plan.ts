import { Recipe, RecipeNutritionalInfo } from "@tickt-ltd/types";
import { Meal } from "../meals/meal";

export interface DayMealPlan {
  id: string;
  meals: (Meal | Recipe)[];
  dayNutritionalInfo: RecipeNutritionalInfo;
  date: Date; // Date for which this daily meal plan applies.
  isFreeDay: boolean;
  createdAt: Date;
  updatedAt: Date;
}
