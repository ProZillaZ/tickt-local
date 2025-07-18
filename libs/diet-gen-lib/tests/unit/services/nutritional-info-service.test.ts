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

            expect(result.calories).toBe(Math.round((247.5 + 112 + 11.5) * 10) / 10);
            expect(result.protein).toBe(Math.round((46.5 + 2.6 + 1.45) * 10) / 10);
            expect(result.carbohydrates).toBe(Math.round((0 + 23 + 1.8) * 10) / 10);
            expect(result.fat).toBe(Math.round((5.4 + 0.9 + 0.2) * 10) / 10);
            expect(result.fiber).toBe(0);
        });

        it('should return zero values for an empty ingredient list', () => {
            const result = nutritionalInfoService.calculateMealNutritionalInfo([]);

            expect(result.calories).toBe(0);
            expect(result.protein).toBe(0);
            expect(result.carbohydrates).toBe(0);
            expect(result.fat).toBe(0);
            expect(result.fiber).toBe(0);
        });
    });

    describe('calculateDayNutritionalInfo', () => {
        it('should correctly calculate nutritional info for a day', () => {
            const result = nutritionalInfoService.calculateDayNutritionalInfo(mockMeals);

            expect(result.calories).toBe(Math.round((160 + 247.5 + 112) * 10) / 10);
            expect(result.protein).toBe(Math.round((2 + 46.5 + 2.6) * 10) / 10);
            expect(result.carbohydrates).toBe(Math.round((1.9 + 0 + 23) * 10) / 10);
            expect(result.fat).toBe(Math.round((19.7 + 5.4 + 0.9) * 10) / 10);
            expect(result.fiber).toBe(0);
        });

        it('should return zero values for an empty meal list', () => {
            const result = nutritionalInfoService.calculateDayNutritionalInfo([]);

            expect(result.calories).toBe(0);
            expect(result.protein).toBe(0);
            expect(result.carbohydrates).toBe(0);
            expect(result.fat).toBe(0);
            expect(result.fiber).toBe(0);
        });
    });

    describe('calculateWeekNutritionalInfo', () => {
        it('should correctly calculate nutritional info for a week', () => {
            const result = nutritionalInfoService.calculateWeekNutritionalInfo(mockDayMealPlans);

            expect(result.calories).toBe(Math.round(3800 * 10) / 10);
            expect(result.protein).toBe(Math.round(190 * 10) / 10);
            expect(result.carbohydrates).toBe(Math.round(475 * 10) / 10);
            expect(result.fat).toBe(Math.round(127 * 10) / 10);
            expect(result.fiber).toBe(0);
        });

        it('should return zero values for an empty day meal plan list', () => {
            const result = nutritionalInfoService.calculateWeekNutritionalInfo([]);

            expect(result.calories).toBe(0);
            expect(result.protein).toBe(0);
            expect(result.carbohydrates).toBe(0);
            expect(result.fat).toBe(0);
            expect(result.fiber).toBe(0);
        });
    });
});