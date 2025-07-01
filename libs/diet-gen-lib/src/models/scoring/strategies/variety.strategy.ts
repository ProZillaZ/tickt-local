import { ScoringStrategy } from '../scoring-strategy';
import { Ingredient } from '../../ingredients/ingredient';

export class VarietyStrategy implements ScoringStrategy {
	private static readonly RECENT_USAGE_PENALTY = 0.5;
	private static readonly USAGE_HISTORY_SIZE = 14; // Track usage across 2 weeks worth of meals
	private recentlyUsedIngredients: Map<number, number[]> = new Map(); // ingredientId -> [timestampList]

	calculateScore(ingredient: Ingredient): number {
		this.cleanOldEntries();

		// Penalize ingredients that have been used recently
		const usageCount = this.getRecentUsageCount(ingredient.id);
		return Math.max(0, 1 - (usageCount * VarietyStrategy.RECENT_USAGE_PENALTY));
	}

	recordIngredientUsage(ingredientId: number): void {
		const currentTime = Date.now();
		const usageHistory = this.recentlyUsedIngredients.get(ingredientId) || [];
		usageHistory.push(currentTime);
		this.recentlyUsedIngredients.set(ingredientId, usageHistory);
	}

	private getRecentUsageCount(ingredientId: number): number {
		return this.recentlyUsedIngredients.get(ingredientId)?.length || 0;
	}

	private cleanOldEntries(): void {
		const cutoffTime = Date.now() - (VarietyStrategy.USAGE_HISTORY_SIZE * 24 * 60 * 60 * 1000);

		this.recentlyUsedIngredients.forEach((timestamps, ingredientId) => {
			const validTimestamps = timestamps.filter(timestamp => timestamp > cutoffTime);
			if (validTimestamps.length === 0) {
				this.recentlyUsedIngredients.delete(ingredientId);
			} else {
				this.recentlyUsedIngredients.set(ingredientId, validTimestamps);
			}
		});
	}
}