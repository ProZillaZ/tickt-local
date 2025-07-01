import { FlavourProfile } from '../../ingredients/flavour-profile.enum';
import { ScoringStrategy } from '../scoring-strategy';
import { Ingredient } from '../../ingredients/ingredient';

export class FlavourProfileStrategy implements ScoringStrategy {
	private readonly flavourCombinations = new Map<FlavourProfile, FlavourProfile[]>([
		[FlavourProfile.SWEET, [FlavourProfile.SOUR, FlavourProfile.SALTY, FlavourProfile.BITTER]],
		[FlavourProfile.SOUR, [FlavourProfile.SWEET, FlavourProfile.SALTY]],
		[FlavourProfile.SALTY, [FlavourProfile.SWEET, FlavourProfile.SOUR, FlavourProfile.UMAMI]],
		[FlavourProfile.BITTER, [FlavourProfile.SWEET, FlavourProfile.UMAMI]],
		[FlavourProfile.UMAMI, [FlavourProfile.SALTY, FlavourProfile.BITTER]]
	]);

	calculateScore(ingredient: Ingredient, currentSelection: Ingredient[]): number {
		if (currentSelection.length === 0) return 1;

		const complementaryMatches = this.getComplementaryMatches(
			ingredient.flavourProfiles,
			currentSelection.flatMap(ing => ing.flavourProfiles)
		);

		return complementaryMatches > 0 ? 1 : 0.5;
	}

	private getComplementaryMatches(flavours1: FlavourProfile[], flavours2: FlavourProfile[]): number {
		return flavours1.reduce((matches, flavour) => {
			const complementaryFlavours = this.flavourCombinations.get(flavour) || [];
			return matches + (flavours2.some(f2 => complementaryFlavours.includes(f2)) ? 1 : 0);
		}, 0);
	}
}