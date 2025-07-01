import { DayMealPlan } from '../models';

export interface UpdateMealPlanDto {
	startDate?: string;
	endDate?: string;
	dayPlans?: DayMealPlan[];
	name?: string;
	description?: string;
}
