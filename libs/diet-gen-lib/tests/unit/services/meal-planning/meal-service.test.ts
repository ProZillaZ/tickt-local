import { MealService } from '../../../../src/services/meal-planning/meal.service';
import { IngredientSelectionService } from '../../../../src/services/ingredients/ingredient-selection.service';
import { QuantityCalculationService } from '../../../../src/services/ingredients/quantity-calculation.service';
import { NutritionalInfoService } from '../../../../src/services/nutritional-info.service';
import { MacronutrientService } from '../../../../src/services/macronutrient.service';
import { MacroAllocation } from '../../../../src/models/macros/macro-allocation';
import { DietType, Allergen, MealType, Macro } from '@tickt-engineering/types';
import { Ingredient } from '../../../../src/models/ingredients/ingredient';
import { Meal } from '../../../../src/models/meals/meal';

// Mock dependencies
jest.mock('../../../../src/services/ingredients/ingredient-selection.service');
jest.mock('../../../../src/services/ingredients/quantity-calculation.service');
jest.mock('../../../../src/services/nutritional-info.service');
jest.mock('../../../../src/services/macronutrient.service');

describe('MealService', () => {
    let mealService: MealService;
    let ingredientSelectionService: jest.Mocked<IngredientSelectionService>;
    let quantityCalculationService: jest.Mocked<QuantityCalculationService>;
    let nutritionalInfoService: jest.Mocked<NutritionalInfoService>;
    let macronutrientService: jest.Mocked<MacronutrientService>;

    beforeEach(() => {
        ingredientSelectionService = new IngredientSelectionService([]) as jest.Mocked<IngredientSelectionService>;
        quantityCalculationService = new QuantityCalculationService() as jest.Mocked<QuantityCalculationService>;
        nutritionalInfoService = new NutritionalInfoService() as jest.Mocked<NutritionalInfoService>;
        macronutrientService = new MacronutrientService() as jest.Mocked<MacronutrientService>;

        mealService = new MealService(
            ingredientSelectionService,
            quantityCalculationService,
            nutritionalInfoService,
            macronutrientService,
        );
    });

    describe('createMeals', () => {
        it('should create the correct number of meals', () => {
            const dayMacroAllocation = new MacroAllocation(1000, 1000, 1000);
            const mealCount = 3;
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];

            macronutrientService.distribute.mockReturnValue([
                new MacroAllocation(333, 333, 333),
                new MacroAllocation(333, 333, 333),
                new MacroAllocation(334, 334, 334),
            ]);

            const mockMeal = (mealType: MealType): Meal => ({
                id: 'mock-id',
                mealType,
                ingredients: [],
                nutritionalInfo: { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 },
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            jest.spyOn(mealService, 'createMeal').mockImplementation((mealType) => mockMeal(mealType));


            const meals = mealService.createMeals(dayMacroAllocation, mealCount, dietType, allergens);

            expect(meals.length).toBe(mealCount);
            expect(meals[0].mealType).toBe(MealType.BREAKFAST);
            expect(meals[1].mealType).toBe(MealType.LUNCH);
            expect(meals[2].mealType).toBe(MealType.DINNER);
        });

        it('should handle more than 3 meals by adding snacks', () => {
            const dayMacroAllocation = new MacroAllocation(1000, 1000, 1000);
            const mealCount = 5;
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];

            macronutrientService.distribute.mockReturnValue([
                new MacroAllocation(200, 200, 200),
                new MacroAllocation(200, 200, 200),
                new MacroAllocation(200, 200, 200),
                new MacroAllocation(200, 200, 200),
                new MacroAllocation(200, 200, 200),
            ]);

            const mockMeal = (mealType: MealType): Meal => ({
                id: 'mock-id',
                mealType,
                ingredients: [],
                nutritionalInfo: { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0 },
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            jest.spyOn(mealService, 'createMeal').mockImplementation((mealType) => mockMeal(mealType));

            const meals = mealService.createMeals(dayMacroAllocation, mealCount, dietType, allergens);

            expect(meals.length).toBe(mealCount);
            expect(meals[0].mealType).toBe(MealType.BREAKFAST);
            expect(meals[1].mealType).toBe(MealType.LUNCH);
            expect(meals[2].mealType).toBe(MealType.DINNER);
            expect(meals[3].mealType).toBe(MealType.SNACK);
            expect(meals[4].mealType).toBe(MealType.SNACK);
        });
    });

    describe('createMeal', () => {
        it('should create a meal with correct ingredients and nutritional info', () => {
            const mealType = MealType.BREAKFAST;
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];
            const mealMacroAllocation = new MacroAllocation(300, 300, 300);
            const dayMacroAllocation = new MacroAllocation(1000, 1000, 1000);

            const mockIngredients: Ingredient[] = [
                { id: 1, name: 'Egg', macro: Macro.PROTEIN, protein: 6, carbs: 0, fat: 5, quantity: 0 } as Ingredient,
                { id: 2, name: 'Bread', macro: Macro.CARBS, protein: 3, carbs: 15, fat: 1, quantity: 0 } as Ingredient,
                { id: 3, name: 'Avocado', macro: Macro.FAT, protein: 2, carbs: 9, fat: 15, quantity: 0 } as Ingredient,
                {
                    id: 4,
                    name: 'Spinach',
                    macro: Macro.VEGGIE,
                    protein: 1,
                    carbs: 1,
                    fat: 0,
                    quantity: 0,
                } as Ingredient,
            ];

            ingredientSelectionService.selectCompatibleIngredients.mockReturnValue(mockIngredients);
            quantityCalculationService.calculateQuantity.mockReturnValue(100);
            nutritionalInfoService.calculateMealNutritionalInfo.mockReturnValue({
                totalCalories: 900,
                totalProtein: 30,
                totalCarbs: 75,
                totalFats: 45,
            });

            const meal = mealService.createMeal(mealType, dietType, allergens, mealMacroAllocation, dayMacroAllocation);

            expect(meal.mealType).toBe(MealType.BREAKFAST);
            expect(meal.ingredients.length).toBe(4);
            expect(meal.ingredients[0].quantity).toBe(100);
            expect(meal.nutritionalInfo.totalCalories).toBe(900);
            expect(meal.nutritionalInfo.totalProtein).toBe(30);
            expect(meal.nutritionalInfo.totalCarbs).toBe(75);
            expect(meal.nutritionalInfo.totalFats).toBe(45);
        });
    });
});