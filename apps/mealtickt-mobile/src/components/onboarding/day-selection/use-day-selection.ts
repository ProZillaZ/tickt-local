import { days } from 'app/constants/constants';
import { useEffect, useState, useCallback } from 'react';
import { DaySelectionProps } from './selection.props';
import { ONBOARDING } from 'app/constants/onboarding.constants';

export const useDaySelection = ({ onChange, defaultValue }: DaySelectionProps) => {
	const [selectedDays, setSelectedDays] = useState<string[]>(defaultValue || []);
	const [visible, setVisible] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	
	// Use the constant from the centralized file
	const MAX_DAYS = ONBOARDING.VALIDATION.MAX_FREE_DAYS;

	const toggleDay = useCallback((dayId: any) => {
		if (selectedDays.includes(dayId)) {
			// Always allow deselection
			setSelectedDays(selectedDays.filter(id => id !== dayId));
			setError(null);
		} else {
			// Check if adding would exceed the limit
			if (selectedDays.length >= MAX_DAYS) {
				setError(`You can only select up to ${MAX_DAYS} free days`);
				return;
			}
			
			setSelectedDays([...selectedDays, dayId]);
			setError(null);
		}
	}, [selectedDays, MAX_DAYS]);

	// Call onChange when selected days change, but skip the initial render
	useEffect(() => {
		// Skip initial render if selectedDays is empty and defaultValue is undefined
		// Only call onChange if the state has actually changed
		if (defaultValue !== selectedDays) {
			onChange(selectedDays);
		}
	}, [selectedDays, onChange, defaultValue]);

	// Initialize with default value only once
	useEffect(() => {
		if (defaultValue && defaultValue.length > 0) {
			// Ensure default value doesn't exceed the limit
			const limitedSelection = defaultValue.slice(0, MAX_DAYS);
			// Only update if different to avoid infinite loops
			if (JSON.stringify(limitedSelection) !== JSON.stringify(selectedDays)) {
				setSelectedDays(limitedSelection);
			}
		}
	}, [defaultValue, MAX_DAYS]); // Only run when defaultValue changes

	return {
		days,
		selectedDays,
		visible,
		setVisible,
		toggleDay,
		error,
	};
};
