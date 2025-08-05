import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useWeek } from './use-week.ts';
import { WeekSliderProps } from './week.props';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { styles } from './week.styles';
import { configureReanimatedLogger } from 'react-native-reanimated';
import { getMonthWeeks } from 'utils/helpers';
import { WeekMealPlan } from '@tickt-ltd/types';

// Define the data type for each slide
configureReanimatedLogger({
    strict: false,
});

// Function to generate date ranges starting from recipes[0].startDate
const generateDateRanges = (weeksCount: number, recipes?: WeekMealPlan[]) => {
    let startDate: Date;

    if (recipes && recipes.length > 0 && recipes[0].startDate) {
        // Use the startDate from the first recipe
        startDate = new Date(recipes[0].startDate);
    } else {
        // Fallback to current date if no recipes or startDate
        startDate = new Date();
    }

    const dateRanges = [];

    for (let i = 0; i < weeksCount; i++) {
        const weekStart = new Date(startDate);
        weekStart.setDate(startDate.getDate() + i * 7);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        const startMonth = weekStart.toLocaleString('en-US', { month: 'short' }).toLowerCase();
        const endMonth = weekEnd.toLocaleString('en-US', { month: 'short' }).toLowerCase();

        const startDay = weekStart.getDate();
        const endDay = weekEnd.getDate();

        const startSuffix = ['th', 'st', 'nd', 'rd'][((startDay % 100) - 20) % 10] || 'th';
        const endSuffix = ['th', 'st', 'nd', 'rd'][((endDay % 100) - 20) % 10] || 'th';

        let rangeText;
        if (startMonth === endMonth) {
            rangeText = `${startMonth} ${startDay}${startSuffix} - ${endDay}${endSuffix}`;
        } else {
            rangeText = `${startMonth} ${startDay}${startSuffix} - ${endMonth} ${endDay}${endSuffix}`;
        }

        dateRanges.push(rangeText);
    }

    return dateRanges;
};

const WeekSlider = ({
    defaultWeek,
    onChangeWeek,
    weeks,
    recipes,
    generateMealPlans,
}: WeekSliderProps) => {
    const { carouselRef, activeIndex, handleNext, handleBack, onChangeIndex, onProgressChange } =
        useWeek({
            defaultWeek,
            onChangeWeek,
            weeks,
            recipes,
            generateMealPlans,
        });

    const dateRanges = generateDateRanges(weeks, recipes);

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.slide}>
            <Text style={styles.title}>
                week {activeIndex + 1}/{weeks}
            </Text>
            <Text style={styles.range}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                width={wp('100%')}
                height={hp('5%')}
                data={dateRanges}
                onSnapToItem={(index: number) => onChangeIndex(index)}
                onProgressChange={onProgressChange}
                renderItem={renderItem}
                loop={false}
                enabled={false}
                defaultIndex={activeIndex}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleBack} disabled={activeIndex === 0}>
                    <Image
                        style={[styles.chevron, activeIndex === 0 && styles.disabledChevron]}
                        source={require('../../../../assets/icons/chevron-left.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNext} disabled={activeIndex === weeks - 1}>
                    <Image
                        style={[
                            styles.chevron,
                            activeIndex === weeks - 1 && styles.disabledChevron,
                        ]}
                        source={require('../../../../assets/icons/chevron-right.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WeekSlider;
