import { View, Text } from 'react-native';
import React from 'react';
import { RecipeIngradientProps } from './ingredients.props.ts';
import { styles } from './ingredients.styles.ts';

const RecipeIngadients: React.FC<RecipeIngradientProps> = ({ data }) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.heading}>ingredients</Text>
			<View style={styles.optionsContainer}>
				{
					data?.map((ingradient, id) => (
						<Text style={styles.option} key={id}>{ingradient}</Text>
					))
				}
			</View>
		</View>
	);
};

export default RecipeIngadients;
