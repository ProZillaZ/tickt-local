import { Ingredient } from '../../models/ingredients/ingredient';
import { MacroAllocation } from '../../models/macros/macro-allocation';
import { Macro } from '@tickt-engineering/types';
import { CALORIES_PER_GRAM } from '../../utils/constants';

export class QuantityCalculationService {
    constructor() {
    }

    /**
     * Calculates the quantity of an ingredient needed to meet the target for its primary macronutrient.
     * Adjusts for secondary macronutrients and respects min/max limits.
     * @param ingredient - The selected ingredient.
     * @param mealMacroAllocation - The macronutrient allocation for the meal.
     * @param dayMacroAllocation - The macronutrient allocation for the day, in case we need to make adjustments.
     * @returns The required quantity of the ingredient in its specified unit.
     */
    calculateQuantity(
        ingredient: Ingredient,
        mealMacroAllocation: MacroAllocation,
        dayMacroAllocation: MacroAllocation
    ): number {
        let quantity = 0;

        switch (ingredient.macro) {
            case Macro.PROTEIN:
                if (mealMacroAllocation.proteinCalories === 0) return 0;
                quantity = mealMacroAllocation.proteinCalories / (ingredient.protein * CALORIES_PER_GRAM.PROTEIN);
                break;
            case Macro.CARBS:
                if (mealMacroAllocation.carbCalories === 0) return 0;
                quantity = mealMacroAllocation.carbCalories / (ingredient.carbs * CALORIES_PER_GRAM.CARBS);
                break;
            case Macro.FAT:
                if (mealMacroAllocation.fatCalories === 0) return 0;
                quantity = mealMacroAllocation.fatCalories / (ingredient.fat * CALORIES_PER_GRAM.FAT);
                break;
            case Macro.VEGGIE:
                return 0;
            default:
                throw new Error(`Unsupported macro type for ingredient ${ingredient.name}`);
        }

        // Convert to grams
        quantity *= 100;

        // Adjust for secondary macronutrients
        quantity = this.adjustForSecondaryMacros(ingredient, mealMacroAllocation, quantity);

        // Handle min/max limits and reallocate excess/shortfall calories
        quantity = this.enforceMinMaxAndReallocate(ingredient, mealMacroAllocation, quantity, dayMacroAllocation);

        // Round to nearest 10 grams
        quantity = Math.round(quantity / 10) * 10;

        return quantity;
    }

    private adjustForSecondaryMacros(
      ingredient: Ingredient,
      mealMacroAllocation: MacroAllocation,
      quantity: number
    ): number {
        const secondaryProteinCalories = ingredient.protein * quantity / 100 * CALORIES_PER_GRAM.PROTEIN;
        const secondaryCarbCalories = ingredient.carbs * quantity / 100 * CALORIES_PER_GRAM.CARBS;
        const secondaryFatCalories = ingredient.fat * quantity / 100 * CALORIES_PER_GRAM.FAT;

        if (ingredient.macro !== Macro.PROTEIN && secondaryProteinCalories > 0 && secondaryProteinCalories > mealMacroAllocation.proteinCalories) {
            quantity *= mealMacroAllocation.proteinCalories / secondaryProteinCalories;
        }
        // Adjust for carbs only if it's a secondary macro (not the primary one)
        if (ingredient.macro !== Macro.CARBS && secondaryCarbCalories > mealMacroAllocation.carbCalories) {
            quantity *= mealMacroAllocation.carbCalories / secondaryCarbCalories;
        }
        // Adjust for fat only if it's a secondary macro (not the primary one)
        if (ingredient.macro !== Macro.FAT && secondaryFatCalories > mealMacroAllocation.fatCalories) {
            quantity *= mealMacroAllocation.fatCalories / secondaryFatCalories;
        }

        return quantity;
    }


    private enforceMinMaxAndReallocate(
        ingredient: Ingredient,
        mealMacroAllocation: MacroAllocation,
        quantity: number,
        dayMacroAllocation: MacroAllocation
    ): number {
        const initialCalories = this.calculateCaloriesForQuantity(ingredient, quantity);

        if (ingredient.maxQuantity && quantity > ingredient.maxQuantity) {
            const excessCalories = initialCalories - this.calculateCaloriesForQuantity(ingredient, ingredient.maxQuantity);
            this.reallocateExcessCalories(ingredient.macro, excessCalories, mealMacroAllocation, dayMacroAllocation);
            quantity = ingredient.maxQuantity;
        }

        if (ingredient.minQuantity && quantity < ingredient.minQuantity) {
            const shortfallCalories = this.calculateCaloriesForQuantity(ingredient, ingredient.minQuantity) - initialCalories;
            this.reallocateShortfallCalories(ingredient.macro, shortfallCalories, mealMacroAllocation, dayMacroAllocation);
            quantity = ingredient.minQuantity;
        }

        return quantity;
    }

    private reallocateExcessCalories(
        macro: Macro,
        excessCalories: number,
        mealMacroAllocation: MacroAllocation,
        dayMacroAllocation: MacroAllocation
    ): void {
        switch (macro) {
            case Macro.PROTEIN:
                if (mealMacroAllocation.proteinCalories > 0) {
                    dayMacroAllocation.proteinCalories += excessCalories;
                    mealMacroAllocation.proteinCalories -= excessCalories;
                }
                break;
            case Macro.CARBS:
                if (mealMacroAllocation.carbCalories > 0) {
                    dayMacroAllocation.carbCalories += excessCalories;
                    mealMacroAllocation.carbCalories -= excessCalories;
                }
                break;
            case Macro.FAT:
                if (mealMacroAllocation.fatCalories > 0) {
                    dayMacroAllocation.fatCalories += excessCalories;
                    mealMacroAllocation.fatCalories -= excessCalories;
                }
                break;
            case Macro.VEGGIE:
                break;
            default:
                throw new Error(`Unsupported macro type for reallocation: ${macro}`);
        }
    }

    private reallocateShortfallCalories(
        macro: Macro,
        shortfallCalories: number,
        mealMacroAllocation: MacroAllocation,
        dayMacroAllocation: MacroAllocation
    ): void {
        switch (macro) {
            case Macro.PROTEIN:
                dayMacroAllocation.proteinCalories -= shortfallCalories;
                mealMacroAllocation.proteinCalories += shortfallCalories;
                break;
            case Macro.CARBS:
                dayMacroAllocation.carbCalories -= shortfallCalories;
                mealMacroAllocation.carbCalories += shortfallCalories;
                break;
            case Macro.FAT:
                dayMacroAllocation.fatCalories -= shortfallCalories;
                mealMacroAllocation.fatCalories += shortfallCalories;
                break;
            case Macro.VEGGIE:
                break;
            default:
                throw new Error(`Unsupported macro type for reallocation: ${macro}`);
        }
    }

    private calculateCaloriesForQuantity(ingredient: Ingredient, quantity: number): number {
        return (
            (ingredient.protein * CALORIES_PER_GRAM.PROTEIN +
                ingredient.carbs * CALORIES_PER_GRAM.CARBS +
                ingredient.fat * CALORIES_PER_GRAM.FAT) * (quantity / 100)
        );
    }
}
