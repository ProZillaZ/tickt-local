import { ImageSourcePropType } from 'react-native';

export interface ButtonProps {
	onClick: () => void; // Function triggered when the button is pressed
	text: string; // Text displayed on the button
	disabled: boolean;
	style?: object;
	leftIcon?: ImageSourcePropType;
	leftIconStyles?: object;
	textStyles?: object;
	type?: string;
}

export interface buttonInterface {
	type?: string;
}

export const defaultOptions = {
	type: 'large',
};
