import { ImageSourcePropType } from 'react-native';

export interface Slide {
	id: number;
	image: ImageSourcePropType;
	title: string;
	type: string;
	time: string;
}

export interface ShowCaseProps {
	swapedRecipe: number;
	isSkipDay?: boolean;
	isRepeatRecipe?: boolean;
	isRepeatDay?: boolean;
	isLoggedMeal?: boolean | string;
	onOptionsPress: (type: boolean) => void;
	onMealSwapPress: () => void;
}
