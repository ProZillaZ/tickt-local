import { Ingredient } from '../ingredients/ingredient';

export interface ScoringStrategy {
	/**
	 * Calculate compatibility score between an ingredient and current selection
	 * @returns number from 0 to 1, where 1 is highest compatibility
	 */
	calculateScore(ingredient: Ingredient, currentSelection: Ingredient[]): number;
}