import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { RecipeBottomModalProps } from './recipe-bottom-modal.props';
import { useRepeatRecipe } from './use-recipe-bottom-modal.ts';
import { BottomModal } from 'components/global/bottom-modal/bottom-modal.index';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { styles } from './recipe-bottom-modal.styles';
import { recipeMealLogOptions, recipeOtherOptions } from 'app/constants/constants.ts';
import Button from 'components/global/button/button.index';
import DaySelection from 'components/onboarding/day-selection/selection.index';
import AppLogger from 'app/logger/logger.ts';

const RecipeBottomModal = ({
    isVisible,
    onClose,
    onUpdate,
    currentIndex,
    defaultValue,
    isRepeatDay,
}: RecipeBottomModalProps) => {
    const {
        currentStep,
        handleCurrentStep,
        handleConfirm,
        setRepeatDays,
        handleCancel,
        handleMealLog,
    } = useRepeatRecipe({ onClose, onUpdate, currentIndex, defaultValue });

    return (
        <BottomModal
            modalStyle={styles.modal}
            isVisible={isVisible}
            onClose={handleCancel}
            height={hp(currentStep == 0 ? '35%' : '30%')}>
            <View style={styles.bar} />
            <Text style={[styles.heading]}>
                {currentStep == null
                    ? 'other options'
                    : currentStep == 0
                      ? `repeat  ${isRepeatDay ? 'days ' : 'recipe'}`
                      : 'log meal'}
            </Text>
            {currentStep == null ? (
                <View style={styles.options}>
                    {recipeOtherOptions.map((option, id) => (
                        <Button
                            key={id}
                            type="none"
                            text={option}
                            onClick={() => handleCurrentStep(id)}
                            disabled={false}
                            style={styles.btnContainer}
                            textStyles={styles.btnTextStyles}
                        />
                    ))}
                </View>
            ) : currentStep == 0 ? (
                <View style={styles.repeatRecipeContainer}>
                    <Text
                        style={
                            styles.text
                        }>{`select the days you'd like to repeat this ${isRepeatDay ? 'week' : 'recipe'}`}</Text>
                    <DaySelection
                        defaultValue={defaultValue}
                        showHeader={false}
                        onChange={(data) => setRepeatDays(data)}
                    />
                    <Button
                        style={styles.button}
                        disabled={false}
                        text="done"
                        onClick={handleConfirm}
                    />
                </View>
            ) : (
                <View style={styles.options}>
                    {recipeMealLogOptions.map((option, id) => (
                        <Button
                            leftIcon={option.icon}
                            leftIconStyles={styles.leftIconStyle}
                            key={id}
                            type="none"
                            text={option.label}
                            onClick={() => {
                                AppLogger.trackEvent('meal_logged', {
                                    meal_type: 'breakfast',
                                    status: id === 0 ? 'completed' : 'not completed',
                                });
                                handleMealLog(id);
                            }}
                            disabled={false}
                            style={styles.btnContainer2}
                            textStyles={[styles.btnTextStyles, styles.btnTextStyles2]}
                        />
                    ))}
                </View>
            )}
        </BottomModal>
    );
};

export default RecipeBottomModal;
