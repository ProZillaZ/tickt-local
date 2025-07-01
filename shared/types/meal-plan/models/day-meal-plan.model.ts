import { MealPlanItem } from './meal-plan-item.model';
import { MealPlanNutritionalInfo } from './nutritional-info.model';

export interface DayMealPlan {
	id: string;
	date: string;
	breakfast?: MealPlanItem;
	lunch?: MealPlanItem;
	dinner?: MealPlanItem;
	snacks?: MealPlanItem[];
	dayNutritionalInfo?: MealPlanNutritionalInfo;
	isFreeDay?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
