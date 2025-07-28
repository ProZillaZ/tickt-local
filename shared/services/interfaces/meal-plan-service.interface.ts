import { PaginatedResult, SearchOptions } from "./common-types";
import {
  WeekMealPlan,
  DayMealPlan,
  CreateMealPlanDto,
  UpdateMealPlanDto,
  MealPlanFilter,
} from "@tickt-ltd/types";

// Re-export types for convenience
export {
  WeekMealPlan as MealPlan,
  DayMealPlan,
  CreateMealPlanDto,
  UpdateMealPlanDto,
  MealPlanFilter,
};

export interface IMealPlanService {
  getById(id: string, userId: string): Promise<WeekMealPlan | null>;

  create(data: CreateMealPlanDto, userId: string): Promise<WeekMealPlan>;

  update(
    id: string,
    data: UpdateMealPlanDto,
    userId: string
  ): Promise<WeekMealPlan>;

  delete(id: string, userId: string): Promise<void>;

  getByUser(
    userId: string,
    options?: SearchOptions
  ): Promise<PaginatedResult<WeekMealPlan>>;

  getByDateRange(
    userId: string,
    startDate: string,
    endDate: string
  ): Promise<WeekMealPlan[]>;

  getCurrentWeekMealPlan(userId: string): Promise<WeekMealPlan | null>;

  searchMealPlans(
    userId: string,
    filter?: MealPlanFilter,
    options?: SearchOptions
  ): Promise<PaginatedResult<WeekMealPlan>>;
}
