import { commonStyles } from 'utils/styles';
import { useEffect, useRef, useState } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { UseSrollBarProps } from './scrollbar.props';

const screenHeight = commonStyles.h100.height;

export const useScrollBar = ({ refrence, onScroll }: UseSrollBarProps) => {
	const refre = useRef<any>();
	const [indicator] = useState(new Animated.Value(0));
	const [wholeHeight, setWholeHeight] = useState(1);
	const [visibleHeight, setVisibleHeight] = useState(screenHeight);
	const indicatorSize = wholeHeight > visibleHeight ? (visibleHeight * visibleHeight) / wholeHeight : visibleHeight;
	const difference = visibleHeight > indicatorSize ? visibleHeight - indicatorSize : 1;

	// Attach the ref to the FlatList
	useEffect(() => {
		if (refre && refrence) {
			refrence.current = refre.current;
		}
	}, [refre, refrence]);

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		onScroll && onScroll(event);
		Animated.event(
			[{ nativeEvent: { contentOffset: { y: indicator } } }],
			{ useNativeDriver: false },
		)(event);
	};

	return {
		indicatorSize,
		difference,
		indicator,
		wholeHeight,
		visibleHeight,
		refre,
		handleScroll,
		setWholeHeight,
		setVisibleHeight,
	};
};
