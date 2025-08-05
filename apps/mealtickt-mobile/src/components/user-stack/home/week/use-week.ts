import { useEffect, useRef, useState } from 'react';
import { UseWeekProps } from './week.props';

export const useWeek = ({
    defaultWeek,
    onChangeWeek,
    weeks,
    recipes,
    generateMealPlans,
}: UseWeekProps) => {
    const carouselRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [pendingWeekChange, setPendingWeekChange] = useState<number | null>(null);

    const handleNext = () => {
        if (carouselRef.current && activeIndex < weeks - 1) {
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
        setPendingWeekChange(id);
    };

    const onProgressChange = (progress: number) => {
        // When progress is 0, the slide animation is complete
        if (progress === 0 && pendingWeekChange !== null) {
            onChangeWeek(pendingWeekChange);
            setPendingWeekChange(null);
        }
    };

    // Check if we need to generate meal plans when week changes
    useEffect(() => {
        console.log('useWeek effect triggered:', {
            pendingWeekChange,
            hasGenerateMealPlans: !!generateMealPlans,
            recipesLength: recipes?.length,
            recipes: recipes,
        });

        if (pendingWeekChange !== null && generateMealPlans && recipes) {
            // Check if we have enough WeekMealPlan objects for the current week
            // Each WeekMealPlan represents one week of meal plans
            if (pendingWeekChange >= recipes.length) {
                console.log(`Generating meal plans for week ${pendingWeekChange + 1}`);

                // Calculate the specific start and end dates for this week
                const firstRecipe = recipes[0];
                const firstStartDate = new Date(firstRecipe.startDate);

                // Calculate the start date for the target week
                const targetWeekStart = new Date(firstStartDate);
                targetWeekStart.setDate(firstStartDate.getDate() + pendingWeekChange * 7);

                const targetWeekEnd = new Date(targetWeekStart);
                targetWeekEnd.setDate(targetWeekStart.getDate() + 6);

                console.log(`Generating meal plans for week ${pendingWeekChange + 1}:`, {
                    startDate: targetWeekStart.toISOString().split('T')[0],
                    endDate: targetWeekEnd.toISOString().split('T')[0],
                });

                generateMealPlans(targetWeekStart, targetWeekEnd).catch(console.error);
            } else {
                console.log(
                    `No need to generate - week ${pendingWeekChange + 1}, available weeks: ${recipes.length}`,
                );
            }
        }
    }, [pendingWeekChange, generateMealPlans, recipes]);

    useEffect(() => {
        setActiveIndex(defaultWeek);
    }, [defaultWeek]);

    // Check if we need to generate initial meal plans when component loads
    useEffect(() => {
        if (generateMealPlans && recipes && recipes.length === 0) {
            console.log('No meal plans found on load, generating initial meal plans...');
            // For initial generation, use current week dates
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)

            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6); // End of current week (Saturday)

            generateMealPlans(weekStart, weekEnd).catch(console.error);
        }
    }, [generateMealPlans, recipes]);

    return {
        weeks,
        carouselRef,
        activeIndex,
        handleNext,
        handleBack,
        onChangeIndex,
        onProgressChange,
        onChangeWeek,
    };
};
