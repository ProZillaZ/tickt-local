import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './info.styles';
import { MealCardProps, RecipeInfoProps } from './info.props';
import { getCardIcon } from 'utils/helpers.ts';
import { useRecipeInfo } from './use-info.ts';

export const MealCard = ({ iconType, text, showDot = true }: MealCardProps) => {
	const { sign, toggleSign } = useRecipeInfo();

	return (
		<View style={styles.recipeDetailContainer}>
			<Image style={styles.icon} source={getCardIcon(iconType)} />
			<Text style={styles.text}>{text}</Text>
			{showDot && <View style={styles.dot} />}
			{!showDot && <TouchableOpacity onPress={toggleSign} style={styles.plusContainer}><Text
				style={styles.text2}>{!sign ? '+' : '-'}</Text></TouchableOpacity>}
		</View>
	);
};

const RecipeInfo = ({ info }: RecipeInfoProps) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.heading}>{info.heading}</Text>
			<View style={styles.columnGap}>
				<MealCard iconType={info.mealType} text={info.mealType} />
				<MealCard iconType={'timer'} text={info.time} />
				<MealCard iconType={'fire'} text={info.calories} />
				<MealCard iconType={'chef-hat'} text={info.chef} />
				<MealCard iconType={'dish'} text={info.serving} showDot={false} />
			</View>
		</View>
	);
};

export default RecipeInfo;
