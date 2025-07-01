import { DayMealPlan } from '../models';

export interface CreateMealPlanDto {
	startDate: string;
	endDate: string;
	dayPlans: DayMealPlan[];
	name?: string;
	description?: string;
}
