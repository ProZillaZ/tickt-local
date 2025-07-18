import { RecipeDto } from '@tickt-ltd/types';
import { LoggerInterface, RecipeGenerationError } from '../models';

export class RecipeParserService {
	constructor(private readonly logger?: LoggerInterface) {
		this.logger = logger || console;
	}

	async parseRecipe(recipeString: string): Promise<RecipeDto> {
		try {
			this.logger?.log('Attempting to parse recipe string', 'RecipeParserService');

			const cleanedString = this.cleanJsonString(recipeString);
			this.logger?.log(`Cleaned JSON string: ${cleanedString}`, 'RecipeParserService');

			const jsonMatch = cleanedString.match(/\{[\s\S]*\}/);
			if (!jsonMatch) {
				throw RecipeGenerationError.parsingError(
					new Error('No JSON object found in the response'),
					recipeString
				);
			}
			const jsonString = jsonMatch[0];
			this.logger?.log(`Extracted JSON string: ${jsonString}`, 'RecipeParserService');

			const parsedRecipe = JSON.parse(jsonString);
			this.logger?.log(`Parsed Recipe: ${JSON.stringify(parsedRecipe, null, 2)}`, 'RecipeParserService');

			this.validateRecipeStructure(parsedRecipe);

			return parsedRecipe as RecipeDto;
		} catch (error) {
			if (error instanceof RecipeGenerationError) {
				throw error;
			}

			this.handleParseError(error, recipeString);
			throw RecipeGenerationError.parsingError(error as Error, recipeString);
		}
	}

	private cleanJsonString(str: string): string {
		const startIndex = str.indexOf('{');
		const endIndex = str.lastIndexOf('}');
		if (startIndex === -1 || endIndex === -1) {
			throw new Error('No valid JSON object found in the string');
		}
		return str.slice(startIndex, endIndex + 1);
	}

	private validateRecipeStructure(recipe: any): void {
		const requiredFields = [
			'name', 'description', 'ingredients', 'instructions',
			'prepTime', 'cookTime', 'servings', 'mealTypes',
			'dietTypes', 'difficulty', 'nutritionalInfo',
		];

		for (const field of requiredFields) {
			if (!(field in recipe)) {
				throw new Error(`Missing required field: ${field}`);
			}
		}

		// Additional validation
		if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
			throw new Error('Recipe must have at least one ingredient');
		}

		if (!Array.isArray(recipe.instructions) || recipe.instructions.length === 0) {
			throw new Error('Recipe must have at least one instruction');
		}

		if (typeof recipe.nutritionalInfo !== 'object') {
			throw new Error('Recipe must have nutritional information');
		}
	}

	private handleParseError(error: any, recipeString: string): void {
		if (error instanceof SyntaxError) {
			this.logger?.error(`JSON parsing error: ${error.message}`, error, 'RecipeParserService');
		} else if (Array.isArray(error)) {
			this.logger?.error(`Recipe validation failed: ${error.map((e: any) => Object.values(e.constraints)).join(', ')}`, error, 'RecipeParserService');
		} else {
			this.logger?.error(`Failed to parse recipe: ${error.message}`, error, 'RecipeParserService');
		}
		this.logger?.error(`Raw recipe string: ${recipeString}`, undefined, 'RecipeParserService');
	}
}
