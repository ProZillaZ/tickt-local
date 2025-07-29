import { showcaseContent } from 'app/constants/constants';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation/navigation.props';
import { showSuccess } from 'utils/toast-config';
import { ShowCaseProps, Slide } from './showcase.props';
import { Meal, Recipe, WeekMealPlan } from '@tickt-ltd/types';

export const useShowcase = () => {
    const carouselRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { navigate } = useNavigation<NavigationProp<'auth'>>();
    const progressPercentage = ((activeIndex + 1) / showcaseContent.length) * 100;

    const onChangeIndex = (id: number) => {
        setActiveIndex(id);
    };

    const onRecipePress = () => navigate('recipe-detail');

    const getSlides = (dayMealPlans: (Recipe | Meal)[]): Slide[] => {
        return dayMealPlans.map((meal: Recipe | Meal) => ({
            id: meal.id,
            image: { uri: meal.imageUrl },
            time: 'cookTime' in meal ? meal.cookTime : 0, // Type guard to check if it's a Recipe
            title: 'name' in meal ? meal.name.toLowerCase() : '',
            type: 'mealTypes' in meal ? meal.mealTypes[0] : '',
        }));
    };

    return {
        showcaseContent,
        carouselRef,
        activeIndex,
        progressPercentage,
        onChangeIndex,
        onRecipePress,
        getSlides,
    };
};
