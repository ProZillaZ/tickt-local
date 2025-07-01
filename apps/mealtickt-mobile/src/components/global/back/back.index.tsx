import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from './back.styles';
import { BackButtonProps, defaultProps } from './back.props';

const BackButton = ({ onPress, icon = defaultProps.icon, style, iconStyles }: BackButtonProps) => {
	return (
		<TouchableOpacity onPress={onPress} style={[styles.headerContainer, style]}>
			<Image style={[styles.icon, iconStyles]} source={icon} />
		</TouchableOpacity>
	);
};

export default BackButton;
