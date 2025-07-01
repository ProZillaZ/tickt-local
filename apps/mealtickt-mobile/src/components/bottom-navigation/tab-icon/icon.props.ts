import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { ImageSourcePropType } from 'react-native';

export interface TabIconProps {
	focused: boolean | undefined;
	name: string;
	icon: ImageSourcePropType;
	id: number;
}
