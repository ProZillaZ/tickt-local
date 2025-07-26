import { Injectable, Logger } from '@nestjs/common';
import { RecipeDocument } from '../schemas/recipe.schema';
import { 
	getSupportedAllergens,
	isValidAllergen,
	ingredientContainsAllergen 
} from '@tickt-ltd/diet-gen-lib';

@Injectable()
export class AllergenFilterService {
	private readonly logger = new Logger(AllergenFilterService.name);

	constructor() {}

	/**
	 * Filters recipes based on allergen constraints
	 * Uses strict filtering to ensure complete allergen avoidance for user safety
	 */
	filterRecipesByAllergens(
		recipes: RecipeDocument[], 
		allergens: string[]
	): RecipeDocument[] {

		if (!allergens || allergens.length === 0) {
			this.logger.log('No allergens specified, returning all recipes');
			return recipes;
		}

		// Validate allergens
		const validationResult = this.validateAllergens(allergens);
		if (!validationResult.valid) {
			this.logger.warn(`Invalid allergens detected: ${validationResult.issues.join(', ')}`);
		}

		this.logger.log(`Filtering ${recipes.length} recipes for allergens: ${allergens.join(', ')}`);
		
		const filteredRecipes: RecipeDocument[] = [];
		const rejectedRecipes: Array<{ recipe: string; allergen: string; ingredient: string }> = [];

		for (const recipe of recipes) {
			const allergenCheck = this.checkRecipeForAllergens(recipe, allergens);
			
			if (allergenCheck.isSafe) {
				filteredRecipes.push(recipe);
			} else {
				rejectedRecipes.push({
					recipe: recipe.name,
					allergen: allergenCheck.allergenFound!,
					ingredient: allergenCheck.ingredientFound!
				});
			}
		}

		const filteredCount = recipes.length - filteredRecipes.length;
		if (filteredCount > 0) {
			this.logger.log(`Filtered out ${filteredCount} recipes due to allergen constraints`);
			
			// Log first few rejections for debugging
			const sampleRejections = rejectedRecipes.slice(0, 3);
			sampleRejections.forEach(rejection => {
				this.logger.log(`   ❌ "${rejection.recipe}" - contains ${rejection.allergen} in "${rejection.ingredient}"`);
			});
			
			if (rejectedRecipes.length > 3) {
				this.logger.log(`   ... and ${rejectedRecipes.length - 3} more`);
			}
		}

		this.logger.log(`✅ ${filteredRecipes.length} recipes passed allergen filtering`);
		return filteredRecipes;
	}

	/**
	 * Checks a recipe for specific allergens with detailed feedback
	 */
	private checkRecipeForAllergens(recipe: RecipeDocument, allergens: string[]): {
		isSafe: boolean;
		allergenFound?: string;
		ingredientFound?: string;
	} {
		for (const ingredient of recipe.ingredients) {
			for (const allergen of allergens) {
				if (ingredientContainsAllergen(ingredient.name, allergen)) {
					return {
						isSafe: false,
						allergenFound: allergen,
						ingredientFound: ingredient.name
					};
				}
			}
		}

		return { isSafe: true };
	}

	/**
	 * Validates allergen list for common issues
	 */
	validateAllergens(allergens: string[]): { valid: boolean; issues: string[] } {
		const issues: string[] = [];
		const supportedAllergens = getSupportedAllergens();

		for (const allergen of allergens) {
			if (!isValidAllergen(allergen)) {
				issues.push(`Unknown allergen: ${allergen}. Supported allergens: ${supportedAllergens.join(', ')}`);
			}
		}

		return {
			valid: issues.length === 0,
			issues
		};
	}
}