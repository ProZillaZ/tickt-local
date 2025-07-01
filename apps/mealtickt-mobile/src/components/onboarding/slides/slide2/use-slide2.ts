import { useState, useEffect } from 'react';
import { FormField, OnboardingState, TouchedFields, ValidationErrors } from './slide2.props';
import { validateField, validateForm, isFormValid as checkFormValidity } from './slide2.validation.ts';

// Define initial state with empty values
const initialState: OnboardingState = {
	mealCount: '',
	dietaryPreferences: '',
	activityLevel: '',
};

// Custom hook for managing the onboarding logic
export const useSlide2 = () => {
	const [state, setState] = useState<OnboardingState>(initialState);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [touched, setTouched] = useState<TouchedFields>({});
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);

	const onChange = (field: FormField, value: string | number) => {
		const newState = { ...state, [field]: value };
		setState(newState);
		setTouched(prev => ({ ...prev, [field]: true }));

		// Validate the changed field immediately
		const fieldError = validateField(field, value);
		setErrors(prev => ({
			...prev,
			[field]: fieldError,
		}));
	};

	const handleSubmitAttempt = () => {
		setAttemptedSubmit(true);
		return isFormValid;
	};

	// Validate entire form whenever state changes
	useEffect(() => {
		// Run form validation immediately
		const newErrors = validateForm(state);
		setErrors(newErrors);
		setIsFormValid(checkFormValidity(state));
	}, [state]);

	const shouldShowError = (field: FormField) => {
		return (touched[field] || attemptedSubmit) && errors[field];
	};

	return {
		state,
		setState,
		onChange,
		errors,
		isFormValid,
		shouldShowError,
		handleSubmitAttempt,
	};
};
