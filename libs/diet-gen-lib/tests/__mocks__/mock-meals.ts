import { Meal } from '../../src/models/meals/meal';
import { MealType } from '@tickt-engineering/nutrition-types';
import { mockIngredients } from './mock-ingredients';

export const mockMeals: Meal[] = [
    {
        id: '1',
        mealType: MealType.BREAKFAST,
        ingredients: [{ ...mockIngredients[2], quantity: 100 }], // Avocado
        nutritionalInfo: {
            totalCalories: 160,
            totalProtein: 2,
            totalCarbs: 1.9,
            totalFats: 19.7,
        },
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
        nutritionalInfo: {
            totalCalories: 247.5 + 112,
            totalProtein: 46.5 + 2.6,
            totalCarbs: 0 + 23,
            totalFats: 5.4 + 0.9,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];