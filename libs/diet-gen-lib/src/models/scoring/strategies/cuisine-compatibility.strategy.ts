import { ScoringStrategy } from '../scoring-strategy';
import { Ingredient } from '../../ingredients/ingredient';

export class CuisineCompatibilityStrategy implements ScoringStrategy {
	calculateScore(ingredient: Ingredient, currentSelection: Ingredient[]): number {
		if (currentSelection.length === 0) return 1;

		const commonCuisines = ingredient.cuisine.filter(cuisine =>
			currentSelection.some(selected => selected.cuisine.includes(cuisine))
		);

		return commonCuisines.length / Math.max(ingredient.cuisine.length, 1);
	}
}
