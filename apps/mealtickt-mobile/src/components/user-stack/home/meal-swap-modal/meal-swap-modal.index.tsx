import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { BottomModal } from 'components/global/bottom-modal/bottom-modal.index';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { swapMeal } from 'app/constants/constants.ts';
import { MealSwapProps } from './meal-swap-modal.props';
import { useMealSwap } from './use-meal-swap-modal.ts';
import { styles } from './meal-swap-modal.styles';
import AppLogger from 'app/logger/logger.ts';

const MealSwapBottomModal = ({ swapedRecipe, onUpdate, isVisible, onClose }: MealSwapProps) => {
    const { handleSwap } = useMealSwap({ onUpdate, onClose });

    return (
        <BottomModal
            modalStyle={styles.modal}
            isVisible={isVisible}
            height={hp('50%')}
            onClose={onClose}>
            <View style={styles.bar} />
            <Text style={[styles.title, styles.heading]}>pe</Text>
            <View style={styles.optionContainer}>
                {swapMeal.map((item, id) => (
                    <TouchableOpacity
                        onPress={() => {
                            AppLogger.trackEvent('recipe_swapped', {
                                old_recipe: swapMeal[swapedRecipe].label,
                                new_recipe: swapMeal[id].label,
                            });
                            handleSwap(id);
                        }}
                        disabled={id == swapedRecipe}
                        key={id}
                        style={[
                            styles.buttonContainer,
                            id == swapedRecipe && styles.buttonContainerActive,
                        ]}>
                        <Text style={styles.durationTitle}>{item.label}</Text>
                        <View style={styles.durationContainer}>
                            <Image
                                style={styles.durationIcon}
                                source={require('../../../../assets/icons/timer.png')}
                            />
                            <Text style={styles.duration}>{item.duration}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </BottomModal>
    );
};

export default MealSwapBottomModal;
