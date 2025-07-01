import { WeekMealPlan } from '../../src/models/meal-plans/week-meal-plan';

export const mockWeekMealPlan: WeekMealPlan = {
    id: 'mock-week-plan-id',
    dayPlans: [],
    weekNutritionalInfo: {
        totalCalories: 16100,
        totalProtein: 1006.25,
        totalCarbs: 2012.5,
        totalFats: 1006.25,
    },
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-07'),
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
};