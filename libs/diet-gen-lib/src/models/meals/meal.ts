import { MealType } from '@tickt-engineering/types';
import {Ingredient} from "../ingredients/ingredient";
import {NutritionalInfo} from "../nutritional-info/nutritional-info";

export interface Meal {
    id: string;
    mealType: MealType;
    ingredients: Ingredient[];
    nutritionalInfo: NutritionalInfo;
    createdAt: Date;
    updatedAt: Date;
}