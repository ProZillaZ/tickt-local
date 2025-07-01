import { Macro, MealType, Allergen, DietType } from '@tickt-engineering/types';
import {IngredientSelectionService} from "../ingredients/ingredient-selection.service";
import {QuantityCalculationService} from "../ingredients/quantity-calculation.service";
import {MacroAllocation} from '../../models/macros/macro-allocation';
import {Meal} from '../../models/meals/meal';
import {NutritionalInfoService} from "../nutritional-info.service";
import {MealFactory} from '../../models/meals/meal.factory';
import {MacronutrientService} from "../macronutrient.service";

export class MealService {
    constructor(
        private ingredientSelectionService: IngredientSelectionService,
        private quantityCalculationService: QuantityCalculationService,
        private nutritionalInfoService: NutritionalInfoService,
        private macronutrientService: MacronutrientService
    ) {}

    /**
     * Creates meals for the day by distributing macronutrient allocations across meals
     * and generating a meal for each meal type.
     * @param dayMacroAllocation - The total macronutrient allocation for the day.
     * @param mealCount - The number of meals to distribute the calories across.
     * @param dietType - The diet type of the user.
     * @param allergens - A list of allergens to exclude.
     * @returns An array of Meal objects, one for each meal.
     */
    createMeals(
        dayMacroAllocation: MacroAllocation,
        mealCount: number,
        dietType: DietType,
        allergens: Allergen[]
    ): Meal[] {
        // Step 1: Distribute the daily macro allocation across the meals
        const mealMacroAllocations: MacroAllocation[] = this.macronutrientService.distribute(dayMacroAllocation, mealCount);

        // Step 2: Determine meal types based on meal count
        const mealTypes = this.determineMealTypes(mealCount);

        // Step 3: Create and return meals
        return mealTypes.map((mealType, index) =>
            this.createMeal(mealType, dietType, allergens, mealMacroAllocations[index], dayMacroAllocation)
        );
    }

    /**
     * Creates a meal by selecting one ingredient per macronutrient, calculating their quantities,
     * and aggregating nutritional information.
     * @param mealType - The type of meal (e.g., breakfast, lunch, dinner, snack).
     * @param dietType - The diet type of the user (e.g., 'omnivore', 'vegetarian', 'vegan').
     * @param allergens - A list of allergens to exclude.
     * @param mealMacroAllocation - The macronutrient allocation for the meal.
     * @param dayMacroAllocation - The macronutrient allocation for the day.
     * @returns A Meal object with selected ingredients, calculated quantities, and nutritional info.
     */
    createMeal(
        mealType: MealType,
        dietType: DietType,
        allergens: Allergen[],
        mealMacroAllocation: MacroAllocation,
        dayMacroAllocation: MacroAllocation
    ): Meal {
        // Step 1: Define the macros needed
        const neededMacros: Macro[] = [
            Macro.PROTEIN,
            Macro.CARBS,
            Macro.FAT
        ];

        // Step 2: Select ingredients using IngredientSelectionService
        const selectedIngredients = this.ingredientSelectionService.selectCompatibleIngredients(
            dietType,
            mealType,
            allergens,
            neededMacros
        );

        // Step 3: Calculate quantities and create meal
        const ingredientsWithQuantities = selectedIngredients.map(ingredient => {
            ingredient.quantity = this.quantityCalculationService.calculateQuantity(
                ingredient,
                mealMacroAllocation,
                dayMacroAllocation
            );
            return ingredient;
        });

        const nutritionalInfo = this.nutritionalInfoService.calculateMealNutritionalInfo(ingredientsWithQuantities);

        return MealFactory.createMeal(mealType, ingredientsWithQuantities, nutritionalInfo);
    }

    /**
     * Determines the types of meals based on the number of meals selected by the user.
     * @param mealCount - The number of meals to distribute the calories across.
     * @returns An array of MealType indicating the meal types to be created.
     */
    private determineMealTypes(mealCount: number): MealType[] {
        const mealTypes = [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER];
        const snacks = Array(mealCount - mealTypes.length).fill(MealType.SNACK);

        return [...mealTypes.slice(0, Math.min(mealCount, 3)), ...snacks];
    }
}
