import { useEffect, useRef, useState } from 'react';
import { UseWeekProps } from './week.props';
import { getMonthWeeks } from 'utils/helpers.ts';

export const useWeek = ({ defaultWeek, onChangeWeek, weeks }: UseWeekProps) => {
    const carouselRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

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

    return {
        weeks,
        carouselRef,
        activeIndex,
        handleNext,
        handleBack,
        onChangeIndex,
        onChangeWeek,
    };
};
