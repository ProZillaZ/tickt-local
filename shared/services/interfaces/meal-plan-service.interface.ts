import { PaginatedResult, SearchOptions } from './common-types';
import {
	WeekMealPlan,
	DayMealPlan,
	MealPlanItem,
	CreateMealPlanDto,
	UpdateMealPlanDto,
	MealPlanFilter,
	MealPlanNutritionalInfo,
} from '@tickt-ltd/types';

// Re-export types for convenience
export type {
	WeekMealPlan as MealPlan,
	DayMealPlan,
	MealPlanItem,
	CreateMealPlanDto,
	UpdateMealPlanDto,
	MealPlanFilter,
	MealPlanNutritionalInfo as NutritionalInfo,
};

export interface IMealPlanService {
	getById(id: string, userId: string): Promise<WeekMealPlan | null>;

	create(data: CreateMealPlanDto, userId: string): Promise<WeekMealPlan>;

	update(id: string, data: UpdateMealPlanDto, userId: string): Promise<WeekMealPlan>;

	delete(id: string, userId: string): Promise<void>;

	getByUser(userId: string, options?: SearchOptions): Promise<PaginatedResult<WeekMealPlan>>;

	getByDateRange(userId: string, startDate: string, endDate: string): Promise<WeekMealPlan[]>;

	getCurrentWeekMealPlan(userId: string): Promise<WeekMealPlan | null>;

	searchMealPlans(userId: string, filter?: MealPlanFilter, options?: SearchOptions): Promise<PaginatedResult<WeekMealPlan>>;
}
