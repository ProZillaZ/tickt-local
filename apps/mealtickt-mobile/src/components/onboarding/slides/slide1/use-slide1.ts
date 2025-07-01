import { useState, useEffect } from 'react';
import { FormField, OnboardingState, TouchedFields, ValidationErrors } from './slide1.props';
import { validateField, validateForm, isFormValid as checkFormValidity } from './slide1.validation.ts';

// Define initial state with empty values
const initialState: OnboardingState = {
	measurementSystem: '',
	height: '',
	weight: '',
	age: '',
	gender: '',
};

export const useSlide1 = () => {
	const [visible, setVisible] = useState<boolean>(false);
	const [state, setState] = useState<OnboardingState>(initialState);
	const [errors, setErrors] = useState<ValidationErrors>({});
	const [touched, setTouched] = useState<TouchedFields>({});
	const [isFormValid, setIsFormValid] = useState<boolean>(false);
	const [attemptedSubmit, setAttemptedSubmit] = useState(false);

	const onChange = (field: FormField, value: string | number) => {
		const newState = { ...state, [field]: value };
		setState(newState);
		setTouched(prev => ({ ...prev, [field]: true }));
		const fieldError = validateField(field, value, newState);
		setErrors(prev => ({
			...prev,
			[field]: fieldError,
		}));
	};

	const handleSubmitAttempt = () => {
		setAttemptedSubmit(true);
		return isFormValid;
	};

	useEffect(() => {
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
		visible,
		setVisible,
		errors,
		isFormValid,
		shouldShowError,
		handleSubmitAttempt,
	};
};
