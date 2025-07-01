import { Ingredient } from '../../models/ingredients/ingredient';
import { MealType, Macro, Allergen, DietType } from '@tickt-engineering/types';
import { IngredientScorer } from './ingredient-scorer';
import { VarietyStrategy } from '../../models/scoring/strategies/variety.strategy';

export class IngredientSelectionService {
    private scorer: IngredientScorer;
    private varietyStrategy: VarietyStrategy;

    constructor(private ingredients: Ingredient[]) {
        this.varietyStrategy = new VarietyStrategy();
        this.scorer = new IngredientScorer();
    }

    /**
     * Selects compatible ingredients for a meal based on given criteria.
     * @param {DietType} dietType - The diet type (e.g., vegetarian, vegan, omnivore).
     * @param {MealType} mealType - The type of meal (e.g., breakfast, lunch, dinner).
     * @param {Allergen[]} allergens - List of allergens to avoid.
     * @param {Macro[]} neededMacros - List of macronutrients needed for the meal.
     * @returns {Ingredient[]} An array of selected compatible ingredients.
     */
    public selectCompatibleIngredients(
        dietType: DietType,
        mealType: MealType,
        allergens: Allergen[],
        neededMacros: Macro[],// Add more allowed combinations as needed
    ): Ingredient[] {
        const selectedIngredients: Ingredient[] = [];

        for (const macro of neededMacros) {
            const compatibleIngredient = this.findCompatibleIngredient(
                macro,
                mealType,
                dietType,
                allergens,
                selectedIngredients,
            );

            if (compatibleIngredient) {
                selectedIngredients.push(compatibleIngredient);
            }
        }

        return selectedIngredients;
    }

    /**
     * Finds a compatible ingredient for a specific macro and meal criteria.
     * @param {Macro} macro - The macronutrient category needed.
     * @param {MealType} mealType - The type of meal.
     * @param {DietType} dietType - The diet type.
     * @param {string[]} allergens - List of allergens to avoid.
     * @param {Ingredient[]} currentSelection - Currently selected ingredients.
     * @returns {Ingredient | null} A compatible ingredient or null if none found.
     * @private
     */
    // private findCompatibleIngredient(
    //     macro: Macro,
    //     mealType: MealType,
    //     dietType: DietType,
    //     allergens: Allergen[],
    //     currentSelection: Ingredient[],
    // ): Ingredient | null {
    //     const candidates = this.ingredients.filter(ingredient =>
    //         ingredient.macro === macro &&
    //         ingredient.mealTypes.includes(mealType) &&
    //         ingredient.dietTypes.includes(dietType) &&
    //         !ingredient.allergens.some(allergen => allergens.includes(allergen)) &&
    //         this.isCompatibleWithCurrentSelection(ingredient, currentSelection) &&
    //         !currentSelection.some(selected => selected.id === ingredient.id)
    //     );
    //
    //     if (candidates.length === 0) return null;
    //
    //     // Sort candidates by compatibility score
    //     const scoredCandidates = candidates.map(candidate => ({
    //         ingredient: candidate,
    //         score: this.calculateCompatibilityScore(candidate, currentSelection)
    //     }));
    //
    //     // Group candidates by score to get all equally compatible options
    //     const groupedByScore = groupBy(scoredCandidates, 'score');
    //     const highestScore = Math.max(...Object.keys(groupedByScore).map(Number));
    //     const bestCandidates = groupedByScore[highestScore];
    //
    //     // Randomly select from the best candidates
    //     return bestCandidates[Math.floor(Math.random() * bestCandidates.length)].ingredient;
    // }

    findCompatibleIngredient(
        macro: Macro,
        mealType: MealType,
        dietType: DietType,
        allergens: Allergen[],
        currentSelection: Ingredient[],
    ): Ingredient | null {
        const candidates = this.ingredients.filter(ingredient =>
            ingredient.macro === macro &&
            ingredient.mealTypes.includes(mealType) &&
            ingredient.dietTypes.includes(dietType) &&
            !ingredient.allergens.some(allergen => allergens.includes(allergen))
        );

        if (candidates.length === 0) return null;

        const scoredCandidates = candidates.map(candidate => ({
            ingredient: candidate,
            score: this.scorer.calculateCompatibilityScore(candidate, currentSelection)
        }));

        const scoreGroups = new Map<number, Ingredient[]>();
        scoredCandidates.forEach(({ ingredient, score }) => {
            const roundedScore = Math.round(score * 10) / 10;
            if (!scoreGroups.has(roundedScore)) {
                scoreGroups.set(roundedScore, []);
            }
            scoreGroups.get(roundedScore)!.push(ingredient);
        });

        const highestScore = Math.max(...Array.from(scoreGroups.keys()));
        const bestCandidates = scoreGroups.get(highestScore)!;

        const selectedIngredient = bestCandidates[Math.floor(Math.random() * bestCandidates.length)];

        if (selectedIngredient) {
            this.varietyStrategy.recordIngredientUsage(selectedIngredient.id);
        }

        return selectedIngredient;
    }

    // /**
    //  * Checks if an ingredient is compatible with the current selection.
    //  * @param {Ingredient} ingredient - The ingredient to check.
    //  * @param {Ingredient[]} currentSelection - Currently selected ingredients.
    //  * @returns {boolean} True if the ingredient is compatible, false otherwise.
    //  * @private
    //  */
    // private isCompatibleWithCurrentSelection(ingredient: Ingredient, currentSelection: Ingredient[]): boolean {
    //     if (currentSelection.length === 0) return true;
    //
    //     return currentSelection.every(selectedIngredient =>
    //         this.areCategoriesCompatible(ingredient.categories, selectedIngredient.categories)
    //     );
    // }
    //
    // /**
    //  * Checks if two sets of food categories are compatible.
    //  * @param {IngredientCategory[]} categories1 - First set of food categories.
    //  * @param {IngredientCategory[]} categories2 - Second set of food categories.
    //  * @returns {boolean} True if the categories are compatible, false otherwise.
    //  * @private
    //  */
    // private areCategoriesCompatible(categories1: IngredientCategory[], categories2: IngredientCategory[]): boolean {
    //     return categories1.some(cat1 =>
    //         categories2.some(cat2 => IngredientCombinationRules.isCombinationAllowed(cat1, cat2))
    //     );
    // }
    //
    // /**
    //  * Calculates a compatibility score for an ingredient with the current selection.
    //  * @param {Ingredient} ingredient - The ingredient to score.
    //  * @param {Ingredient[]} currentSelection - Currently selected ingredients.
    //  * @returns {number} The compatibility score.
    //  * @private
    //  */
    // private calculateCompatibilityScore(ingredient: Ingredient, currentSelection: Ingredient[]): number {
    //     if (currentSelection.length === 0) return 1;
    //
    //     let score = 0;
    //
    //     // Check cuisine compatibility
    //     const commonCuisines = ingredient.cuisine.filter(cuisine =>
    //         currentSelection.some(selected => selected.cuisine.includes(cuisine)),
    //     );
    //     score += commonCuisines.length;
    //
    //     // Check for complementary categories
    //     score += currentSelection.reduce((sum, selected) =>
    //             sum + (this.areCategoriesCompatible(ingredient.categories, selected.categories) ? 2 : 0),
    //         0,
    //     );
    //
    //     // Add more scoring criteria as needed
    //
    //     return score;
    // }
}