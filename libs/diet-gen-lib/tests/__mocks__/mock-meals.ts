import { Meal } from '../../src/models/meals/meal';
import { MealType } from '@tickt-ltd/types';
import { NutritionalInfo } from '@tickt-ltd/types';
import { mockIngredients } from './mock-ingredients';

export const mockMeals: Meal[] = [
    {
        id: '1',
        mealType: MealType.BREAKFAST,
        ingredients: [{ ...mockIngredients[2], quantity: 100 }], // Avocado
        nutritionalInfo: new NutritionalInfo(160, 2, 1.9, 19.7, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: '2',
        mealType: MealType.LUNCH,
        ingredients: [
            { ...mockIngredients[0], quantity: 150 }, // Chicken Breast
            { ...mockIngredients[1], quantity: 100 }, // Brown Rice
        ],
        nutritionalInfo: new NutritionalInfo(247.5 + 112, 46.5 + 2.6, 0 + 23, 5.4 + 0.9, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
