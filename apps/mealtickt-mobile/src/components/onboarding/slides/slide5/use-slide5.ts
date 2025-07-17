import { useState, useEffect } from 'react';
import { FormField, OnboardingState, TouchedFields, ValidationErrors } from './slide5.props';
import { validateField, validateForm, isFormValid as checkFormValidity } from './validation';
import { step5Options } from 'app/constants/constants.ts';
import { MealPlanBuilder, TargetWeightService } from '@tickt-ltd/diet-gen-lib';
import { createWeekRecipes } from '@tickt-ltd/diet-gen-lib/tests/__mocks__/mock-recipes';
import { useOnboarding } from 'app/contexts/onboarding/onboarding-context';
import {
    DietGoal,
    GoalPace,
    ActivityLevel,
    Gender,
    UnitSystem,
    MealType,
    Recipe,
    UserProfile,
    Cuisine,
    RecipeFilter,
} from '@tickt-ltd/types';
import { useAuth } from 'app/contexts/auth/auth';

import { PaginatedResult, ServiceFactory } from '@tickt-ltd/services';
const initialState: OnboardingState = {
    targetWeight: '',
    goal: DietGoal.WEIGHT_LOSS,
    pace: GoalPace.MODERATE,
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
    const { user } = useAuth();

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
                const unitSystem =
                    onboardingState.measurementSystem === 'cmKg'
                        ? UnitSystem.METRIC
                        : UnitSystem.IMPERIAL;

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
                    newState.targetWeight = String(recommended);
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
        return {
            adjustedWeight,
            weightUnit,
        };
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
    const estimateTime = () => {
        const targetWeightService = new TargetWeightService();
        const weeks = targetWeightService.calculateTimeToReachGoal(
            onboardingState?.weight,
            Number(state.targetWeight),
            state.pace as GoalPace,
            onboardingState?.measurementSystem === 'cmKg' ? UnitSystem.METRIC : UnitSystem.IMPERIAL,
        );
        return weeks;
    };

    type WeekMeals = {
        [day: string]: {
            [meal in MealType]?: Recipe;
        };
    };
    async function getAllRecipesFromMealPlanBuilder() {
        if (user?.email && user.uid) {
            const mealPlanBuilder = new MealPlanBuilder({
                activityLevel: onboardingState.activityLevel,
                dietType: onboardingState.dietaryPreferences,
                gender: onboardingState.gender,
                age: onboardingState.age,
                weightKg: onboardingState.weight,
                heightCm: onboardingState.height,
                goal: onboardingState.goal,
                unitSystem:
                    onboardingState?.measurementSystem === 'cmKg'
                        ? UnitSystem.METRIC
                        : UnitSystem.IMPERIAL,
                email: user.email,
                id: user.uid,
                dietFilters: {
                    allergies: onboardingState.allergies,
                    mealCount: onboardingState.mealCount,
                    pace: onboardingState.pace,
                },
                createdAt: new Date('2023-01-01'),
                updatedAt: new Date('2023-01-01'),
            }).build(); // need to pass recieps
            return mealPlanBuilder;
        }
    }

    async function getAllRecipesFromFireStore(): Promise<WeekMeals> {
        const { freeDays, mealCount, allergies, dietaryPreferences } = onboardingState;

        //This line could not be run due to using firebase-admin in shared service. React native can not use Node.js modules.
        const recipeService = ServiceFactory.getInstance().getRecipeService();

        // Determine the meal types based on mealCount
        const getMealTypes = (count: number): MealType[] => {
            switch (count) {
                case 1:
                    return [MealType.LUNCH];
                case 2:
                    return [MealType.LUNCH, MealType.DINNER];
                case 3:
                    return [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER];
                case 4:
                default:
                    return [MealType.BREAKFAST, MealType.LUNCH, MealType.SNACK, MealType.DINNER];
            }
        };

        const meals: MealType[] = getMealTypes(Number(mealCount));
        const weekMeals: WeekMeals = {};

        for (const day of freeDays) {
            weekMeals[day] = {};

            for (const meal of meals) {
                try {
                    const filter: RecipeFilter = {
                        mealTypes: [meal],
                        allergens: allergies,
                        dietTypes: dietaryPreferences,
                    };

                    const result: PaginatedResult<Recipe> = await recipeService.search(filter, {
                        limit: 1,
                    });

                    if (result.items.length > 0) {
                        weekMeals[day][meal] = result.items[0]; // pick the first recipe
                    }
                } catch (error) {
                    console.error(`Error fetching recipe for ${day} - ${meal}:`, error);
                }
            }
        }

        return weekMeals;
    }
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
        estimateTime,
    };
};
