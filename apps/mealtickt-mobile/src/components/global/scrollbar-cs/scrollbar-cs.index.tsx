import { View, Text, Keyboard, TouchableWithoutFeedback, ScrollView, Animated } from 'react-native';
import React from 'react';
import { ScrollBarCSProps } from './scrollbar-cs.props.ts';
import { styles } from './scrollbar-cs.styles.ts';
import { useScrollBarCS } from './use-scrollbar-cs.ts';

const ScrollBarCS: React.FC<ScrollBarCSProps> = ({ refrence, data, renderItem, ListFooterComponent, onScroll }) => {
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
	} = useScrollBarCS({ onScroll, refrence });

	return (
		<View style={styles.container}>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<ScrollView
					ref={refre}
					onScroll={handleScroll}
					showsVerticalScrollIndicator={false}
					scrollEventThrottle={16}
					nestedScrollEnabled={true}
					onContentSizeChange={(width, height) => setWholeHeight(height)}
					onLayout={({ nativeEvent: { layout: { height } } }) => setVisibleHeight(height)}
				>
					{data?.map((item: { [key: string]: any }, index: number) => renderItem(item, index))}
					{ListFooterComponent && ListFooterComponent}
				</ScrollView>
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

export default ScrollBarCS;
