import { DayMealPlan } from './day-meal-plan.model';
import { NutritionalInfo } from '@tickt-ltd/types';

export interface WeekMealPlan {
	id: string;
	dayPlans: DayMealPlan[];
	weekNutritionalInfo: NutritionalInfo;
	startDate: Date;
	endDate: Date;
	createdAt: Date;
	updatedAt: Date;
}
