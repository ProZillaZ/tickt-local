import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardType } from 'react-native';
import { styles } from './slide1.styles';
import { useSlide1 } from './use-slide1.ts';
import { FormField } from './slide1.props';
import { slide1SingleOption, step1Options } from 'app/constants/constants.ts';
import { ONBOARDING } from 'app/constants/onboarding.constants';
import Dropdown from 'components/global/dropdown/dropdown.index';
import Content from '../../content/content.index';
import Input from 'components/global/input/input.index';
import SingleRadioButton from 'components/global/single-radio-button/single-radio-button.index.tsx';
import Button from 'components/global/button/button.index';
import { SlideComponentProps } from 'screens/onboarding/onboarding.props';

// Use the constant from the centralized file
const { NUMERIC_FIELDS } = ONBOARDING.VALIDATION;

const Slide1: React.FC<SlideComponentProps> = ({ handleNext, updateStepData, onboardingState }) => {
    const { state, setState, onChange, errors, isFormValid, shouldShowError, handleSubmitAttempt } =
        useSlide1();

    // Create refs for input fields
    const inputRefs = useRef<(TextInput | null)[]>([]);

    // Count how many input fields we have
    const inputFields = step1Options.filter((option) => option.type === 'input');

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

    // Handle numeric input validation - only allows numbers to be entered
    const handleNumericInput = (field: FormField, value: string) => {
        // Strip out any non-numeric characters
        const numericValue = value.replace(/[^0-9]/g, '');
        onChange(field, numericValue);
    };

    // Wrapper for handleNext that checks form validity first and saves state
    const onNextPress = async () => {
        if (handleSubmitAttempt()) {
            // Save form data to onboarding state
            if (updateStepData) {
                try {
                    // Convert string values to numbers where needed
                    const dataToSave = {
                        ...state,
                        age: state.age ? Number(state.age) : undefined,
                        height: state.height ? Number(state.height) : undefined,
                        weight: state.weight ? Number(state.weight) : undefined,
                    };

                    await updateStepData(dataToSave);
                    handleNext();
                } catch (error) {
                    console.error('Failed to save slide1 data:', error);
                }
            } else {
                handleNext();
            }
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>
                <Content
                    headerText="create your account"
                    description="your personalized diet plan in no time. takes less than 1 minute to start!"
                />
                <View style={styles.lowerContainer}>
                    <SingleRadioButton
                        data={slide1SingleOption}
                        onChange={(e: any) => onChange('measurementSystem', e)}
                    />
                    {shouldShowError('measurementSystem') && (
                        <Text style={styles.errorText}>{errors.measurementSystem}</Text>
                    )}
                    <View>
                        {step1Options.map((option, key) => {
                            // Get index only for input fields
                            const inputIndex = inputFields.findIndex(
                                (field) => field.key === option.key,
                            );

                            // Determine if this is a numeric field
                            const isNumericField = NUMERIC_FIELDS.includes(option.key);

                            // Set keyboard type based on field type
                            const keyboardType: KeyboardType = isNumericField
                                ? 'numeric'
                                : 'default';

                            return option.type === 'input' ? (
                                <View key={key} style={styles.inputContainer}>
                                    <Input
                                        mode="primary"
                                        value={state[option.key as FormField]}
                                        label={option.label}
                                        placeholder={option.placeholder}
                                        onClear={() => {
                                            onChange(option.key as FormField, '');
                                        }}
                                        onUpdate={(v) => {
                                            // Use numeric validation for height, weight, and age
                                            if (isNumericField) {
                                                handleNumericInput(option.key as FormField, v);
                                            } else {
                                                onChange(option.key as FormField, v);
                                            }
                                        }}
                                        isVerfied={false}
                                        leftIcon={null}
                                        keyboardType={keyboardType}
                                        inputRef={(el) => {
                                            inputRefs.current[inputIndex] = el;
                                        }}
                                        onSubmitEditing={() => {
                                            // Move to next input or submit if this is the last one
                                            const nextInput = inputRefs.current[inputIndex + 1];
                                            if (nextInput) {
                                                nextInput.focus();
                                            } else if (isFormValid) {
                                                // Last input - submit form if valid
                                                onNextPress();
                                            }
                                        }}
                                    />
                                    {shouldShowError(option.key as FormField) && (
                                        <Text style={styles.errorText}>
                                            {errors[option.key as FormField]}
                                        </Text>
                                    )}
                                </View>
                            ) : (
                                <View key={key} style={styles.inputContainer}>
                                    <Dropdown
                                        label={option.placeholder}
                                        data={option.options}
                                        onSelect={(l, v) => onChange(option.key as FormField, v)}
                                    />
                                    {shouldShowError(option.key as FormField) && (
                                        <Text style={styles.errorText}>
                                            {errors[option.key as FormField]}
                                        </Text>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                </View>
                <Button onClick={onNextPress} text={'next'} disabled={false} style={styles.btn} />
            </ScrollView>
        </View>
    );
};

export default Slide1;
