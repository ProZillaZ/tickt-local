import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './progress.styles';

const ProgressScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>this feature is not available in your region</Text>
		</View>
	);
};

export default ProgressScreen;
