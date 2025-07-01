import { FormField, IngredientMeasurement, OnboardingState, ValidationErrors } from './slide3.props';
import { allergies, days, slide3SingleOption } from 'app/constants/constants';

// Extract valid options from constants for validation
const validIngredientMeasurements = slide3SingleOption.options.map(opt => opt.id) || [];
const validAllergies = allergies.map(allergy => allergy.id) || [];
const validDays = days.map(day => day.id) || [];

// Validation error messages
const ERROR_MESSAGES = {
	REQUIRED_FIELD: 'This field is required',
	INVALID_INGREDIENT_MEASUREMENT: 'Please select a valid ingredient measurement option',
	INVALID_ALLERGIES: 'One or more selected allergies are invalid',
};

/**
 * Validates allergies category selection
 * @param selectedAllergies The selected allergies array
 * @returns A validation error message or undefined if valid
 */
export const validateCategory = (selectedAllergies: string[]): string | undefined => {
	// This is optional, so we don't require a selection
	if (!selectedAllergies || !Array.isArray(selectedAllergies)) {
		return undefined; // Optional field
	}

	// Check if all selected allergies are valid
	const allValid = selectedAllergies.every(allergyId =>
		validAllergies.includes(allergyId),
	);

	if (!allValid) {
		return ERROR_MESSAGES.INVALID_ALLERGIES;
	}

	return undefined;
};

/**
 * Validates ingredient measurement selection
 * @param ingredientMeasurement The selected ingredient measurement
 * @returns A validation error message or undefined if valid
 */
export const validateIngredientMeasurement = (ingredientMeasurement: string): string | undefined => {
	if (!ingredientMeasurement) return ERROR_MESSAGES.REQUIRED_FIELD;

	if (!validIngredientMeasurements.includes(ingredientMeasurement)) {
		return ERROR_MESSAGES.INVALID_INGREDIENT_MEASUREMENT;
	}

	return undefined;
};

/**
 * Validates days selection
 * @param selectedDays The selected days array
 * @returns A validation error message or undefined if valid
 */
export const validateDays = (selectedDays: string[]): string | undefined => {
	// Days selection is optional, so always return undefined
	return undefined;
};

/**
 * Validates a single field from the form
 * @param key The field key to validate
 * @param value The value to validate
 * @returns A validation error message or undefined if valid
 */
export const validateField = (key: FormField, value: string | string[]): string | undefined => {
	switch (key) {
		case 'allergies':
			return validateCategory(value as string[]);

		case 'ingredientMeasurement':
			return validateIngredientMeasurement(value as string);

		case 'freeDays':
			return validateDays(value as string[]);

		default:
			return undefined;
	}
};

/**
 * Validates the entire form
 * @param state The current form state
 * @returns An object containing validation errors for each field
 */
export const validateForm = (state: OnboardingState): ValidationErrors => {
	const errors: ValidationErrors = {};

	// List required fields
	const fields: FormField[] = ['allergies', 'ingredientMeasurement', 'freeDays'];

	// Validate each field
	fields.forEach(field => {
		const error = validateField(field, state[field]);
		if (error) errors[field] = error;
	});

	return errors;
};

/**
 * Checks if the form is valid (all required fields filled and no errors)
 * @param state The current form state
 * @returns Whether the form is valid
 */
export const isFormValid = (state: OnboardingState): boolean => {
	const errors = validateForm(state);

	// For slide3, we only require 'ingredient' to be filled
	// Category (allergies) and days are optional
	const requiredFields: FormField[] = ['ingredientMeasurement'];

	const requiredFieldsFilled = requiredFields.every(field => Boolean(state[field]));
	const noErrors = Object.keys(errors).length === 0;

	return requiredFieldsFilled && noErrors;
};
