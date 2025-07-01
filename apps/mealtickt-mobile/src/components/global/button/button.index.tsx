import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { ButtonProps, defaultOptions } from './button.props';
import { buttonStyles } from './button.styles';

const Button: React.FC<ButtonProps> = ({
	onClick,
	text,
	disabled,
	style,
	leftIcon,
	textStyles,
	leftIconStyles,
	type = defaultOptions.type,
}) => {
	const styles = buttonStyles({ type });

	return (
		<TouchableOpacity style={[type !== 'none' && styles.button, disabled && styles.inActive, style]}
						  disabled={disabled} onPress={onClick}>
			{leftIcon && <Image source={leftIcon} style={[styles.leftIcon, leftIconStyles]} />}
			<Text style={[styles.buttonText, textStyles]}>{text}</Text>
		</TouchableOpacity>
	);
};

export default Button;
