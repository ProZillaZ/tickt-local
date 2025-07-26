import { WeekMealPlan } from '@tickt-ltd/types';
import { GenerateMealPlanDto } from '../dto/generate-meal-plan.dto';
import { CreateMealPlanDto } from '../dto/create-meal-plan.dto';
import { NutritionalInfoMapper } from '@/common/mappers';
import { DayPlanMapper } from './day-plan.mapper';

export class MealPlanMapper {
	static map(weekMealPlan: WeekMealPlan, originalRequest: GenerateMealPlanDto): CreateMealPlanDto {
		return {
			startDate: originalRequest.startDate,
			endDate: originalRequest.endDate,
			name: originalRequest.name || `Generated Meal Plan ${new Date().toDateString()}`,
			description: originalRequest.description || 'AI-generated meal plan based on your preferences',
			weekNutritionalInfo: NutritionalInfoMapper.map(weekMealPlan.weekNutritionalInfo),
			dayPlans: weekMealPlan.dayPlans.map((dayPlan, index) =>
				DayPlanMapper.map(dayPlan, originalRequest.startDate, index)
			)
		};
	}
}