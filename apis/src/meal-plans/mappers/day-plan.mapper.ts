import { CreateDayMealPlanDto } from '../dto/create-day-meal-plan.dto';
import { NutritionalInfoMapper } from '@/common/mappers';
import { MealItemMapper } from './meal-item.mapper';

export class DayPlanMapper {
	static map(dayPlan: any, startDate: string, dayIndex: number): CreateDayMealPlanDto {
		const currentDate = new Date(startDate);
		currentDate.setDate(currentDate.getDate() + dayIndex);

		return {
			date: currentDate.toISOString().split('T')[0],
			isFreeDay: false,
			dayNutritionalInfo: NutritionalInfoMapper.map(dayPlan.dayNutritionalInfo),
			meals: dayPlan.meals.map(item => MealItemMapper.map(item))
		};
	}
}