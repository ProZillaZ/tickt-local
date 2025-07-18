import { WeekMealPlan } from '../../src/models/meal-plans/week-meal-plan';
import { NutritionalInfo } from '../../src/models/nutritional-info/nutritional-info';

export const mockWeekMealPlan: WeekMealPlan = {
    id: 'mock-week-plan-id',
    dayPlans: [],
    weekNutritionalInfo: new NutritionalInfo(8000, 503, 500, 503, 0),
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-07'),
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
};