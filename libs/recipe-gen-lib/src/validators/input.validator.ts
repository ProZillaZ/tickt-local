import { RecipeGenInputDto, Difficulty, DietType, MealType } from '@tickt-ltd/types';
import { RecipeGenerationError } from '../models';

/**
 * Validation result for recipe generation input
 */
export interface InputValidationResult {
	isValid: boolean;
	errors: string[];
	warnings: string[];
}

/**
 * Validator for recipe generation input
 */
export class InputValidator {
	/**
	 * Validate recipe generation input
	 */
	static validateRecipeInput(input: RecipeGenInputDto): InputValidationResult {
		const errors: string[] = [];
		const warnings: string[] = [];

		// Required fields
		if (!input.dietType) {
			errors.push('dietType is required');
		} else {
			if (!Object.values(DietType).includes(input.dietType)) {
				errors.push(`Invalid dietType '${input.dietType}'. Valid types: ${Object.values(DietType).join(', ')}`);
			}
		}

		if (!input.mealType) {
			errors.push('mealType is required');
		} else {
			if (!Object.values(MealType).includes(input.mealType)) {
				errors.push(`Invalid mealType '${input.mealType}'. Valid types: ${Object.values(MealType).join(', ')}`);
			}
		}

		if (!input.difficulty) {
			errors.push('difficulty is required');
		} else {
			if (!Object.values(Difficulty).includes(input.difficulty)) {
				errors.push(`Invalid difficulty '${input.difficulty}'. Valid difficulties: ${Object.values(Difficulty).join(', ')}`);
			}
		}

		if (input.proteinTarget === undefined || input.proteinTarget === null) {
			errors.push('proteinTarget is required');
		} else {
			if (input.proteinTarget < 0) {
				errors.push('proteinTarget must be non-negative');
			}
			if (input.proteinTarget > 200) {
				warnings.push('proteinTarget is very high (>200g), this may be unrealistic for a single meal');
			}
		}

		if (!input.totalTime) {
			errors.push('totalTime is required');
		} else {
			if (input.totalTime < 1) {
				errors.push('totalTime must be at least 1 minute');
			}
			if (input.totalTime > 480) { // 8 hours
				warnings.push('totalTime is very long (>8 hours), this may be unrealistic');
			}
		}

		if (!input.servings) {
			errors.push('servings is required');
		} else {
			if (input.servings < 1) {
				errors.push('servings must be at least 1');
			}
			if (input.servings > 20) {
				warnings.push('servings is very high (>20), this may affect recipe quality');
			}
		}

		// Optional field validation
		if (input.calorieTarget !== undefined) {
			if (input.calorieTarget < 50) {
				errors.push('calorieTarget is too low (<50 calories)');
			}
			if (input.calorieTarget > 5000) {
				warnings.push('calorieTarget is very high (>5000 calories), this may be unrealistic for a single meal');
			}
		}

		if (input.carbsTarget !== undefined) {
			if (input.carbsTarget < 0) {
				errors.push('carbsTarget must be non-negative');
			}
			if (input.carbsTarget > 500) {
				warnings.push('carbsTarget is very high (>500g), this may be unrealistic');
			}
		}

		if (input.fatsTarget !== undefined) {
			if (input.fatsTarget < 0) {
				errors.push('fatsTarget must be non-negative');
			}
			if (input.fatsTarget > 200) {
				warnings.push('fatsTarget is very high (>200g), this may be unrealistic');
			}
		}

		// Macro consistency validation
		if (input.calorieTarget && input.proteinTarget && input.carbsTarget && input.fatsTarget) {
			const calculatedCalories = (input.proteinTarget * 4) + (input.carbsTarget * 4) + (input.fatsTarget * 9);
			const caloriesDiff = Math.abs(calculatedCalories - input.calorieTarget);
			const tolerance = input.calorieTarget * 0.15; // 15% tolerance

			if (caloriesDiff > tolerance) {
				warnings.push(`Macro targets don't match calorie target. Calculated: ${calculatedCalories}cal, Target: ${input.calorieTarget}cal`);
			}
		}

		// Array field validation
		if (input.allergies && input.allergies.length > 20) {
			warnings.push('Very long allergies list may affect recipe generation quality');
		}

		if (input.dislikedIngredients && input.dislikedIngredients.length > 30) {
			warnings.push('Very long disliked ingredients list may affect recipe generation quality');
		}

		if (input.preferredCuisines && input.preferredCuisines.length > 10) {
			warnings.push('Too many preferred cuisines may make the request too broad');
		}

		// Diet-specific validation
		this.validateDietSpecificConstraints(input, errors, warnings);

		return {
			isValid: errors.length === 0,
			errors,
			warnings
		};
	}

	/**
	 * Validate diet-specific constraints
	 */
	private static validateDietSpecificConstraints(
		input: RecipeGenInputDto,
		errors: string[],
		warnings: string[]
	): void {
		// Vegan diet should not have animal products in preferred ingredients
		if (input.dietType === DietType.VEGAN) {
			const animalProducts = ['chicken', 'beef', 'pork', 'fish', 'dairy', 'milk', 'cheese', 'egg'];
			const conflictingPreferences = input.preferredCuisines?.filter(cuisine =>
				animalProducts.some(product => cuisine.toLowerCase().includes(product))
			);

			if (conflictingPreferences && conflictingPreferences.length > 0) {
				warnings.push(`Vegan diet with potentially conflicting cuisine preferences: ${conflictingPreferences.join(', ')}`);
			}
		}

		// High protein targets should be realistic for plant-based diets
		if ((input.dietType === DietType.VEGAN || input.dietType === DietType.VEGETARIAN) && input.proteinTarget > 50) {
			warnings.push(`High protein target (${input.proteinTarget}g) may be challenging for ${input.dietType} diet`);
		}
	}

	/**
	 * Validate input and throw error if invalid
	 */
	static validateAndThrow(input: RecipeGenInputDto): void {
		const result = this.validateRecipeInput(input);

		if (!result.isValid) {
			const errorMessage = `Invalid recipe generation input: ${result.errors.join(', ')}`;
			throw RecipeGenerationError.validationError(errorMessage);
		}

		// Log warnings if present
		if (result.warnings.length > 0) {
			console.warn(`Input validation warnings: ${result.warnings.join(', ')}`);
		}
	}
}
