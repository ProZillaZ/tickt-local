import { FormField, OnboardingState, ValidationErrors } from './slide2.props';
import { step2Options } from 'app/constants/constants';

// Extract valid options from constants for validation
const mealCountOptions = step2Options.find(option => option.key === 'mealCount')?.options.map(opt => opt.value) || [];
const dietaryPreferenceOptions = step2Options.find(option => option.key === 'dietaryPreferences')?.options.map(opt => opt.value) || [];
const activityLevelOptions = step2Options.find(option => option.key === 'activityLevel')?.options.map(opt => opt.value) || [];

/**
 * Validates eating frequency selection
 * @param mealCount The selected eating frequency value
 * @returns A validation error message or undefined if valid
 */
export const validateMealCount = (mealCount: string): string | undefined => {
	if (!mealCount) return 'This field is required';

	if (!mealCountOptions.includes(mealCount)) {
		return 'Please select a valid meal count';
	}

	return undefined;
};

/**
 * Validates dietary preference selection
 * @param dietaryPreference The selected dietary preference
 * @returns A validation error message or undefined if valid
 */
export const validateDietaryPreference = (dietaryPreference: string): string | undefined => {
	if (!dietaryPreference) return 'This field is required';

	if (!dietaryPreferenceOptions.includes(dietaryPreference)) {
		return 'Please select a valid dietary preference';
	}

	return undefined;
};

/**
 * Validates activity level selection
 * @param active The selected activity level
 * @returns A validation error message or undefined if valid
 */
export const validateActive = (active: string): string | undefined => {
	if (!active) return 'This field is required';

	if (!activityLevelOptions.includes(active)) {
		return 'Please select a valid activity level';
	}

	return undefined;
};

/**
 * Validates a single field from the form
 * @param key The field key to validate
 * @param value The value to validate
 * @returns A validation error message or undefined if valid
 */
export const validateField = (key: FormField, value: string | number): string | undefined => {
	if (!value) return 'This field is required';

	const stringValue = String(value);

	switch (key) {
		case 'mealCount':
			return validateMealCount(stringValue);

		case 'dietaryPreferences':
			return validateDietaryPreference(stringValue);

		case 'activityLevel':
			return validateActive(stringValue);

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

	// List of fields to validate - extract from step2Options to ensure consistency
	const fields = step2Options.map(option => option.key as FormField);

	// Validate each field
	fields.forEach(field => {
		const error = validateField(field, state[field] || '');
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
	// Get required fields from step2Options to ensure consistency
	const requiredFields = step2Options.map(option => option.key as FormField);

	const allFieldsFilled = requiredFields.every(field => Boolean(state[field]));
	const noErrors = Object.keys(errors).length === 0;

	return allFieldsFilled && noErrors;
};
