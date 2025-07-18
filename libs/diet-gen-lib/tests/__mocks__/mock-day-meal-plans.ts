import { DayMealPlan } from "../../src/models/meal-plans/day-meal-plan";
import { RecipeNutritionalInfo } from "../../src/models/nutritional-info/nutritional-info";

export const mockDayMealPlans: DayMealPlan[] = [
  {
    id: "1",
    meals: [],
    dayNutritionalInfo: new RecipeNutritionalInfo(2000, 100, 250, 67, 0),
    date: new Date(),
    isFreeDay: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    meals: [],
    dayNutritionalInfo: new RecipeNutritionalInfo(1800, 90, 225, 60, 0),
    date: new Date(),
    isFreeDay: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
