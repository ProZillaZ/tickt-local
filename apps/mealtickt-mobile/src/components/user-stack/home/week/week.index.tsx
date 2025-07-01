import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useWeek } from "./use-week.ts";
import { WeekSliderProps } from "./week.props";
import {
	heightPercentageToDP as hp,
	widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { styles } from "./week.styles";
import { configureReanimatedLogger } from "react-native-reanimated";

// Define the data type for each slide
configureReanimatedLogger({
	strict: false,
});

const WeekSlider = ({ defaultWeek, onChangeWeek }: WeekSliderProps) => {
	const {
		carouselRef,
		weeks,
		activeIndex,
		handleNext,
		handleBack,
		onChangeIndex,
	} = useWeek({
		defaultWeek,
		onChangeWeek,
	});

	const renderItem = ({ item }: { item: string }) => (
		<View style={styles.slide}>
			<Text style={styles.title}>
				week {activeIndex + 1}/{weeks.length}
			</Text>
			<Text style={styles.range}>{item}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Carousel
				ref={carouselRef}
				width={wp("100%")}
				height={hp("5%")}
				data={weeks}
				onSnapToItem={(index: number) => onChangeIndex(index)}
				renderItem={renderItem}
				loop={false}
				enabled={false}
				defaultIndex={activeIndex}
			/>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					onPress={handleBack}
					disabled={activeIndex === 0}
				>
					<Image
						style={[
							styles.chevron,
							activeIndex === 0 && styles.disabledChevron,
						]}
						source={require("../../../../assets/icons/chevron-left.png")}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={handleNext}
					disabled={activeIndex === weeks.length - 1}
				>
					<Image
						style={[
							styles.chevron,
							activeIndex === weeks.length - 1 &&
								styles.disabledChevron,
						]}
						source={require("../../../../assets/icons/chevron-right.png")}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default WeekSlider;
