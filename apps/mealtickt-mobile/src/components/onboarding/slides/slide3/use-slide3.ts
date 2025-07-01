import { allergies } from 'app/constants/constants.ts';
import { useState, useEffect } from 'react';
import { FormField, OnboardingState, TouchedFields, ValidationErrors } from './slide3.props';
import { validateField, validateForm, isFormValid as checkFormValidity } from './slide3.validation.ts';
import { ONBOARDING } from 'app/constants/onboarding.constants';

const initialState: OnboardingState = {
	allergies: [],
	ingredientMeasurement: '',
	freeDays: [],
};

// Use the constant from the centralized file
const { MAX_FREE_DAYS } = ONBOARDING.VALIDATION;

export const useSlide3 = () => {
	const [state, setState] = useState<OnboardingState>(initialState);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [touched, setTouched] = useState<TouchedFields>({});
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);

	const handleState = (key: FormField, value: any) => {
		// For freeDays, ensure max 2 days are selected
		if (key === 'freeDays' && Array.isArray(value) && value.length > MAX_FREE_DAYS) {
			// Just take the first MAX_FREE_DAYS elements
			value = value.slice(0, MAX_FREE_DAYS);
		}
		
		const newState = { ...state, [key]: value };
		setState(newState);
		setTouched(prev => ({ ...prev, [key]: true }));

		// Validate the changed field immediately
		const fieldError = validateField(key, value);
		setErrors(prev => ({
			...prev,
			[key]: fieldError,
		}));
	};

	const handleSubmitAttempt = () => {
		setAttemptedSubmit(true);
		
		// Additional validation for free days
		if (state.freeDays.length > MAX_FREE_DAYS) {
			setErrors(prev => ({
				...prev,
				freeDays: `You can only select up to ${MAX_FREE_DAYS} free days`,
			}));
			return false;
		}
		
		return isFormValid;
	};

	// Validate entire form whenever state changes
	useEffect(() => {
		// Run form validation immediately
		const newErrors = validateForm(state);
		
		// Add custom validation for free days
		if (state.freeDays.length > MAX_FREE_DAYS) {
			newErrors.freeDays = `You can only select up to ${MAX_FREE_DAYS} free days`;
		}
		
		setErrors(newErrors);
		setIsFormValid(checkFormValidity(state) && state.freeDays.length <= MAX_FREE_DAYS);
	}, [state]);

	const shouldShowError = (field: FormField) => {
		return (touched[field] || attemptedSubmit) && errors[field];
	};

	return {
		state,
		setState,
		allergies,
		allergyLabel: 'any allergies we should know about',
		handleState,
		errors,
		isFormValid,
		shouldShowError,
		handleSubmitAttempt,
	};
};
