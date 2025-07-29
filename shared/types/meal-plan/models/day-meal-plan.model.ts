import { Recipe } from "@tickt-ltd/types";
import { NutritionalInfo } from "@tickt-ltd/types";

export interface Meal {
  id: string;
  mealType: string;
  ingredients: any[];
  nutritionalInfo: NutritionalInfo;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DayMealPlan {
  id: string;
  meals: (Meal | Recipe)[];
  dayNutritionalInfo: NutritionalInfo;
  date: Date;
  isFreeDay: boolean;
  createdAt: Date;
  updatedAt: Date;
}
