import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { defaultProps, ToastProps } from './toast.props';
import { styles } from './toast.styles';

const ToastComponent = ({
	style,
	icon = defaultProps.icon,
	wrapTextIconStyles,
	iconStyles,
	text,
	textStyles,
	buttonText,
	actionButonTextStyle,
	actionButtonStyles,
	onActionPress,
}: ToastProps) => {
	return (
		<View style={[styles.headerContainer, style]}>
			<View style={[styles.textIconContainer, wrapTextIconStyles]}>
				{icon && <Image source={icon} style={[styles.icon, iconStyles]} />}
				{text && <Text style={[styles.textStyles, textStyles]}>{text}</Text>}
			</View>
			{
				buttonText &&
				<Pressable onPress={onActionPress} style={[styles.actionButtonStyles, actionButtonStyles]}>
					<Text style={[styles.actionButonTextStyle, actionButonTextStyle]}>{buttonText}</Text>
				</Pressable>
			}
		</View>
	);
};

export default ToastComponent;
