import { DayMealPlan } from './day-meal-plan.model';
import { MealPlanNutritionalInfo } from './nutritional-info.model';

export interface WeekMealPlan {
	id: string;
	userId: string;
	dayPlans: DayMealPlan[];
	weekNutritionalInfo?: MealPlanNutritionalInfo;
	startDate: string;
	endDate: string;
	name?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
