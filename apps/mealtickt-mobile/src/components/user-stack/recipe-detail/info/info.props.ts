import { ImageSourcePropType } from 'react-native';

export interface RecipeInfoProps {
	info: { [key: string]: any };
}

export interface MealCardProps {
	iconType: string;
	text: string;
	showDot?: boolean;
}
