import {DayMealPlan} from "./day-meal-plan";
import {NutritionalInfo} from "../nutritional-info/nutritional-info";

export interface WeekMealPlan {
    id: string;
    dayPlans: DayMealPlan[];
    weekNutritionalInfo: NutritionalInfo;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}