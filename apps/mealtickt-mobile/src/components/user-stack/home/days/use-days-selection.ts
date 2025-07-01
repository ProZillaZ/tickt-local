import { useEffect, useState } from 'react';
import { UseWeekDayProps } from './days.props';

export const useWeekDays = ({ daysOfWeek, defaultDay, onChangeDay }: UseWeekDayProps) => {
	const [activeDay, setActiveDay] = useState<number>(0); // Track the active day

	const handleDayPress = (index: number) => {
		setActiveDay(index);
		onChangeDay(index);
	};

	useEffect(() => {
		setActiveDay(defaultDay);
	}, [defaultDay]);

	return {
		days: daysOfWeek,
		activeDay,
		handleDayPress,
	};
};
