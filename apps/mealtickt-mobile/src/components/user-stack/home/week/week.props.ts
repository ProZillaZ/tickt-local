import { WeekMealPlan } from '@tickt-ltd/types';

export interface WeekSliderProps {
    defaultWeek: number;
    onChangeWeek: (id: number) => void;
    weeks: number;
    recipes?: WeekMealPlan[];
    generateMealPlans?: (startDate?: Date, endDate?: Date) => Promise<WeekMealPlan[]>;
}

export interface UseWeekProps {
    defaultWeek: number;
    onChangeWeek: (id: number) => void;
    weeks: number;
    recipes?: WeekMealPlan[];
    generateMealPlans?: (startDate?: Date, endDate?: Date) => Promise<WeekMealPlan[]>;
}
