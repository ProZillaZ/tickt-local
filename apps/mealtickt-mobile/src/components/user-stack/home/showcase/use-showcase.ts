import { showcaseContent } from 'app/constants/constants';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showSuccess } from 'utils/toast-config';
import { ShowCaseProps, Slide } from './showcase.props';
import { Meal, Recipe, WeekMealPlan } from '@tickt-ltd/types';
import { RootStackParamList } from 'app/components/bottom-navigation/stack/stack.props';

export const useShowcase = () => {
    const carouselRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const progressPercentage = ((activeIndex + 1) / showcaseContent.length) * 100;

    const onChangeIndex = (id: number) => {
        setActiveIndex(id);
    };

    const onRecipePress = (recipe: Slide | undefined) => {
        if (recipe) {
            navigation.navigate('recipe-detail', { recipe });
        }
    };

    const getSlides = (dayMealPlans: (Recipe | Meal)[]): Slide[] => {
        return dayMealPlans.map((meal: Recipe | Meal) => ({
            id: meal.id,
            image: { uri: meal.imageUrl },
            time: 'cookTime' in meal ? meal.cookTime : 0, // Type guard to check if it's a Recipe
            title: 'name' in meal ? meal.name.toLowerCase() : '',
            type: 'mealTypes' in meal ? meal.mealTypes[0] : '',
            mealDetails: meal,
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
