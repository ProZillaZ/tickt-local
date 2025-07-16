import { Recipe } from '@tickt-ltd/types';
import {DayMealPlan} from "./day-meal-plan";
import {NutritionalInfo} from '@tickt-ltd/types';
import {Meal} from "../meals/meal";
import {v4 as uuidv4} from 'uuid';
import {NutritionalInfoFactory} from "../nutritional-info/nutritional-info.factory";

export class DayMealPlanFactory {
    /**
     * Creates a default empty DayMealPlan object with all values set to 0.
     * @returns A DayMealPlan object with all fields initialized to 0.
     */
    static createEmpty(isFreeDay: boolean): DayMealPlan {
        return {
            id: uuidv4(),
            meals: [],
            dayNutritionalInfo: NutritionalInfoFactory.createEmpty(),
            date: new Date(),
            isFreeDay,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }

    static createDayMealPlan(
        meals: (Meal | Recipe)[],
        dayNutritionalInfo: NutritionalInfo,
        isFreeDay: boolean = false
    ): DayMealPlan {
        return {
            id: uuidv4(),
            meals,
            dayNutritionalInfo,
            date: new Date(),
            isFreeDay,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
}
