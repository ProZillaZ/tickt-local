import { ImageSourcePropType } from 'react-native';

export interface HeaderProps {
	onCrossPress: () => void; // Function triggered when the close button is pressed
	visible?: boolean; // Determines whether the header is visible
	currentIndex?: number; // Tracks the current index for conditional rendering
	logo?: ImageSourcePropType;
	crossIcon?: ImageSourcePropType;
}

export const defaultHeaderProps: Partial<HeaderProps> = {
	visible: true,
	currentIndex: 0,
	logo: require('../../../assets/images/mealtickt-lightcream-web.png'),
	crossIcon: require('../../../assets/images/close.png'),
};
