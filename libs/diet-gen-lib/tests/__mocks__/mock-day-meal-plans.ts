import { DayMealPlan } from '../../src/models/meal-plans/day-meal-plan';

export const mockDayMealPlans: DayMealPlan[] = [
    {
        id: '1',
        meals: [],
        dayNutritionalInfo: {
            totalCalories: 2000,
            totalProtein: 100,
            totalCarbs: 250,
            totalFats: 67,
        },
        date: new Date(),
        isFreeDay: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        meals: [],
        dayNutritionalInfo: {
            totalCalories: 1800,
            totalProtein: 90,
            totalCarbs: 225,
            totalFats: 60,
        },
        date: new Date(),
        isFreeDay: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];