import { weeks as TempWeeks } from 'app/constants/constants';
import { useEffect, useRef, useState } from 'react';
import { UseWeekProps } from './week.props';
import { getMonthWeeks } from 'utils/helpers.ts';

export const useWeek = ({ defaultWeek, onChangeWeek }: UseWeekProps) => {
	const carouselRef = useRef<any>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [weeks, setWeeks] = useState<string[]>(['']);

	const handleNext = () => {
		if (carouselRef.current && activeIndex < weeks.length - 1) {
			carouselRef.current.scrollTo({ index: activeIndex + 1, animated: true });
		}
	};

	const handleBack = () => {
		if (carouselRef.current && activeIndex > 0) {
			carouselRef.current.scrollTo({ index: activeIndex - 1, animated: true });
		}
	};

	const onChangeIndex = (id: number) => {
		setActiveIndex(id);
		onChangeWeek(id);
	};

	useEffect(() => {
		setActiveIndex(defaultWeek);
	}, [defaultWeek]);

	useEffect(() => {
		const year = new Date().getFullYear();
		const month = new Date().getMonth();
		const result = getMonthWeeks(year, month);
		onChangeIndex(result.currentWeek);
		setWeeks(result.weeks);
	}, []);

	return {
		weeks: weeks || TempWeeks,
		carouselRef,
		activeIndex,
		handleNext,
		handleBack,
		onChangeIndex,
		onChangeWeek,
	};
};
