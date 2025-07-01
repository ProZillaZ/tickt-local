import { showcaseContent } from 'app/constants/constants';
import { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation/navigation.props';
import { showSuccess } from 'utils/toast-config';
import { ShowCaseProps } from './showcase.props';

export const useShowcase = () => {
	const carouselRef = useRef<any>(null);
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const { navigate } = useNavigation<NavigationProp<'auth'>>();
	const progressPercentage = ((activeIndex + 1) / showcaseContent.length) * 100;

	const onChangeIndex = (id: number) => {
		setActiveIndex(id);
	};

	const onRecipePress = () => navigate('recipe-detail');

	return {
		showcaseContent,
		carouselRef,
		activeIndex,
		progressPercentage,
		onChangeIndex,
		onRecipePress,
	};
};
