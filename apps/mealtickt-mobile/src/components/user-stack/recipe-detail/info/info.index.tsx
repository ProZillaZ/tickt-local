import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './info.styles';
import { MealCardProps, RecipeInfoProps } from './info.props';
import { getCardIcon } from 'utils/helpers.ts';
import { useRecipeInfo } from './use-info.ts';
import { Slide } from '../../home/showcase/showcase.props.ts';

export const MealCard = ({ iconType, text, showDot = true }: MealCardProps) => {
    const { sign, toggleSign } = useRecipeInfo();

    return (
        <View style={styles.recipeDetailContainer}>
            <Image style={styles.icon} source={getCardIcon(iconType)} />
            <Text style={styles.text}>{text}</Text>
            {showDot && <View style={styles.dot} />}
            {!showDot && (
                <TouchableOpacity onPress={toggleSign} style={styles.plusContainer}>
                    <Text style={styles.text2}>{!sign ? '+' : '-'}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const RecipeInfo = (info: Slide) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.heading}>{info.title}</Text>
            <View style={styles.columnGap}>
                <MealCard iconType={info.type} text={info.type} />
                <MealCard iconType={'timer'} text={info.time.toString()} />
                <MealCard
                    iconType={'fire'}
                    text={info.mealDetails?.nutritionalInfo?.calories?.toString() + ' calories'}
                />
                <MealCard
                    iconType={'chef-hat'}
                    text={
                        info.mealDetails &&
                        'cuisines' in info.mealDetails &&
                        Array.isArray(info.mealDetails.cuisines)
                            ? info.mealDetails.cuisines[0] || ''
                            : ''
                    }
                />
                <MealCard
                    iconType={'dish'}
                    text={
                        info.mealDetails && 'servings' in info.mealDetails
                            ? info.mealDetails.servings?.toString() || ''
                            : ''
                    }
                    showDot={false}
                />
            </View>
        </View>
    );
};

export default RecipeInfo;
