import React from 'react';
import { View, Text } from 'react-native';
import { ContentProps } from './content.props';
import { styles } from './content.styles';

const Content: React.FC<ContentProps> = ({ headerText, description, style, titleStyle, descriptionStyle }) => {
	return (
		<View style={[styles.titleContainer, style]}>
			<Text style={[styles.title, titleStyle]}>{headerText}</Text>
			<Text style={[styles.description, descriptionStyle]}>{description}</Text>
		</View>
	);
};

export default Content;
