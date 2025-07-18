import { FormField, OnboardingState, ValidationErrors } from './slide5.props';
import { step5Options } from 'app/constants/constants';

// Extract valid options from constants for validation
const validGoals = step5Options.find(option => option.key === 'goal')?.options.map(opt => opt.value) || [];
const validPaces = step5Options.find(option => option.key === 'pace')?.options.map(opt => opt.value) || [];

// Validation error messages
const ERROR_MESSAGES = {
	REQUIRED_FIELD: 'This field is required',
	INVALID_GOAL: 'Please select a valid goal',
	INVALID_PACE: 'Please select a valid pace',
	INVALID_WEIGHT: 'Please enter a valid weight',
};

/**
 * Validates goal selection
 * @param goal The selected goal
 * @returns A validation error message or undefined if valid
 */
export const validateGoal = (goal: string): string | undefined => {
	if (!goal) return ERROR_MESSAGES.REQUIRED_FIELD;

	if (!validGoals.includes(goal)) {
		return ERROR_MESSAGES.INVALID_GOAL;
	}

	return undefined;
};

/**
 * Validates pace selection
 * @param pace The selected pace
 * @returns A validation error message or undefined if valid
 */
export const validatePace = (pace: string): string | undefined => {
	if (!pace) return ERROR_MESSAGES.REQUIRED_FIELD;

	if (!validPaces.includes(pace)) {
		return ERROR_MESSAGES.INVALID_PACE;
	}

	return undefined;
};

/**
 * Validates weight input
 * @param weight The entered weight
 * @returns A validation error message or undefined if valid
 */
export const validateWeight = (weight: string): string | undefined => {
	if (!weight) return ERROR_MESSAGES.REQUIRED_FIELD;

	// Check if weight is a valid number
	const weightNum = parseFloat(weight);
	if (isNaN(weightNum) || weightNum <= 0) {
		return ERROR_MESSAGES.INVALID_WEIGHT;
	}

	return undefined;
};

/**
 * Validates a single field from the form
 * @param key The field key to validate
 * @param value The value to validate
 * @returns A validation error message or undefined if valid
 */
export const validateField = (key: FormField, value: string): string | undefined => {
	switch (key) {
		case 'targetWeight':
			return validateWeight(value);

		case 'goal':
			return validateGoal(value);

		case 'pace':
			return validatePace(value);

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

	// List fields to validate
	const fields: FormField[] = ['targetWeight', 'goal', 'pace'];

	// Validate each field
	fields.forEach(field => {
		const error = validateField(field, String(state[field] || ''));
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

	// All fields are required for slide5
	const requiredFields: FormField[] = ['targetWeight', 'goal', 'pace'];

	const requiredFieldsFilled = requiredFields.every(field => Boolean(state[field]));
	const noErrors = Object.keys(errors).length === 0;

	return requiredFieldsFilled && noErrors;
};
