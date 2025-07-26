import { ScoringStrategy } from "../../models/scoring/scoring-strategy";
import { CuisineCompatibilityStrategy } from '../../models/scoring/strategies/cuisine-compatibility.strategy';
import { CategoryCompatibilityStrategy } from '../../models/scoring/strategies/category-compatibility.strategy';
import { Ingredient } from '../../models/ingredients/ingredient';
import { CookingMethodCompatibilityStrategy } from '../../models/scoring/strategies/cooking-method.strategy';
import { SeasonalCompatibilityStrategy } from '../../models/scoring/strategies/seasonal.strategy';
import { FlavourProfileStrategy } from '../../models/scoring/strategies/flavour-profile.strategies';
import { VarietyStrategy } from '../../models/scoring/strategies/variety.strategy';

export class IngredientScorer {
	private strategies: ScoringStrategy[] = [];

	constructor() {
		this.strategies = [
			new CuisineCompatibilityStrategy(),
			new CategoryCompatibilityStrategy(),
			new CookingMethodCompatibilityStrategy(),
			new SeasonalCompatibilityStrategy(),
			new FlavourProfileStrategy(),
			new VarietyStrategy()
		];
	}

	addStrategy(strategy: ScoringStrategy): void {
		this.strategies.push(strategy);
	}

	calculateCompatibilityScore(ingredient: Ingredient, currentSelection: Ingredient[]): number {
		if (this.strategies.length === 0) return 1;

		const scores = this.strategies.map(strategy =>
			strategy.calculateScore(ingredient, currentSelection)
		);

		return scores.reduce((sum, score) => sum + score, 0) / scores.length;
	}
}