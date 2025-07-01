import { View, Text, Keyboard, TouchableWithoutFeedback, FlatList, Animated } from 'react-native';
import React from 'react';
import { useScrollBar } from './use-scrollbar.ts';
import { styles } from './scrollbar.styles';
import { ScrollBarProps } from './scrollbar.props';

const ScrollBar: React.FC<ScrollBarProps> = ({
	refrence,
	data,
	renderItem,
	keyExtractor,
	ListFooterComponent,
	onScroll,
	style,
}) => {
	const {
		difference,
		handleScroll,
		indicator,
		indicatorSize,
		setVisibleHeight,
		setWholeHeight,
		visibleHeight,
		wholeHeight,
		refre,
	} = useScrollBar({ onScroll, refrence });

	return (
		<View style={[styles.container, style]}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<FlatList
					ref={refre}
					data={data}
					renderItem={renderItem}
					onScroll={handleScroll}
					showsVerticalScrollIndicator={false}
					keyExtractor={keyExtractor}
					onContentSizeChange={(width, height) => {
						setWholeHeight(height);
					}}
					onLayout={({ nativeEvent: { layout: { height } } }) => {
						setVisibleHeight(height);
					}}
					scrollEventThrottle={16}
					ListFooterComponent={ListFooterComponent}
					nestedScrollEnabled={true}
				/>
			</TouchableWithoutFeedback>
			{wholeHeight > visibleHeight && (
				<Animated.View
					style={[
						styles.indicator,
						{
							height: indicatorSize,
							transform: [{
								translateY: Animated.multiply(indicator, visibleHeight / wholeHeight).interpolate({
									inputRange: [0, difference],
									outputRange: [0, difference],
									extrapolate: 'clamp',
								}),
							}],
						},
					]}
				/>
			)}
		</View>
	);
};

export default ScrollBar;
