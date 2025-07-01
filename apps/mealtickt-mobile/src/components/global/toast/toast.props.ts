import { ImageSourcePropType } from "react-native";

export interface ToastProps {
	style?: object;
	icon?: ImageSourcePropType | undefined;
	iconStyles?: object;
	text: string;
	textStyles?: object;
	buttonText?: string;
	actionButonTextStyle?: object;
	actionButtonStyles?: object;
	onActionPress?: () => void;
	wrapTextIconStyles?: object;
}

export const defaultProps = {
	icon: require("../../../assets/icons/CheckCircle.png"),
};
