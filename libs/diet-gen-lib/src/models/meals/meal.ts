import { MealType, NutritionalInfo } from '@tickt-ltd/types';
import {Ingredient} from "../ingredients/ingredient";

export interface Meal {
    id: string;
    mealType: MealType;
    ingredients: Ingredient[];
    nutritionalInfo: NutritionalInfo;
    createdAt: Date;
    updatedAt: Date;
}
