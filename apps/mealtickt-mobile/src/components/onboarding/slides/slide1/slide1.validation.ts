import { FormField, MeasurementSystem, OnboardingState, ValidationErrors } from './slide1.props';

/**
 * Validates a height value based on the measurement system
 * @param height The height value to validate
 * @param measurementSystem The current measurement system
 * @returns A validation error message or undefined if valid
 */
export const validateHeight = (height: string, measurementSystem: MeasurementSystem): string | undefined => {
	if (!height) return 'This field is required';

	if (measurementSystem === 'cmKg') {
		// For cm, check if it's a valid number between 50-200
		const heightCm = parseFloat(height);
		if (isNaN(heightCm)) return 'Please enter a valid number';
		if (heightCm < 50 || heightCm > 200) return 'Height should be between 50-200 cm';
	} else if (measurementSystem === 'ftLbs') {
		// For ft, check if it's in format like 5.2 (5 ft 2 inches)
		const heightParts = height.split('.');
		if (heightParts.length !== 2) return 'Please use format like 5.11 (5ft 11in)';
		const ft = parseInt(heightParts[0]);
		const inches = parseInt(heightParts[1]);
		if (isNaN(ft) || isNaN(inches)) return 'Please enter valid numbers';
		if (ft < 1 || ft > 7) return 'Feet should be between 1-7';
		if (inches < 0 || inches > 11) return 'Inches should be between 0-11';
	} else {
		return 'Please select a measurement system first';
	}

	return undefined;
};

/**
 * Validates a weight value based on the measurement system
 * @param weight The weight value to validate
 * @param measurementSystem The current measurement system
 * @returns A validation error message or undefined if valid
 */
export const validateWeight = (weight: string, measurementSystem: MeasurementSystem): string | undefined => {
	if (!weight) return 'This field is required';

	if (measurementSystem === 'cmKg') {
		// For kg, check if it's a valid number between 40-200
		const weightKg = parseFloat(weight);
		if (isNaN(weightKg)) return 'Please enter a valid number';
		if (weightKg < 40 || weightKg > 200) return 'Weight should be between 40-200 kg';
	} else if (measurementSystem === 'ftLbs') {
		// For lbs, check if it's a valid number between 88-440
		const weightLbs = parseFloat(weight);
		if (isNaN(weightLbs)) return 'Please enter a valid number';
		if (weightLbs < 88 || weightLbs > 440) return 'Weight should be between 88-440 lbs';
	} else {
		return 'Please select a measurement system first';
	}

	return undefined;
};

/**
 * Validates an age value
 * @param age The age value to validate
 * @returns A validation error message or undefined if valid
 */
export const validateAge = (age: string): string | undefined => {
	if (!age) return 'This field is required';

	const ageNum = parseInt(age);
	if (isNaN(ageNum)) return 'Please enter a valid number';
	if (ageNum < 18 || ageNum > 90) return 'Age should be between 18-90';

	return undefined;
};

/**
 * Validates a gender selection
 * @param gender The selected gender value
 * @returns A validation error message or undefined if valid
 */
export const validateGender = (gender: string): string | undefined => {
	if (!gender) return 'This field is required';

	if (!['male', 'female', 'not-specified'].includes(gender)) {
		return 'Please select a gender option';
	}

	return undefined;
};

/**
 * Validates a measurement system selection
 * @param system The selected measurement system
 * @returns A validation error message or undefined if valid
 */
export const validateMeasurementSystem = (system: string): string | undefined => {
	if (!system) return 'This field is required';

	if (!['cmKg', 'ftLbs'].includes(system)) {
		return 'Please select a measurement system';
	}

	return undefined;
};

/**
 * Validates a single field from the form
 * @param key The field key to validate
 * @param value The value to validate
 * @param state The current form state (needed for contextual validation)
 * @returns A validation error message or undefined if valid
 */
export const validateField = (key: FormField, value: string | number, state: OnboardingState): string | undefined => {
	if (!value) return 'This field is required';

	const stringValue = String(value);
	const measurementSystem = state.measurementSystem as MeasurementSystem;

	switch (key) {
		case 'height':
			return validateHeight(stringValue, measurementSystem);

		case 'weight':
			return validateWeight(stringValue, measurementSystem);

		case 'age':
			return validateAge(stringValue);

		case 'gender':
			return validateGender(stringValue);

		case 'measurementSystem':
			return validateMeasurementSystem(stringValue);

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

	// List of fields to validate
	const fields: FormField[] = [
		'measurementSystem',
		'height',
		'weight',
		'age',
		'gender',
	];

	// Validate each field
	fields.forEach(field => {
		const error = validateField(field, state[field], state);
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
	const requiredFields: FormField[] = [
		'measurementSystem',
		'height',
		'weight',
		'age',
		'gender',
	];

	const allFieldsFilled = requiredFields.every(field => Boolean(state[field]));
	const noErrors = Object.keys(errors).length === 0;

	return allFieldsFilled && noErrors;
};
