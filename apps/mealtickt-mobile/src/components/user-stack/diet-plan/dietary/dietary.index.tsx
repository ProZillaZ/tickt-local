import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { step2Options } from 'app/constants/constants';
import { styles } from './dietary.styles';
import { DietaryPreferencesProps } from './dietary.props';

const DietaryPreferences = ({ selectedLabel, onUpdate }: DietaryPreferencesProps) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.label}>dietary preferences</Text>
			<View style={styles.items}>
				{
					step2Options[1].options.map((item) => (
						<TouchableOpacity key={item.label} onPress={() => onUpdate('dietaryPreferences', item.label)}
										  style={[styles.container, item.label == selectedLabel && styles.containerActive]}>
							<Text style={styles.text}>{item.label}</Text>
						</TouchableOpacity>
					))
				}
			</View>
		</View>
	);
};

export default DietaryPreferences;
