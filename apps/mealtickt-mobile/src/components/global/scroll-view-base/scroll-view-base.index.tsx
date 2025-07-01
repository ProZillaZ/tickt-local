import {
	View,
	Text, ScrollView,
} from 'react-native';
import React from 'react';
import { defaultProps, ScrollViewBaseProps } from './scroll-view-base.props';
import { useScrollBase } from './use-scroll-view-base.ts';

const ScrollViewBase = ({
	children,
	contentContainerStyle: contentStyle,
	showsHorizontalScrollIndicator: horizontal = defaultProps.showsHorizontalScrollIndicator,
	showsVerticalScrollIndicator: vertical = defaultProps.showsVerticalScrollIndicator,
	scrollEnabled,
}: ScrollViewBaseProps) => {
	const { isKeyboardOpen } = useScrollBase();

	return (
		<ScrollView scrollEnabled={scrollEnabled || isKeyboardOpen} showsVerticalScrollIndicator={vertical}
					showsHorizontalScrollIndicator={horizontal} contentContainerStyle={contentStyle}
					nestedScrollEnabled={true}>
			{children}
		</ScrollView>
	);
};

export default ScrollViewBase;
