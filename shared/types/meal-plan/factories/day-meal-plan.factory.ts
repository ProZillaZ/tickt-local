import { Recipe, NutritionalInfo } from '@tickt-ltd/types';
import { DayMealPlan, Meal } from '../models';
import { v4 as uuidv4 } from 'uuid';

export class DayMealPlanFactory {
	/**
	 * Creates a default empty DayMealPlan object with all values set to 0.
	 * @returns A DayMealPlan object with all fields initialized to 0.
	 */
	static createEmpty(isFreeDay: boolean): DayMealPlan {
		return {
			id: uuidv4(),
			meals: [],
			dayNutritionalInfo: new NutritionalInfo(0, 0, 0, 0, 0),
			date: new Date(),
			isFreeDay,
			createdAt: new Date(),
			updatedAt: new Date(),
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
			updatedAt: new Date(),
		};
	}
}
