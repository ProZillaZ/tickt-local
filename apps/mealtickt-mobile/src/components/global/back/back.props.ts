import { ImageSourcePropType } from "react-native";

export interface BackButtonProps {
	onPress?: () => void;
	style?: object;
	icon?: ImageSourcePropType;
	iconStyles?: object;
}

export const defaultProps = {
	icon: require("../../../assets/icons/chevron-left.png"),
};
