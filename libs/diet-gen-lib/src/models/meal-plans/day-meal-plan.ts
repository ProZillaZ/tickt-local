import { Recipe } from '@tickt-ltd/types';
import {Meal} from "../meals/meal";
import {NutritionalInfo} from '@tickt-ltd/types';

export interface DayMealPlan {
    id: string;
    meals: (Meal | Recipe)[];
    dayNutritionalInfo: NutritionalInfo;
    date: Date; // Date for which this daily meal plan applies.
    isFreeDay: boolean;
    createdAt: Date;
    updatedAt: Date;
}
