import { DayMealPlan, NutritionalInfo } from '@tickt-ltd/types';

export const mockDayMealPlans: DayMealPlan[] = [
    {
        id: '1',
        meals: [],
        dayNutritionalInfo: new NutritionalInfo(2000, 100, 250, 67, 0),
        date: new Date(),
        isFreeDay: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        meals: [],
        dayNutritionalInfo: new NutritionalInfo(1800, 90, 225, 60, 0),
        date: new Date(),
        isFreeDay: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
