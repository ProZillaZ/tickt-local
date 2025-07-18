import { QuantityCalculationService } from '../../../src/services/ingredients/quantity-calculation.service';
import { Ingredient } from '../../../src/models/ingredients/ingredient';
import { MacroAllocation } from '../../../src/models/macros/macro-allocation';
import { Macro } from '@tickt-ltd/types';
import { CALORIES_PER_GRAM } from '../../../src/utils/constants';
import { IngredientCategory } from '../../../src/models/ingredients/ingredient-category.enum';
import { CookingMethod } from '../../../src/models/ingredients/cooking-method.enum';
import { Season } from '../../../src/models/ingredients/season.enum';
import { FlavourProfile } from '../../../src/models/ingredients/flavour-profile.enum';

describe('QuantityCalculationService', () => {
    let quantityCalculationService: QuantityCalculationService;

    beforeEach(() => {
        quantityCalculationService = new QuantityCalculationService();
    });

    describe('calculateQuantity', () => {
        it('should calculate the correct quantity for a protein-based ingredient', () => {
            const ingredient: Ingredient = {
                id: 1,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 300,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(300, 200, 100);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            // Calculation: meal protein calories / (ingredient protein * protein calories per gram)
            expect(result).toBe(220);
        });

        it('should adjust the quantity for a carb-based ingredient based on carb calories', () => {
            const ingredient: Ingredient = {
                id: 2,
                name: 'Rice',
                macro: Macro.CARBS,
                minQuantity: 50,
                maxQuantity: 200,
                protein: 2,
                carbs: 80,
                fat: 1,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(150, 300, 50);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            // Adjust based on the macros and limits
            expect(result).toBe(90);
        });

        it('should throw an error for unsupported macro types', () => {
            const ingredient: Ingredient = {
                id: 3,
                name: 'Unknown Macro',
                macro: 'unsupported' as Macro,
                minQuantity: 0,
                maxQuantity: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(100, 200, 50);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            expect(() => {
                quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);
            }).toThrow(`Unsupported macro type for ingredient ${ingredient.name}`);
        });

        it('should return zero quantity if meal macro allocation is zero', () => {
            const ingredient: Ingredient = {
                id: 1,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 300,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(0, 200, 100); // Zero protein allocation
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            expect(result).toBe(0); // No protein in the meal means no quantity required
        });

        it('should return zero quantity for veggie macro type', () => {
            const ingredient: Ingredient = {
                id: 4,
                name: 'Vegetables',
                macro: Macro.VEGGIE,
                minQuantity: 0,
                maxQuantity: 0,
                protein: 0,
                carbs: 0,
                fat: 0,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(100, 100, 100);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            expect(result).toBe(0); // Veggie macro should not have any quantity calculation
        });

        it('should reallocate excess calories when quantity exceeds max quantity', () => {
            const ingredient: Ingredient = {
                id: 5,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 150,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(600, 200, 100);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            expect(result).toBe(150); // Max quantity should be enforced
            expect(dayMacroAllocation.proteinCalories).toBeGreaterThan(1500); // Excess should be reallocated to day
        });

        it('should reallocate shortfall calories when quantity is below min quantity', () => {
            const ingredient: Ingredient = {
                id: 6,
                name: 'Rice',
                macro: Macro.CARBS,
                minQuantity: 100,
                maxQuantity: 200,
                protein: 0,
                carbs: 80,
                fat: 1,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(150, 300, 50);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            expect(result).toBe(100); // Min quantity should be enforced
            expect(dayMacroAllocation.carbCalories).toBeLessThan(1800); // Shortfall should be reallocated to day
        });

        it('should round quantity to nearest 10 grams', () => {
            const ingredient: Ingredient = {
                id: 7,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 50,
                maxQuantity: 200,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(299, 100, 50);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            expect(result).toBe(110); // Expect rounding to nearest 10 grams
        });

        it('should return zero quantity if meal macro allocation for the macro is zero', () => {
            const ingredient: Ingredient = {
                id: 8,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 300,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(0, 200, 100); // Zero protein allocation
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);

            const result = quantityCalculationService.calculateQuantity(ingredient, mealMacroAllocation, dayMacroAllocation);

            expect(result).toBe(0); // No protein in the meal means no quantity required
        });

    });

    describe('adjustForSecondaryMacros', () => {
        it('should adjust the quantity if secondary protein exceeds allocation', () => {
            const ingredient: Ingredient = {
                id: 1,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 300,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(200, 100, 50);
            const quantity = 150;

            const result = quantityCalculationService['adjustForSecondaryMacros'](ingredient, mealMacroAllocation, quantity);

            // Verify that the quantity has been adjusted properly for the secondary protein
            expect(result).toBeLessThan(quantity);
        });

        it('should not adjust if secondary macros are within meal allocation', () => {
            const ingredient: Ingredient = {
                id: 2,
                name: 'Rice',
                macro: Macro.CARBS,
                minQuantity: 50,
                maxQuantity: 200,
                protein: 2,
                carbs: 80,
                fat: 1,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(200, 320, 50);
            const quantity = 100;

            const result = quantityCalculationService['adjustForSecondaryMacros'](ingredient, mealMacroAllocation, quantity);

            // No adjustment should occur since secondary macros are within limits
            expect(result).toBeCloseTo(quantity, 2);
        });

        it('should not adjust quantity when ingredient has no secondary macros', () => {
            const ingredient: Ingredient = {
                id: 4,
                name: 'Zero Macro Ingredient',
                macro: Macro.CARBS,
                minQuantity: 50,
                maxQuantity: 200,
                protein: 0,
                carbs: 100,
                fat: 0,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(200, 400, 100);
            const quantity = 100;

            const result = quantityCalculationService['adjustForSecondaryMacros'](ingredient, mealMacroAllocation, quantity);

            // No secondary macros, so no adjustment should be made
            expect(result).toBe(100); // Expected to remain 100
        });
    });

    describe('enforceMinMaxAndReallocate', () => {
        it('should enforce max quantity and reallocate excess calories', () => {
            const ingredient: Ingredient = {
                id: 1,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 150,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(300, 200, 100);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);
            const quantity = 200;

            const result = quantityCalculationService['enforceMinMaxAndReallocate'](ingredient, mealMacroAllocation, quantity, dayMacroAllocation);

            // The result should be the max quantity of 150
            expect(result).toBe(150);
        });

        it('should enforce min quantity and reallocate shortfall calories', () => {
            const ingredient: Ingredient = {
                id: 2,
                name: 'Rice',
                macro: Macro.CARBS,
                minQuantity: 100,
                maxQuantity: 200,
                protein: 2,
                carbs: 80,
                fat: 1,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(150, 300, 50);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);
            const quantity = 50;

            const result = quantityCalculationService['enforceMinMaxAndReallocate'](ingredient, mealMacroAllocation, quantity, dayMacroAllocation);

            // The result should be the min quantity of 100
            expect(result).toBe(100);
        });

        it('should enforce the same min and max quantity without reallocation', () => {
            const ingredient: Ingredient = {
                id: 5,
                name: 'Fixed Quantity Ingredient',
                macro: Macro.FAT,
                minQuantity: 100,
                maxQuantity: 100, // Same min and max quantity
                protein: 0,
                carbs: 0,
                fat: 80,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const mealMacroAllocation = new MacroAllocation(300, 200, 400);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);
            const quantity = 150;

            const result = quantityCalculationService['enforceMinMaxAndReallocate'](ingredient, mealMacroAllocation, quantity, dayMacroAllocation);

            expect(result).toBe(100); // Should return fixed quantity without reallocation
        });
    });

    describe('calculateCaloriesForQuantity', () => {
        it('should calculate the correct calories for a given quantity of an ingredient', () => {
            const ingredient: Ingredient = {
                id: 1,
                name: 'Chicken',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 300,
                protein: 30,
                carbs: 0,
                fat: 5,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const quantity = 100; // grams

            const result = quantityCalculationService['calculateCaloriesForQuantity'](ingredient, quantity);

            // Formula: (protein * cal/gram + carbs * cal/gram + fat * cal/gram) * (quantity / 100)
            const expectedCalories = (30 * CALORIES_PER_GRAM.PROTEIN + 0 * CALORIES_PER_GRAM.CARBS + 5 * CALORIES_PER_GRAM.FAT) * (quantity / 100);

            expect(result).toBeCloseTo(expectedCalories);
        });

        it('should return zero calories if the ingredient has no macronutrients', () => {
            const ingredient: Ingredient = {
                id: 6,
                name: 'Zero Macro Ingredient',
                macro: Macro.PROTEIN,
                minQuantity: 100,
                maxQuantity: 300,
                protein: 0,
                carbs: 0,
                fat: 0,
                quantity: 0,
                calories: 0,
                mealTypes: [],
                dietTypes: [],
                allergens: [],
                cuisine: [],
                categories: [IngredientCategory.POULTRY],
                cookingMethods: [CookingMethod.GRILL],
                seasonality: [Season.ALL_YEAR],
                flavourProfiles: [FlavourProfile.UMAMI],
            };
            const quantity = 100;

            const result = quantityCalculationService['calculateCaloriesForQuantity'](ingredient, quantity);

            expect(result).toBe(0); // No macros means no calories
        });

    });

    describe('reallocateExcessCalories', () => {
        it('should reallocate excess calories for protein', () => {
            const mealMacroAllocation = new MacroAllocation(300, 200, 100);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);
            const excessCalories = 100;

            quantityCalculationService['reallocateExcessCalories'](Macro.PROTEIN, excessCalories, mealMacroAllocation, dayMacroAllocation);

            expect(mealMacroAllocation.proteinCalories).toBe(200);
            expect(dayMacroAllocation.proteinCalories).toBe(1600);
        });

        it('should handle zero allocations when reallocating excess calories', () => {
            const mealMacroAllocation = new MacroAllocation(0, 0, 0); // No calories left in the meal
            const dayMacroAllocation = new MacroAllocation(0, 0, 0); // No calories left in the day
            const excessCalories = 50;

            quantityCalculationService['reallocateExcessCalories'](Macro.PROTEIN, excessCalories, mealMacroAllocation, dayMacroAllocation);

            expect(mealMacroAllocation.proteinCalories).toBe(0); // No reallocation should occur
            expect(dayMacroAllocation.proteinCalories).toBe(0);  // No reallocation should occur
        });

    });

    describe('reallocateShortfallCalories', () => {
        it('should reallocate shortfall calories for fat', () => {
            const mealMacroAllocation = new MacroAllocation(300, 200, 100);
            const dayMacroAllocation = new MacroAllocation(1500, 1800, 1200);
            const shortfallCalories = 50;

            quantityCalculationService['reallocateShortfallCalories'](Macro.FAT, shortfallCalories, mealMacroAllocation, dayMacroAllocation);

            expect(mealMacroAllocation.fatCalories).toBe(150);
            expect(dayMacroAllocation.fatCalories).toBe(1150);
        });
    });
});
