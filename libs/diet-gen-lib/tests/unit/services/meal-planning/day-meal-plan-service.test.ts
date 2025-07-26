import { DayMealPlanService } from '../../../../src/services/meal-planning/day-meal-plan.service';
import { MealService } from '../../../../src/services/meal-planning/meal.service';
import { IngredientSelectionService } from '../../../../src/services/ingredients/ingredient-selection.service';
import { QuantityCalculationService } from '../../../../src/services/ingredients/quantity-calculation.service';
import { MacronutrientService } from '../../../../src/services/macronutrient.service';
import { NutritionalInfoService } from '../../../../src/services/nutritional-info.service';
import { DietType, Allergen, MealCount, NutritionalInfo } from '@tickt-ltd/types';
import { MacroAllocation } from '../../../../src/models/macros/macro-allocation';
import { Meal } from '../../../../src/models/meals/meal';
import { DAYS_IN_WEEK } from '../../../../src/utils/constants';

// Mock dependencies
jest.mock('../../../../src/services/meal-planning/meal.service');
jest.mock('../../../../src/services/macronutrient.service');
jest.mock('../../../../src/services/nutritional-info.service');

describe('DayMealPlanService', () => {
    let dayMealPlanService: DayMealPlanService;
    let mockMealService: jest.Mocked<MealService>;
    let mockMacronutrientService: jest.Mocked<MacronutrientService>;
    let mockNutritionalInfoService: jest.Mocked<NutritionalInfoService>;
    let mockIngredientSelectionService: jest.Mocked<IngredientSelectionService>;
    let mockQuantityCalculationService: jest.Mocked<QuantityCalculationService>;

    beforeEach(() => {
        mockIngredientSelectionService = new IngredientSelectionService([]) as jest.Mocked<IngredientSelectionService>;
        mockQuantityCalculationService = new QuantityCalculationService() as jest.Mocked<QuantityCalculationService>;
        mockMacronutrientService = new MacronutrientService() as jest.Mocked<MacronutrientService>;
        mockNutritionalInfoService = new NutritionalInfoService() as jest.Mocked<NutritionalInfoService>;

        mockMealService = new MealService(
            mockIngredientSelectionService,
            mockQuantityCalculationService,
            mockNutritionalInfoService,
            mockMacronutrientService,
        ) as jest.Mocked<MealService>;

        dayMealPlanService = new DayMealPlanService(
            mockMealService,
            mockMacronutrientService,
            mockNutritionalInfoService,
        );
    });

    describe('createDailyMealPlans', () => {
        it('should create 7 daily meal plans', () => {
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];
            const totalWeekMacroAllocation = new MacroAllocation(1000, 2000, 3000);
            const mealCount = MealCount.THREE;

            const mockDayMacroAllocation = new MacroAllocation(100, 200, 300);
            mockMacronutrientService.distribute.mockReturnValue(Array(DAYS_IN_WEEK).fill(mockDayMacroAllocation));

            const mockMeal: Meal = {} as Meal;
            mockMealService.createMeals.mockReturnValue([mockMeal, mockMeal, mockMeal]);

            mockNutritionalInfoService.calculateDayNutritionalInfo.mockReturnValue(
                new NutritionalInfo(1000, 50, 100, 30, 0)
            );

            const result = dayMealPlanService.createDailyMealPlans(
                dietType,
                allergens,
                totalWeekMacroAllocation,
                mealCount,
            );

            expect(result.length).toBe(DAYS_IN_WEEK);
            expect(mockMacronutrientService.distribute).toHaveBeenCalledWith(totalWeekMacroAllocation, DAYS_IN_WEEK);
            expect(mockMealService.createMeals).toHaveBeenCalledTimes(DAYS_IN_WEEK - 1); // 6 times, as one day is a free day
            expect(mockNutritionalInfoService.calculateDayNutritionalInfo).toHaveBeenCalledTimes(DAYS_IN_WEEK - 1);
        });
    });

    describe('createDailyMealPlan', () => {
        it('should create a daily meal plan for a non-free day', () => {
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];
            const dayMacroAllocation = new MacroAllocation(100, 200, 300);
            const mealCount = MealCount.THREE;

            const mockMeals: Meal[] = [{} as Meal, {} as Meal, {} as Meal];
            mockMealService.createMeals.mockReturnValue(mockMeals);

            mockNutritionalInfoService.calculateDayNutritionalInfo.mockReturnValue(
                new NutritionalInfo(1000, 50, 100, 30, 0)
            );

            const result = dayMealPlanService.createDailyMealPlan(
                dietType,
                allergens,
                dayMacroAllocation,
                mealCount,
                false, // not a free day
            );

            expect(result.meals).toEqual(mockMeals);
            expect(result.dayNutritionalInfo.calories).toBe(1000);
            expect(result.dayNutritionalInfo.protein).toBe(50);
            expect(result.dayNutritionalInfo.carbohydrates).toBe(100);
            expect(result.dayNutritionalInfo.fat).toBe(30);
            expect(result.dayNutritionalInfo.fiber).toBe(0);
            expect(result.isFreeDay).toBe(false);
        });

        it('should create an empty meal plan for a free day', () => {
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];
            const dayMacroAllocation = new MacroAllocation(100, 200, 300);
            const mealCount = MealCount.THREE;

            const result = dayMealPlanService.createDailyMealPlan(
                dietType,
                allergens,
                dayMacroAllocation,
                mealCount,
                true, // free day
            );

            expect(result.meals).toEqual([]);
            expect(result.dayNutritionalInfo.calories).toBe(0);
            expect(result.dayNutritionalInfo.protein).toBe(0);
            expect(result.dayNutritionalInfo.carbohydrates).toBe(0);
            expect(result.dayNutritionalInfo.fat).toBe(0);
            expect(result.dayNutritionalInfo.fiber).toBe(0);
            expect(result.isFreeDay).toBe(true);
        });
    });

    // Test private method indirectly through createDailyMealPlans
    describe('isFreeDay', () => {
        it('should set Saturday as a free day', () => {
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];
            const totalWeekMacroAllocation = new MacroAllocation(1000, 2000, 3000);
            const mealCount = MealCount.THREE;

            const mockDayMacroAllocation = new MacroAllocation(100, 200, 300);
            mockMacronutrientService.distribute.mockReturnValue(Array(DAYS_IN_WEEK).fill(mockDayMacroAllocation));

            const mockMeal: Meal = {} as Meal;
            mockMealService.createMeals.mockReturnValue([mockMeal, mockMeal, mockMeal]);

            mockNutritionalInfoService.calculateDayNutritionalInfo.mockReturnValue(
                new NutritionalInfo(1000, 50, 100, 30, 0)
            );

            const result = dayMealPlanService.createDailyMealPlans(
                dietType,
                allergens,
                totalWeekMacroAllocation,
                mealCount,
            );

            // Saturday should be a free day (index 5)
            expect(result[5].isFreeDay).toBe(true);
            expect(result[5].meals).toEqual([]);

            // Other days should not be free days
            for (let i = 0; i < DAYS_IN_WEEK; i++) {
                if (i !== 5) {
                    expect(result[i].isFreeDay).toBe(false);
                    expect(result[i].meals.length).toBeGreaterThan(0);
                }
            }
        });
    });
});
