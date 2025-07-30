import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { showSuccess } from 'utils/toast-config';
import { RootStackParamList } from 'app/navigation/navigation.props';
import { useEffect, useState } from 'react';
import { useAuth } from 'app/contexts/auth/auth';
import {
    ActivityLevel,
    DietGoal,
    DietType,
    Gender,
    GoalPace,
    IngredientMeasurement,
    MealCount,
    WeekMealPlan,
} from '@tickt-ltd/types';
import { useAxios } from 'app/hooks/useAxios';

const initialState = {
    goalWeight: '60',
    pace: '',
    goal: '',
    frequency: '3',
    dietaryPreferences: 'omnivore',
    active: 'lightly (1-2x/ week)',
    ingredient: 'servings',
    days: [],
};

export const useDietPlan = () => {
    const { goBack } = useNavigation();
    const route = useRoute<RouteProp<RootStackParamList, 'diet'>>();
    const { params } = route;
    const { user } = useAuth();
    const { axiosInstance, successAndInvalidate } = useAxios();
    const [state, setState] = useState({
        goalWeight: user?.targetWeight || initialState.goalWeight,
        pace: user?.pace || initialState.pace,
        goal: user?.goal || initialState.pace,
        frequency: user?.mealCount || initialState.frequency,
        dietaryPreferences: user?.dietaryPreferences || initialState.dietaryPreferences,
        active: user?.activityLevel || initialState.active,
        ingredient: user?.ingredientMeasurement || initialState.ingredient,
        days: user?.freeDays || initialState.days,
    });

    const updateState = (field: string, value: string | number | string[]) =>
        setState((s) => ({ ...s, [field]: value }));

    const handleUpdateDays = (field: string, value: string | number | string[]) => {
        updateState(field, value);
        params.onUpdate('days', value as string[]);
    };

    const handleBack = () => goBack();

    const handleConfirm = async () => {
        showSuccess({
            text: 'changes saved successfully!',
            buttonText: 'undo',
            onActionPress: () => console.log('action undo >>>'),
        });
        await generateMealPlans();
        handleBack();
    };
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
    const generateMealPlans = async (): Promise<WeekMealPlan[]> => {
        const userProfile = {
            id: user?.uid || 'temp-user-id',
            email: user?.email || 'temp@example.com',
            age: Number(user?.age) || 25,
            gender: user?.gender === 'male' ? Gender.MALE : Gender.FEMALE,
            heightCm: Number(user?.height) || 170,
            weightKg: Number(user?.weight) || 70,
            activityLevel: user?.activityLevel,
            goal: state.goal as DietGoal,
            dietType: state.dietaryPreferences as DietType,
            freeDays: state.days,
            unitSystem: user?.measurementSystem,
            dietFilters: {
                pace: state.pace as GoalPace,
                mealCount: state.frequency as MealCount,
                allergies: user?.allergies,
                foodMeasurement: state.ingredient as IngredientMeasurement,
            },
        };
        const now = new Date();
        const endDate = new Date();
        endDate.setDate(now.getDate() + 6); // 7 days including start
        const res = await axiosInstance.post('/meal-plans/generate', {
            userProfile,
            startDate: now.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
            options: {
                includeRecipes: true,
            },
            name: `New Meal Plan for ${user?.uid}`,
            description: 'A meal plan generated based on user preferences and goals.',
        });
        successAndInvalidate(['recipes']);
        return res.data;
    };
    useEffect(() => {
        params && updateState('days', params.skipDays);
    }, [params]);

    return {
        state,
        handleBack,
        updateState,
        handleUpdateDays,
        handleConfirm,
    };
};
