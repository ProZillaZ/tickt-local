import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

import { styles } from './slide2.styles';
import { useSlide2 } from './use-slide2.ts';
import { FormField } from './slide2.props';

import { step2Options } from 'app/constants/constants.ts';
import Dropdown from 'components/global/dropdown/dropdown.index';
import Content from '../../content/content.index';
import Button from 'components/global/button/button.index';
import { SlideComponentProps } from 'screens/onboarding/onboarding.props';
import { useActiveAnimation } from '../useActiveAnimation.ts';
import { ActivityLevel, MealCount } from '@tickt-ltd/types';

const Slide2: React.FC<SlideComponentProps> = ({
    handleNext,
    updateStepData,
    onboardingState,
    isActive,
}) => {
    const { state, setState, onChange, errors, shouldShowError, handleSubmitAttempt } = useSlide2();

    const { animateValue, translateX } = useActiveAnimation(isActive);

    // Load saved state from onboardingState if it exists
    useEffect(() => {
        if (onboardingState) {
            // Update state with saved values from onboardingState
            const newState = { ...state };
            let hasUpdates = false;

            // Check for each field in our state if it exists in onboardingState
            for (const key in state) {
                if (onboardingState[key as keyof typeof onboardingState] !== undefined) {
                    newState[key as FormField] =
                        onboardingState[key as keyof typeof onboardingState]?.toString() || '';
                    hasUpdates = true;
                }
            }

            // Only update state if we have saved values
            if (hasUpdates) {
                setState(newState);
            }
        }
    }, [onboardingState]);

    // Wrapper for handleNext that checks form validity first and saves state
    const onNextPress = async () => {
        if (handleSubmitAttempt()) {
            // Save form data to onboarding state
            if (updateStepData) {
                try {
                    // Convert values to appropriate types if needed
                    const dataToSave = {
                        ...state,
                        mealCount: Number(state.mealCount) as MealCount,
                        dietaryPreferences: state.dietaryPreferences,
                        activityLevel: state.activityLevel as ActivityLevel,
                    };

                    updateStepData(dataToSave);
                    handleNext();
                } catch (error) {
                    console.error('Failed to save slide2 data:', error);
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
            <Content
                headerText="build around your habits"
                description="your personalized diet plan in no time. takes less than 1 minute to start!"
            />
            <View style={styles.lowerContainer}>
                {step2Options.map((option, key) => (
                    <View key={key} style={styles.inputContainer}>
                        <Dropdown
                            label={option.placeholder}
                            data={option.options}
                            onSelect={(l, v) => onChange(option.key as FormField, v)}
                        />
                        {shouldShowError(option.key as FormField) && (
                            <Text style={styles.errorText}>{errors[option.key as FormField]}</Text>
                        )}
                    </View>
                ))}
            </View>

            <Button onClick={onNextPress} text={'next'} disabled={false} style={styles.btn} />
        </Animated.View>
    );
};

export default Slide2;
