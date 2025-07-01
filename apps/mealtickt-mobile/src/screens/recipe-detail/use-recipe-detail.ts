import { meals, recipeToggleOptions } from 'app/constants/constants';
import React, { useState } from 'react';
import { RecipeDirection, RecipeIngredients, RecipeMacros } from 'components/user-stack/recipe-detail';
import { RecipeComponentProps } from './recipe-detail.props';
import { useNavigation } from '@react-navigation/native';

export const useRecipe = () => {
	const [toggleOption, setToggleOption] = useState(0);
	const { goBack } = useNavigation();

	const screens = [
		{ component: RecipeIngredients, params: { data: meals[0].ingradients } },
		{ component: RecipeDirection, params: { data: meals[0].directions } },
		{ component: RecipeMacros, params: { data: meals[0].macros } },
	] as { component: React.ComponentType<RecipeComponentProps>, params: RecipeComponentProps }[];

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
