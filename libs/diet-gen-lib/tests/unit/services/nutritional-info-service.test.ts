import { NutritionalInfoService } from '../../../src/services/nutritional-info.service';
import { mockIngredients } from '../../__mocks__/mock-ingredients';
import { mockMeals } from '../../__mocks__/mock-meals';
import { mockDayMealPlans } from '../../__mocks__/mock-day-meal-plans';
import { Ingredient } from '../../../src/models/ingredients/ingredient';

describe('NutritionalInfoService', () => {
    let nutritionalInfoService: NutritionalInfoService;

    beforeEach(() => {
        nutritionalInfoService = new NutritionalInfoService();
    });

    describe('calculateMealNutritionalInfo', () => {
        it('should correctly calculate nutritional info for a meal', () => {
            const ingredients: Ingredient[] = [
                { ...mockIngredients[0], quantity: 150 }, // Chicken Breast
                { ...mockIngredients[1], quantity: 100 }, // Brown Rice
                { ...mockIngredients[3], quantity: 50 },  // Spinach
            ];

            const result = nutritionalInfoService.calculateMealNutritionalInfo(ingredients);

            expect(result).toEqual({
                totalCalories: 247.5 + 112 + 11.5,
                totalProtein: 46.5 + 2.6 + 1.45,
                totalCarbs: 0 + 23 + 1.8,
                totalFats: 5.4 + 0.9 + 0.2,
            });
        });

        it('should return zero values for an empty ingredient list', () => {
            const result = nutritionalInfoService.calculateMealNutritionalInfo([]);

            expect(result).toEqual({
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFats: 0,
            });
        });
    });

    describe('calculateDayNutritionalInfo', () => {
        it('should correctly calculate nutritional info for a day', () => {
            const result = nutritionalInfoService.calculateDayNutritionalInfo(mockMeals);

            expect(result).toEqual({
                totalCalories: 160 + 247.5 + 112,
                totalProtein: 2 + 46.5 + 2.6,
                totalCarbs: 1.9 + 0 + 23,
                totalFats: 19.7 + 5.4 + 0.9,
            });
        });

        it('should return zero values for an empty meal list', () => {
            const result = nutritionalInfoService.calculateDayNutritionalInfo([]);

            expect(result).toEqual({
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFats: 0,
            });
        });
    });

    describe('calculateWeekNutritionalInfo', () => {
        it('should correctly calculate nutritional info for a week', () => {
            const result = nutritionalInfoService.calculateWeekNutritionalInfo(mockDayMealPlans);

            expect(result).toEqual({
                totalCalories: 3800,
                totalProtein: 190,
                totalCarbs: 475,
                totalFats: 127,
            });
        });

        it('should return zero values for an empty day meal plan list', () => {
            const result = nutritionalInfoService.calculateWeekNutritionalInfo([]);

            expect(result).toEqual({
                totalCalories: 0,
                totalProtein: 0,
                totalCarbs: 0,
                totalFats: 0,
            });
        });
    });
});