import { Macro, DietType, Allergen, Cuisine, MealType } from '@tickt-engineering/types';
import { IngredientCategory } from './ingredient-category.enum';
import { CookingMethod } from './cooking-method.enum';
import { Season } from './season.enum';
import { FlavourProfile } from './flavour-profile.enum';

export interface Ingredient {
    id: number;
    name: string;
    macro: Macro;
    minQuantity: number;
    maxQuantity: number;
    protein: number;
    carbs: number;
    fat: number;
    quantity: number;
    calories: number;
    categories: IngredientCategory[],
    mealTypes: MealType[];
    dietTypes: DietType[];
    allergens: Allergen[];
    cuisine: Cuisine[];
    cookingMethods: CookingMethod[];
    seasonality: Season[];
    flavourProfiles: FlavourProfile[];
}