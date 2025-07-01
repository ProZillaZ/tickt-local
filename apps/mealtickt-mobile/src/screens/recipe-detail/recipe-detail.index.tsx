import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './recipe-detail.styles';
import BackButton from 'components/global/back/back.index';
import { RecipeInfo, RecipeRating } from 'components/user-stack/recipe-detail';
import { meals } from 'app/constants/constants.ts';
import Toggle from 'components/global/toggle/toggle.index';
import { useRecipe } from './use-recipe-detail.ts';
import { isTablet } from 'utils/helpers.ts';

const RecipeDetailScreen = () => {
	const { selectedToggleOption, toggleOptions, handleToggle, activeToggle, handleBack } = useRecipe();

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollview}>
				<Image style={styles.image} source={meals[0].image} />
				<BackButton style={styles.backButton} onPress={handleBack} />
				<RecipeInfo info={meals[0]} />
				<Text style={styles.heading}>recipe details</Text>
				<Toggle itemStyles={styles.itemStyle} style={styles.toggle} options={toggleOptions}
						value={selectedToggleOption} onPress={handleToggle} itemWidthOffset={isTablet ? 1.2 : 1.7} />
				{activeToggle()}
				<RecipeRating recipe_id={""}  />
			</ScrollView>
		</View>
	);
};

export default RecipeDetailScreen;
