import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { showSuccess } from 'utils/toast-config';
import { RootStackParamList } from 'app/navigation/navigation.props';
import { useEffect, useState } from 'react';
import { useAuth } from 'app/contexts/auth/auth';

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
        // updateState(field,value);
        params.onUpdate('days', value as string[]);
    };

    const handleBack = () => goBack();

    const handleConfirm = () => {
        showSuccess({
            text: 'changes saved successfully!',
            buttonText: 'undo',
            onActionPress: () => console.log('action undo >>>'),
        });
        handleBack();
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
