import {Meal} from "../meals/meal";
import {NutritionalInfo} from "../nutritional-info/nutritional-info";

export interface DayMealPlan {
    id: string;
    meals: Meal[];
    dayNutritionalInfo: NutritionalInfo;
    date: Date; // Date for which this daily meal plan applies.
    isFreeDay: boolean;
    createdAt: Date;
    updatedAt: Date;
}