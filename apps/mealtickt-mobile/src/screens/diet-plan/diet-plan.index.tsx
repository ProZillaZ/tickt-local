import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './diet-plan.styles';
import { useDietPlan } from './use-diet-plan.ts';
import {
    ActiveForDiet,
    DietaryPreferences,
    Frequency,
    Goal,
} from 'components/user-stack/diet-plan';
import SingleRadioButton from 'components/global/single-radio-button/single-radio-button.index.tsx';
import { slide3SingleOption } from 'app/constants/constants.ts';
import DaySelection from 'components/onboarding/day-selection/selection.index';
import Button from 'components/global/button/button.index';
import { useUpdateUser } from 'app/hooks/use-update-user.ts';
import {
    ActivityLevel,
    DietGoal,
    DietType,
    GoalPace,
    IngredientMeasurement,
    MealCount,
} from '@tickt-ltd/types';

const DietPlan = () => {
    const { state, updateState, handleBack, handleUpdateDays, handleConfirm } = useDietPlan();
    const { isEqual, updateUser, user } = useUpdateUser();
    const hasEqual1 = isEqual(user?.dietaryPreferences, state.dietaryPreferences);
    const hasEqual2 = isEqual(user?.freeDays, state.days);
    const hasEqual3 = isEqual(user?.activityLevel, state.active);
    const hasEqual4 = isEqual(user?.ingredientMeasurement, state.ingredient);
    const hasEqual5 = isEqual(user?.mealCount, state.frequency);
    const hasEqual6 = isEqual(user?.pace, state.pace);
    const hasEqual7 = isEqual(user?.goal, state.goal);
    const hasEqual8 = isEqual(user?.targetWeight, state.goalWeight);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleBack}>
                <Image
                    style={styles.icon}
                    source={require('../../assets/icons/Cross-inCircle.png')}
                />
            </TouchableOpacity>
            <View style={styles.headingContainer}>
                <View style={styles.profileLogoContainer}>
                    <Image
                        style={styles.profileLogo}
                        source={require('../../assets/icons/filter.png')}
                    />
                </View>
                <Text style={styles.title}>edit diet plan</Text>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollview}>
                <Goal data={state} onUpdate={updateState} />
                <Frequency data={state} onUpdate={updateState} />
                <DietaryPreferences
                    selectedLabel={state.dietaryPreferences}
                    onUpdate={updateState}
                />
                <ActiveForDiet selectedLabel={state.active} onUpdate={updateState} />
                <SingleRadioButton
                    style={styles.radio}
                    data={slide3SingleOption}
                    defaultValue={state.ingredient}
                    onChange={(e: string) => updateState('ingredient', e)}
                />
                <DaySelection
                    style={styles.day}
                    defaultValue={state.days}
                    onChange={(data) => updateState('days', data)}
                />
                <Button
                    style={styles.button}
                    text="save changes"
                    onClick={async () => {
                        await updateUser({
                            dietaryPreferences: state.dietaryPreferences as DietType,
                            freeDays: state.days,
                            activityLevel: state.active as ActivityLevel,
                            ingredientMeasurement: state.ingredient as IngredientMeasurement,
                            mealCount: state.frequency as MealCount,
                            pace: state.pace as GoalPace,
                            goal: state.goal as DietGoal,
                            targetWeight: state.goalWeight,
                        });
                        handleConfirm();
                    }}
                    disabled={
                        hasEqual1 &&
                        hasEqual2 &&
                        hasEqual3 &&
                        hasEqual4 &&
                        hasEqual5 &&
                        hasEqual6 &&
                        hasEqual7 &&
                        hasEqual8
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DietPlan;
