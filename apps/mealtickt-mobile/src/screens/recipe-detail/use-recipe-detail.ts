import { meals, recipeToggleOptions } from 'app/constants/constants';
import React, { useState } from 'react';
import {
    RecipeDirection,
    RecipeIngredients,
    RecipeMacros,
} from 'components/user-stack/recipe-detail';
import { RecipeComponentProps } from './recipe-detail.props';
import { useNavigation } from '@react-navigation/native';
import { Slide } from 'app/components/user-stack/home/showcase/showcase.props';

export const useRecipe = (recipe: Slide) => {
    const [toggleOption, setToggleOption] = useState(0);
    const { goBack } = useNavigation();

    const screens = [
        { component: RecipeIngredients, params: { data: recipe.mealDetails?.ingredients } },
        { component: RecipeDirection, params: { data: (recipe.mealDetails as any)?.instructions } },
        { component: RecipeMacros, params: { data: (recipe.mealDetails as any)?.nutritionalInfo } },
    ] as { component: React.ComponentType<RecipeComponentProps>; params: RecipeComponentProps }[];

    const handleToggle = (id: number) => setToggleOption(id);
    const handleBack = () => goBack();
    const activeToggle = () => {
        const component = screens[toggleOption].component;
        const params = screens[toggleOption].params;
        return React.createElement(component, params);
    };

    return {
        selectedToggleOption: toggleOption,
        toggleOptions: recipeToggleOptions,
        handleToggle,
        activeToggle,
        handleBack,
    };
};
