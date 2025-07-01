import { ScoringStrategy } from "../scoring-strategy";
import { Ingredient } from '../../ingredients/ingredient';
import { Season } from '../../ingredients/season.enum';

export class SeasonalCompatibilityStrategy implements ScoringStrategy {
	calculateScore(ingredient: Ingredient): number {
		const currentSeason = this.getCurrentSeason();

		if (ingredient.seasonality.includes(Season.ALL_YEAR)) return 1;
		return ingredient.seasonality.includes(currentSeason) ? 1 : 0.5;
	}

	private getCurrentSeason(): Season {
		const month = new Date().getMonth();
		if (month >= 2 && month <= 4) return Season.SPRING;
		if (month >= 5 && month <= 7) return Season.SUMMER;
		if (month >= 8 && month <= 10) return Season.AUTUMN;
		return Season.WINTER;
	}
}