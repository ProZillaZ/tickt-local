import { ScoringStrategy } from '../scoring-strategy';
import { Ingredient } from '../../ingredients/ingredient';

export class CookingMethodCompatibilityStrategy implements ScoringStrategy {
	calculateScore(ingredient: Ingredient, currentSelection: Ingredient[]): number {
		if (currentSelection.length === 0) return 1;

		const methodScores: number[] = currentSelection.map(selected => {
			const sharedMethods = this.getSharedCookingMethods(ingredient, selected);
			return sharedMethods.length > 0 ? 1 : 0;
		});

		const sum = methodScores.reduce((acc: number, score: number): number => acc + score, 0);
		return sum / methodScores.length;
	}

	private getSharedCookingMethods(a: Ingredient, b: Ingredient): string[] {
		const aMethods = Object.entries(a.cookingMethods)
			.filter(([_, value]) => value)
			.map(([key]) => key);
		const bMethods = Object.entries(b.cookingMethods)
			.filter(([_, value]) => value)
			.map(([key]) => key);

		return aMethods.filter(method => bMethods.includes(method));
	}
}