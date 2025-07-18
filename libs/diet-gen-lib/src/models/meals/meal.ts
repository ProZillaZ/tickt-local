import { MealType, RecipeNutritionalInfo } from "@tickt-ltd/types";
import { Ingredient } from "../ingredients/ingredient";

export interface Meal {
  id: string;
  mealType: MealType;
  ingredients: Ingredient[];
  nutritionalInfo: RecipeNutritionalInfo;
  createdAt: Date;
  updatedAt: Date;
}
