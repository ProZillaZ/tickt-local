import { Meal, Recipe } from '@tickt-ltd/types';
import { ImageSourcePropType } from 'react-native';

export interface Slide {
    id: string;
    image: ImageSourcePropType;
    title: string;
    type: string;
    time: number;
    mealDetails: Recipe | Meal;
}

export interface ShowCaseProps {
    swapedRecipe: number;
    isSkipDay?: boolean;
    isRepeatRecipe?: boolean;
    isRepeatDay?: boolean;
    isLoggedMeal?: boolean | string;
    onOptionsPress: (type: boolean) => void;
    onMealSwapPress: () => void;
    dayMealPlans: (Recipe | Meal)[];
}
