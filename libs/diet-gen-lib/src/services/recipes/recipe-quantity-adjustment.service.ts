import { Recipe, NutritionalInfo, Ingredient } from '@tickt-ltd/types';
import { MacroAllocation } from '../../models/macros/macro-allocation';

/**
 * Service for adjusting recipe quantities to meet specific macro targets.
 */
export class RecipeQuantityAdjustmentService {
    /**
     * Calculates the scaling factor based on target macro allocation.
     * @param currentNutrition - Current nutritional info.
     * @param targetMacroAllocation - Target macro allocation.
     * @returns The scaling factor.
     */
    private calculateScalingFactor(currentNutrition: NutritionalInfo, targetMacroAllocation: MacroAllocation): number {
        const targetCalories = targetMacroAllocation.proteinCalories +
                             targetMacroAllocation.carbCalories +
                             targetMacroAllocation.fatCalories;

        if (currentNutrition.calories === 0) {
            throw new Error('Recipe has zero calories - cannot scale');
        }

        const scalingFactor = targetCalories / currentNutrition.calories;

        if (scalingFactor <= 0) {
            throw new Error('Invalid scaling factor - must be positive');
        }

        return scalingFactor;
    }

    /**
     * Scales recipe ingredients proportionally.
     * @param ingredients - Original ingredients.
     * @param scalingFactor - Factor to scale by.
     * @returns Scaled ingredients.
     */
    private scaleIngredients(ingredients: Ingredient[], scalingFactor: number): Ingredient[] {
        return ingredients.map(ingredient =>
            new Ingredient(
                ingredient.name,
                ingredient.amount * scalingFactor,
                ingredient.unit,
                ingredient.id
            )
        );
    }

    /**
     * Creates scaled nutritional info.
     * @param originalNutrition - Original nutritional info.
     * @param scalingFactor - Factor to scale by.
     * @returns Scaled nutritional info.
     */
    private scaleNutritionalInfo(originalNutrition: NutritionalInfo, scalingFactor: number): NutritionalInfo {
        return new NutritionalInfo(
            originalNutrition.calories * scalingFactor,
            originalNutrition.protein * scalingFactor,
            originalNutrition.carbohydrates * scalingFactor,
            originalNutrition.fat * scalingFactor,
            originalNutrition.fiber * scalingFactor
        );
    }

    /**
     * Creates an adjusted recipe with scaled values.
     * @param originalRecipe - Original recipe.
     * @param scaledIngredients - Scaled ingredients.
     * @param scaledNutrition - Scaled nutritional info.
     * @param scalingFactor - Factor used for scaling.
     * @returns New adjusted recipe.
     */
    private createAdjustedRecipe(
        originalRecipe: Recipe,
        scaledIngredients: Ingredient[],
        scaledNutrition: NutritionalInfo,
        scalingFactor: number
    ): Recipe {
        const adjustedRecipe = new Recipe(
            originalRecipe.name,
            originalRecipe.description,
            scaledIngredients,
            originalRecipe.instructions,
            originalRecipe.prepTime,
            originalRecipe.cookTime,
            Math.max(1, Math.round(originalRecipe.servings * scalingFactor)),
            originalRecipe.cuisines,
            originalRecipe.mealTypes,
            originalRecipe.dietTypes,
            originalRecipe.tags,
            originalRecipe.difficulty,
            scaledNutrition,
            originalRecipe.imageUrl,
            originalRecipe.id
        );

        adjustedRecipe.setMetadata({
            createdBy: originalRecipe.createdBy,
            createdAt: originalRecipe.createdAt,
            updatedAt: originalRecipe.updatedAt,
            id: originalRecipe.id
        });

        return adjustedRecipe;
    }

    /**
     * Adjusts a recipe's serving size to better match the target macro allocation.
     * @param recipe - The recipe to adjust.
     * @param targetMacroAllocation - The target macro allocation for the meal.
     * @returns A new recipe with adjusted serving size and updated nutritional info.
     */
    scaleRecipeForMacros(recipe: Recipe, targetMacroAllocation: MacroAllocation): Recipe {
        const scalingFactor = this.calculateScalingFactor(recipe.nutritionalInfo, targetMacroAllocation);

        const scaledIngredients = this.scaleIngredients(recipe.ingredients, scalingFactor);
        const scaledNutrition = this.scaleNutritionalInfo(recipe.nutritionalInfo, scalingFactor);

        return this.createAdjustedRecipe(recipe, scaledIngredients, scaledNutrition, scalingFactor);
    }

    /**
     * Calculates the required serving size for a recipe to meet calorie targets.
     * @param recipe - The recipe to calculate for.
     * @param targetCalories - The target calorie amount.
     * @returns The required serving size.
     */
    calculateRequiredServings(recipe: Recipe, targetCalories: number): number {
        if (recipe.nutritionalInfo.calories === 0) {
            throw new Error('Recipe has zero calories - cannot calculate servings');
        }

        if (targetCalories <= 0) {
            throw new Error('Target calories must be positive');
        }

        const scalingFactor = targetCalories / recipe.nutritionalInfo.calories;
        return Math.round(recipe.servings * scalingFactor * 100) / 100;
    }

    /**
     * Projects nutritional info for a recipe with a given scaling factor.
     * @param recipe - The recipe to project for.
     * @param scalingFactor - The factor to scale by.
     * @returns Projected nutritional info.
     */
    projectNutritionalInfo(recipe: Recipe, scalingFactor: number): NutritionalInfo {
        if (scalingFactor <= 0) {
            throw new Error('Scaling factor must be positive');
        }

        return new NutritionalInfo(
            recipe.nutritionalInfo.calories * scalingFactor,
            recipe.nutritionalInfo.protein * scalingFactor,
            recipe.nutritionalInfo.carbohydrates * scalingFactor,
            recipe.nutritionalInfo.fat * scalingFactor,
            recipe.nutritionalInfo.fiber * scalingFactor
        );
    }

    /**
     * Validates if a recipe can be safely scaled.
     * @param recipe - The recipe to validate.
     * @returns True if recipe can be scaled, false otherwise.
     */
    canScaleRecipe(recipe: Recipe): boolean {
        try {
            return recipe.nutritionalInfo.calories > 0 &&
                   recipe.ingredients.length > 0 &&
                   recipe.servings > 0;
        } catch {
            return false;
        }
    }

    /**
     * Gets reasonable scaling limits for a recipe.
     * @param recipe - The recipe to get limits for.
     * @returns Object with min and max scaling factors.
     */
    getScalingLimits(recipe: Recipe): { min: number; max: number } {
        if (!this.canScaleRecipe(recipe)) {
            return { min: 0, max: 0 };
        }

        // Reasonable limits: 0.1x to 10x original size
        return { min: 0.1, max: 10.0 };
    }

    /**
     * Previews what changes would be made to a recipe without creating a new one.
     * @param recipe - The recipe to preview.
     * @param targetMacroAllocation - The target macro allocation.
     * @returns Preview of changes.
     */
    previewScaling(recipe: Recipe, targetMacroAllocation: MacroAllocation): {
        scalingFactor: number;
        newServings: number;
        projectedNutrition: NutritionalInfo;
        canScale: boolean;
    } {
        const canScale = this.canScaleRecipe(recipe);

        if (!canScale) {
            return {
                scalingFactor: 0,
                newServings: 0,
                projectedNutrition: new NutritionalInfo(0, 0, 0, 0, 0),
                canScale: false
            };
        }

        const scalingFactor = this.calculateScalingFactor(recipe.nutritionalInfo, targetMacroAllocation);
        const newServings = Math.round(recipe.servings * scalingFactor * 100) / 100;
        const projectedNutrition = this.projectNutritionalInfo(recipe, scalingFactor);

        return {
            scalingFactor,
            newServings,
            projectedNutrition,
            canScale: true
        };
    }
}
