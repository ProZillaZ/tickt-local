import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Text, Animated } from 'react-native';
import { styles } from './slide3.styles';

import Content from 'components/onboarding/content/content.index';
import SelectCategory from 'components/onboarding/category/category.index';
import SingleRadioButton from 'components/global/single-radio-button/single-radio-button.index.tsx';
import DaySelection from 'components/onboarding/day-selection/selection.index';
import { slide3SingleOption } from 'app/constants/constants.ts';
import { useSlide3 } from './use-slide3.ts';
import Button from 'components/global/button/button.index';
import { SlideComponentProps } from 'screens/onboarding/onboarding.props';
import { useActiveAnimation } from '../useActiveAnimation.ts';

const Slide3: React.FC<SlideComponentProps> = ({
    handleNext,
    updateStepData,
    onboardingState,
    isActive,
}) => {
    const {
        state,
        setState,
        allergies,
        allergyLabel,
        handleState,
        errors,
        shouldShowError,
        handleSubmitAttempt,
    } = useSlide3();

    const { animateValue, translateX } = useActiveAnimation(isActive);

    // Load saved state from onboardingState if it exists
    useEffect(() => {
        if (onboardingState) {
            // Update state with saved values from onboardingState
            let hasUpdates = false;
            const newState = { ...state };

            // Process allergies array
            if (onboardingState.allergies && Array.isArray(onboardingState.allergies)) {
                newState.allergies = onboardingState.allergies.map((a) => a.toString());
                hasUpdates = true;
            }

            // Process ingredient measurement
            if (onboardingState.ingredientMeasurement !== undefined) {
                newState.ingredientMeasurement = onboardingState.ingredientMeasurement.toString();
                hasUpdates = true;
            }

            // Process free days array
            if (onboardingState.freeDays && Array.isArray(onboardingState.freeDays)) {
                newState.freeDays = onboardingState.freeDays.map((d) => d.toString());
                hasUpdates = true;
            }

            // Only update state if we have saved values
            if (hasUpdates) {
                setState(newState);
            }
        }
    }, [onboardingState]);

    // Memoize the handler to prevent recreation on each render
    const handleFreeDaysChange = useCallback(
        (data: string[]) => {
            handleState('freeDays', data);
        },
        [handleState],
    );

    // Wrapper for handleNext that checks form validity first and saves state
    const onNextPress = async () => {
        if (handleSubmitAttempt()) {
            // Save form data to onboarding state
            if (updateStepData) {
                try {
                    await updateStepData({
                        allergies: state.allergies,
                        ingredientMeasurement: state.ingredientMeasurement,
                        freeDays: state.freeDays,
                    });
                    handleNext();
                } catch (error) {
                    console.error('Failed to save slide3 data:', error);
                }
            } else {
                handleNext();
            }
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: animateValue, transform: [{ translateX: translateX }] },
            ]}>
            <ScrollView>
                <Content
                    headerText="almost there..."
                    description="your personalized diet plan in no time. takes less than 1 minute to start!"
                />

                <View style={styles.inputContainer}>
                    <SelectCategory
                        label={allergyLabel}
                        data={allergies}
                        defaultValue={state.allergies}
                        onChange={(data) => {
                            handleState('allergies', data);
                        }}
                    />
                    {shouldShowError('allergies') && (
                        <Text style={styles.errorText}>{errors.allergies}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <SingleRadioButton
                        data={slide3SingleOption}
                        onChange={(e: string) => handleState('ingredientMeasurement', e)}
                    />
                    {shouldShowError('ingredientMeasurement') && (
                        <Text style={styles.errorText}>{errors.ingredientMeasurement}</Text>
                    )}
                </View>

                <View style={styles.inputContainer}>
                    <DaySelection onChange={handleFreeDaysChange} defaultValue={state.freeDays} />
                    {shouldShowError('freeDays') && (
                        <Text style={styles.errorText}>{errors.freeDays}</Text>
                    )}
                </View>

                <Button onClick={onNextPress} text="next" disabled={false} style={styles.btn} />
            </ScrollView>
        </Animated.View>
    );
};

export default Slide3;
