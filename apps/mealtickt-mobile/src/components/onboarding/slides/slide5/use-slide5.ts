import { useState, useEffect } from 'react';
import { FormField, OnboardingState, TouchedFields, ValidationErrors } from './slide5.props';
import { validateField, validateForm, isFormValid as checkFormValidity } from './validation';
import { step5Options } from 'app/constants/constants.ts';
import { TargetWeightService } from '@tickt-engineering/diet-gen-lib';
// import { Gender, ActivityLevel, UnitSystem } from '@tickt-engineering/diet-gen-lib';
import { Gender } from 'app/enums/gender.enum';
import { ActivityLevel } from 'app/enums/activity-level.enum';
import { UnitSystem } from 'app/enums/unit-system.enum';
import { useOnboarding } from 'app/contexts/onboarding/onboarding-context';
const initialState: OnboardingState = {
    targetWeight: '',
    goal: 'lose weight',
    pace: 'steady - 0.5kg/week',
};

// Constants
const MIN_ADJUSTMENT = -2;
const MAX_ADJUSTMENT = 2;

// Custom hook for managing the onboarding logic
export const useSlide5 = (onboardingState?: any, updateStepData?: (data: any) => Promise<void>) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [state, setState] = useState<OnboardingState>(initialState);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [touched, setTouched] = useState<TouchedFields>({});
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const { lastSlideRef } = useOnboarding();
    const [attemptedSubmit, setAttemptedSubmit] = useState(false);

    // Weight adjustment state
    const [baseWeight, setBaseWeight] = useState<number>(0);
    const [adjustment, setAdjustment] = useState<number>(0);
    const [weightUnit, setWeightUnit] = useState<string>('kg');

    // Load saved state from onboardingState if it exists
    useEffect(() => {
        if (onboardingState) {
            // Update state with saved values from onboardingState
            let hasUpdates = false;
            const newState = { ...state };

            // Check for each field in our state if it exists in onboardingState
            for (const key in state) {
                if (onboardingState[key] !== undefined) {
                    newState[key as FormField] = onboardingState[key].toString();
                    hasUpdates = true;
                }
            }

            // Only update state if we have saved values
            if (hasUpdates) {
                setState(newState);
            }

            // Calculate target weight using the service
            if (
                onboardingState.weight &&
                onboardingState.height &&
                onboardingState.gender &&
                onboardingState.age
            ) {
                const targetWeightService = new TargetWeightService();

                // Use data from previous steps
                const weight = Number(onboardingState.weight);
                const height = Number(onboardingState.height);
                const gender = onboardingState.gender === 'male' ? Gender.MALE : Gender.FEMALE;
                const age = Number(onboardingState.age);
                const activityLevel = mapActivityLevel(onboardingState.activityLevel);

                // Use metric system by default (can be adjusted based on app requirements)
                const unitSystem = UnitSystem.METRIC;

                // Get recommended target weight
                const recommended = targetWeightService.recommendTargetWeight(
                    weight,
                    height,
                    gender,
                    age,
                    unitSystem,
                    activityLevel,
                );

                // Set as base weight
                setBaseWeight(recommended);
                setWeightUnit(unitSystem === UnitSystem.METRIC ? 'kg' : 'lbs');

                // Set as target weight if not already set
                if (!newState.targetWeight) {
                    newState.targetWeight = String(100);
                    setState(newState);
                }
            } else {
                // Fallback if we don't have complete data
                const weightOption = step5Options.find((option) => option.key === 'weight');
                if (weightOption && weightOption.options.length > 0) {
                    const weightValue = Number(weightOption.options[0].value);
                    setBaseWeight(weightValue);
                    const unit = weightOption?.options[0]?.label?.includes('kg') ? 'kg' : 'lbs';
                    setWeightUnit(unit);

                    if (!state.targetWeight) {
                        onChange('targetWeight', String(weightValue));
                    }
                }
            }
        }
    }, [onboardingState]);
    // Helper function to map app activity levels to service enum
    const mapActivityLevel = (activityLevel?: string): ActivityLevel => {
        switch (activityLevel?.toLowerCase()) {
            case 'sedentary':
                return ActivityLevel.SEDENTARY;
            case 'light':
                return ActivityLevel.LIGHTLY_ACTIVE;
            case 'moderate':
                return ActivityLevel.MODERATELY_ACTIVE;
            case 'very active':
                return ActivityLevel.VERY_ACTIVE;
            default:
                return ActivityLevel.LIGHTLY_ACTIVE;
        }
    };

    // Handle saved target weight
    useEffect(() => {
        if (state.targetWeight && baseWeight > 0) {
            const targetWeight = Number(state.targetWeight);
            const newAdjustment = targetWeight - baseWeight;
            if (newAdjustment >= MIN_ADJUSTMENT && newAdjustment <= MAX_ADJUSTMENT) {
                setAdjustment(newAdjustment);
            }
        }
    }, [state.targetWeight, baseWeight]);

    const onChange = async (field: FormField, value: string) => {
        const updatedState = { ...state, [field]: value };
        setState(updatedState);
        console;
        lastSlideRef.current = {
            targetWeight: updatedState.targetWeight,
            goal: updatedState.goal,
            pace: updatedState.pace,
        };

        // Mark field as touched
        if (!touched[field]) {
            setTouched({ ...touched, [field]: true });
        }

        // Validate the field
        const fieldError = validateField(field, value);
        setErrors((prev) => ({ ...prev, [field]: fieldError }));

        // Check overall form validity
        setIsFormValid(checkFormValidity(updatedState));
    };

    const shouldShowError = (field: FormField): boolean => {
        return (
            Boolean(touched[field] && errors[field]) || (attemptedSubmit && Boolean(errors[field]))
        );
    };

    const handleSubmitAttempt = () => {
        setAttemptedSubmit(true);
        return isFormValid;
    };

    // Weight adjustment functions
    const adjustWeight = (direction: 'increase' | 'decrease') => {
        let newAdjustment = adjustment;

        if (direction === 'increase' && adjustment < MAX_ADJUSTMENT) {
            newAdjustment = adjustment + 1;
        } else if (direction === 'decrease' && adjustment > MIN_ADJUSTMENT) {
            newAdjustment = adjustment - 1;
        }

        setAdjustment(newAdjustment);
        onChange('targetWeight', String(baseWeight + newAdjustment));
    };

    const getAdjustedWeight = () => {
        const adjustedWeight = baseWeight + adjustment;
        return `${adjustedWeight} ${weightUnit}`;
    };

    // Save data and navigate to next step
    const handleNext = async (nextFn: () => void) => {
        if (updateStepData) {
            await updateStepData({
                targetWeight: Number(state.targetWeight),
                goal: state.goal,
                pace: state.pace,
            });
        }

        nextFn();
        if (handleSubmitAttempt()) {
            // Save form data to onboarding state
            if (updateStepData) {
                try {
                    // Convert string values to numbers where needed
                    await updateStepData({
                        targetWeight: Number(state.targetWeight),
                        goal: state.goal,
                        pace: state.pace,
                    });
                    nextFn();
                } catch (error) {
                    console.error('Failed to save slide5 data:', error);
                }
            } else {
                nextFn();
            }
        }
    };

    return {
        state,
        setState,
        onChange,
        errors,
        isFormValid,
        shouldShowError,
        handleSubmitAttempt,
        visible,
        setVisible,
        handleNext,
        // Weight adjustment
        baseWeight,
        adjustment,
        adjustWeight,
        getAdjustedWeight,
        weightUnit,
        MIN_ADJUSTMENT,
        MAX_ADJUSTMENT,
    };
};
