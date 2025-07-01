import { Ingredient } from '../../ingredients/ingredient';
import { ScoringStrategy } from '../scoring-strategy';
import { IngredientCombinationRules } from '../../ingredients/ingredient-combination-rules';

export class CategoryCompatibilityStrategy implements ScoringStrategy {
	calculateScore(ingredient: Ingredient, currentSelection: Ingredient[]): number {
		if (currentSelection.length === 0) return 1;

		const compatibilityScores = currentSelection.map(selected => {
			const compatibleCategories = ingredient.categories.filter(category =>
				selected.categories.some(selectedCategory =>
					IngredientCombinationRules.isCombinationAllowed(category, selectedCategory)
				)
			);
			return compatibleCategories.length / Math.max(ingredient.categories.length, 1);
		});

		return compatibilityScores.reduce((sum, score) => sum + score, 0) / compatibilityScores.length;
	}
}