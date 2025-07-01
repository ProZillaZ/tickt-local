import { MacronutrientService } from '../../../src/services/macronutrient.service';
import { MacroRatio } from '../../../src/models/macros/macro-ratio';
import { MacroAllocation } from '../../../src/models/macros/macro-allocation';
import { DEFAULT_MEAL_COUNT } from '../../../src/utils/constants';
import { DEFAULT_MACRO_RATIO } from '../../../src/utils/ratios';

describe('MacronutrientService', () => {
    let macronutrientService: MacronutrientService;

    beforeEach(() => {
        macronutrientService = new MacronutrientService();
    });

    describe('calculateMacroCalories', () => {
        it('should calculate macro allocation in calories based on total daily calories and default ratio', () => {
            const totalCalories = 2000;
            const result = macronutrientService.calculateMacroCalories(totalCalories);

            expect(result.proteinCalories).toBeCloseTo(totalCalories * DEFAULT_MACRO_RATIO.PROTEIN);
            expect(result.carbCalories).toBeCloseTo(totalCalories * DEFAULT_MACRO_RATIO.CARBS);
            expect(result.fatCalories).toBeCloseTo(totalCalories * DEFAULT_MACRO_RATIO.FATS);
        });

        it('should calculate macro allocation in calories based on custom ratio', () => {
            const totalCalories = 2000;
            const customRatio: MacroRatio = { PROTEIN: 0.3, CARBS: 0.4, FATS: 0.3 };
            const result = macronutrientService.calculateMacroCalories(totalCalories, customRatio);

            expect(result.proteinCalories).toBeCloseTo(totalCalories * customRatio.PROTEIN);
            expect(result.carbCalories).toBeCloseTo(totalCalories * customRatio.CARBS);
            expect(result.fatCalories).toBeCloseTo(totalCalories * customRatio.FATS);
        });

        it('should throw an error if total calories is less than or equal to 0', () => {
            expect(() => macronutrientService.calculateMacroCalories(0)).toThrowError('Total calories must be a positive value.');
        });
    });

    describe('scale', () => {
        it('should scale macro allocation by a given factor', () => {
            const macroAllocation = new MacroAllocation(500, 1000, 500);
            const result = macronutrientService.scale(macroAllocation, 0.5);

            expect(result.proteinCalories).toBeCloseTo(250);
            expect(result.carbCalories).toBeCloseTo(500);
            expect(result.fatCalories).toBeCloseTo(250);
        });

        it('should return zero macro values when scaled by 0', () => {
            const macroAllocation = new MacroAllocation(500, 1000, 500);
            const result = macronutrientService.scale(macroAllocation, 0);

            expect(result.proteinCalories).toBeCloseTo(0);
            expect(result.carbCalories).toBeCloseTo(0);
            expect(result.fatCalories).toBeCloseTo(0);
        });

        it('should handle negative scaling factors correctly', () => {
            const macroAllocation = new MacroAllocation(500, 1000, 500);
            const result = macronutrientService.scale(macroAllocation, -1);

            expect(result.proteinCalories).toBeCloseTo(-500);
            expect(result.carbCalories).toBeCloseTo(-1000);
            expect(result.fatCalories).toBeCloseTo(-500);
        });
    });

    describe('add', () => {
        it('should add two macro allocations together', () => {
            const macroAllocation = new MacroAllocation(500, 1000, 500);
            const other = { proteinCalories: 100, carbCalories: 200, fatCalories: 50 };
            const result = macronutrientService.add(macroAllocation, other);

            expect(result.proteinCalories).toBe(600);
            expect(result.carbCalories).toBe(1200);
            expect(result.fatCalories).toBe(550);
        });

        it('should handle cases where some of the other allocation is missing', () => {
            const macroAllocation = new MacroAllocation(500, 1000, 500);
            const other = { proteinCalories: 100 }; // only proteinCalories provided
            const result = macronutrientService.add(macroAllocation, other);

            expect(result.proteinCalories).toBe(600);
            expect(result.carbCalories).toBe(1000); // unchanged
            expect(result.fatCalories).toBe(500); // unchanged
        });

        it('should handle negative macro values when adding', () => {
            const macroAllocation = new MacroAllocation(500, 1000, 500);
            const other = { proteinCalories: -200, carbCalories: -500, fatCalories: -250 };
            const result = macronutrientService.add(macroAllocation, other);

            expect(result.proteinCalories).toBe(300);
            expect(result.carbCalories).toBe(500);
            expect(result.fatCalories).toBe(250);
        });

        it('should add empty or partially empty macro allocations', () => {
            const macroAllocation = new MacroAllocation(500, 1000, 500);
            const other = {}; // empty object
            const result = macronutrientService.add(macroAllocation, other);

            expect(result.proteinCalories).toBe(500);
            expect(result.carbCalories).toBe(1000);
            expect(result.fatCalories).toBe(500);
        });
    });

    describe('distribute', () => {
        it('should distribute macro allocation evenly across the default number of meals', () => {
            const totalMacroAllocation = new MacroAllocation(600, 1200, 600);
            const result = macronutrientService.distribute(totalMacroAllocation);

            expect(result.length).toBe(DEFAULT_MEAL_COUNT);
            result.forEach((meal) => {
                expect(meal.proteinCalories).toBeCloseTo(600 / DEFAULT_MEAL_COUNT);
                expect(meal.carbCalories).toBeCloseTo(1200 / DEFAULT_MEAL_COUNT);
                expect(meal.fatCalories).toBeCloseTo(600 / DEFAULT_MEAL_COUNT);
            });
        });

        it('should distribute macro allocation across one meal', () => {
            const totalMacroAllocation = new MacroAllocation(600, 1200, 600);
            const result = macronutrientService.distribute(totalMacroAllocation, 1);

            expect(result.length).toBe(1);
            expect(result[0].proteinCalories).toBeCloseTo(600);
            expect(result[0].carbCalories).toBeCloseTo(1200);
            expect(result[0].fatCalories).toBeCloseTo(600);
        });

        it('should handle meal distributions with high decimal precision', () => {
            const totalMacroAllocation = new MacroAllocation(600, 1200, 600);
            const mealDistribution = [33.33, 33.33, 33.34]; // high precision
            const result = macronutrientService.distribute(totalMacroAllocation, 3, mealDistribution);

            expect(result[0].proteinCalories).toBeCloseTo(600 * 0.3333);
            expect(result[1].proteinCalories).toBeCloseTo(600 * 0.3333);
            expect(result[2].proteinCalories).toBeCloseTo(600 * 0.3334);
        });

        it('should distribute macro allocation according to a custom meal distribution', () => {
            const totalMacroAllocation = new MacroAllocation(600, 1200, 600);
            const mealDistribution = [50, 30, 20]; // 3 meals
            const result = macronutrientService.distribute(totalMacroAllocation, 3, mealDistribution);

            expect(result.length).toBe(3);
            expect(result[0].proteinCalories).toBeCloseTo(600 * 0.5);
            expect(result[0].carbCalories).toBeCloseTo(1200 * 0.5);
            expect(result[0].fatCalories).toBeCloseTo(600 * 0.5);

            expect(result[1].proteinCalories).toBeCloseTo(600 * 0.3);
            expect(result[1].carbCalories).toBeCloseTo(1200 * 0.3);
            expect(result[1].fatCalories).toBeCloseTo(600 * 0.3);

            expect(result[2].proteinCalories).toBeCloseTo(600 * 0.2);
            expect(result[2].carbCalories).toBeCloseTo(1200 * 0.2);
            expect(result[2].fatCalories).toBeCloseTo(600 * 0.2);
        });

        it('should throw an error if meal count is not positive', () => {
            const totalMacroAllocation = new MacroAllocation(600, 1200, 600);
            expect(() => macronutrientService.distribute(totalMacroAllocation, 0)).toThrowError('Meal count must be a positive value.');
        });

        it('should throw an error if distribution array length does not match meal count', () => {
            const totalMacroAllocation = new MacroAllocation(600, 1200, 600);
            expect(() => macronutrientService.distribute(totalMacroAllocation, 3, [50, 30])).toThrowError(
                'Distribution array length (2) must match meal count (3).',
            );
        });

        it('should throw an error if distribution percentages do not sum to 100', () => {
            const totalMacroAllocation = new MacroAllocation(600, 1200, 600);
            expect(() => macronutrientService.distribute(totalMacroAllocation, 3, [50, 30, 10])).toThrowError(
                'Distribution percentages must sum to 100.',
            );
        });
    });

    describe('applyAdjustments', () => {
        it('should apply adjustments to the distributed macro allocations', () => {
            const macroAllocations = [
                new MacroAllocation(300, 600, 300),
                new MacroAllocation(200, 400, 200),
            ];
            const adjustments = {
                0: { proteinCalories: 50 },
                1: { carbCalories: -100 },
            };
            const result = macronutrientService.applyAdjustments(macroAllocations, adjustments);

            expect(result[0].proteinCalories).toBe(350);
            expect(result[0].carbCalories).toBe(600);
            expect(result[0].fatCalories).toBe(300);

            expect(result[1].proteinCalories).toBe(200);
            expect(result[1].carbCalories).toBe(300); // reduced by 100
            expect(result[1].fatCalories).toBe(200);
        });

        it('should leave allocations unchanged if no adjustments are provided', () => {
            const macroAllocations = [
                new MacroAllocation(300, 600, 300),
                new MacroAllocation(200, 400, 200),
            ];
            const result = macronutrientService.applyAdjustments(macroAllocations);

            expect(result[0].proteinCalories).toBe(300);
            expect(result[0].carbCalories).toBe(600);
            expect(result[0].fatCalories).toBe(300);

            expect(result[1].proteinCalories).toBe(200);
            expect(result[1].carbCalories).toBe(400);
            expect(result[1].fatCalories).toBe(200);
        });

        it('should apply negative adjustments to reduce macro allocations', () => {
            const macroAllocations = [
                new MacroAllocation(300, 600, 300),
                new MacroAllocation(200, 400, 200),
            ];
            const adjustments = {
                0: { proteinCalories: -50 }, // reducing protein in the first meal
                1: { carbCalories: -100 },    // reducing carbs in the second meal
            };
            const result = macronutrientService.applyAdjustments(macroAllocations, adjustments);

            expect(result[0].proteinCalories).toBe(250);
            expect(result[0].carbCalories).toBe(600);
            expect(result[0].fatCalories).toBe(300);

            expect(result[1].proteinCalories).toBe(200);
            expect(result[1].carbCalories).toBe(300);
            expect(result[1].fatCalories).toBe(200);
        });

        it('should handle cases where only some meals are adjusted', () => {
            const macroAllocations = [
                new MacroAllocation(300, 600, 300),
                new MacroAllocation(200, 400, 200),
            ];
            const adjustments = {
                0: { proteinCalories: 50 }, // only adjusting the first meal
            };
            const result = macronutrientService.applyAdjustments(macroAllocations, adjustments);

            expect(result[0].proteinCalories).toBe(350);
            expect(result[0].carbCalories).toBe(600);
            expect(result[0].fatCalories).toBe(300);

            expect(result[1].proteinCalories).toBe(200); // unchanged
            expect(result[1].carbCalories).toBe(400); // unchanged
            expect(result[1].fatCalories).toBe(200); // unchanged
        });
    });
});
