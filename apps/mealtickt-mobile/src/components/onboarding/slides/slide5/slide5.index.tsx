import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { styles } from './slide5.styles';
import { useSlide5 } from './use-slide5.ts';
import { FormField } from './slide5.props';
import { step5Options } from 'app/constants/constants.ts';
import Dropdown from 'components/global/dropdown/dropdown.index';
import Content from '../../content/content.index';
import InfoModal from 'components/global/info-modal/info-modal.index.tsx';
import Button from 'components/global/button/button.index';
import { SlideComponentProps } from 'screens/onboarding/onboarding.props';
import { useActiveAnimation } from '../useActiveAnimation.ts';

const Slide5: React.FC<SlideComponentProps> = ({
    handleNext,
    updateStepData,
    onboardingState,
    isActive,
}) => {
    const {
        visible,
        setVisible,
        state,
        onChange,
        errors,
        shouldShowError,
        handleNext: processNext,
        // Weight adjustment
        adjustment,
        adjustWeight,
        getAdjustedWeight,
        MIN_ADJUSTMENT,
        MAX_ADJUSTMENT,
        estimateTime,
        generateMealPlans,
    } = useSlide5(onboardingState, updateStepData);
    const { animateValue, translateX } = useActiveAnimation(isActive);

    // Force select the pace option if it's not showing
    useEffect(() => {
        // Find the pace dropdown option
        const paceOption = step5Options.find((option) => option.key === 'pace');
        if (paceOption && state.pace) {
            // Find the matching option
            const selectedOption = paceOption.options.find((opt) => opt.value === state.pace);
            if (selectedOption) {
                // Force update the dropdown selection
                onChange('pace', state.pace);
            }
        }
    }, [state.pace]);

    const onNextPress = () => {
        if (updateStepData) {
            // Ensure targetWeight is a number before passing to updateStepData
            const updatedState = {
                ...state,
                targetWeight:
                    typeof state.targetWeight === 'string'
                        ? Number(state.targetWeight)
                        : state.targetWeight,
            };
            updateStepData(updatedState);
            processNext(handleNext);
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: animateValue, transform: [{ translateX: translateX }] },
            ]}>
            <Content
                headerText="almost there..."
                description="based on your input, here is what we recommend for your diet plan."
            />
            <View style={styles.lowerContainer}>
                {step5Options.map((option, key) => {
                    return (
                        <View key={key} style={styles.inputContainer}>
                            {key === 0 ? (
                                // Display suggested weight with adjustment controls
                                <View style={styles.weightContainer}>
                                    <View style={styles.weightLabelContainer}>
                                        <Text style={styles.weightLabel}>{option.placeholder}</Text>
                                        <TouchableOpacity
                                            onPress={() => setVisible(true)}
                                            accessibilityLabel="More information about weight"
                                            accessibilityRole="button">
                                            <Text style={styles.infoButton}>i</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.weightAdjustContainer}>
                                        <TouchableOpacity
                                            style={[
                                                styles.adjustButton,
                                                adjustment <= MIN_ADJUSTMENT &&
                                                    styles.adjustButtonDisabled,
                                            ]}
                                            onPress={() => adjustWeight('decrease')}
                                            disabled={adjustment <= MIN_ADJUSTMENT}
                                            accessibilityLabel="Decrease weight"
                                            accessibilityRole="button">
                                            <Text style={styles.adjustButtonText}>-</Text>
                                        </TouchableOpacity>

                                        <Text style={styles.weightValue}>
                                            {`${getAdjustedWeight().adjustedWeight} ${getAdjustedWeight().weightUnit}`}
                                        </Text>

                                        <TouchableOpacity
                                            style={[
                                                styles.adjustButton,
                                                adjustment >= MAX_ADJUSTMENT &&
                                                    styles.adjustButtonDisabled,
                                            ]}
                                            onPress={() => adjustWeight('increase')}
                                            disabled={adjustment >= MAX_ADJUSTMENT}
                                            accessibilityLabel="Increase weight"
                                            accessibilityRole="button">
                                            <Text style={styles.adjustButtonText}>+</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {adjustment !== 0 && (
                                        <Text style={styles.adjustmentText}>
                                            {adjustment > 0 ? `+${adjustment}` : adjustment} kg from
                                            recommended
                                        </Text>
                                    )}
                                </View>
                            ) : (
                                <>
                                    <Dropdown
                                        key={`${option.key}-${state[option.key as FormField]}`}
                                        label={option.placeholder}
                                        data={option.options}
                                        initialValue={
                                            option.options.length > 0
                                                ? option.key === 'pace'
                                                    ? {
                                                          value: state.pace,
                                                          label: option.options[0].label,
                                                      }
                                                    : option.key === 'goal'
                                                      ? {
                                                            value: state.goal,
                                                            label: option.options[0].label,
                                                        }
                                                      : null
                                                : null
                                        }
                                        onSelect={(l, v) =>
                                            onChange(option.key as FormField, String(v))
                                        }
                                    />
                                </>
                            )}

                            {shouldShowError(option.key as FormField) && (
                                <Text style={styles.errorText}>
                                    {errors[option.key as FormField]}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </View>
            {estimateTime() > 0 && (
                <View style={styles.estimatedContainer}>
                    <Text style={styles.estTitle}>estimated time</Text>
                    <Text style={styles.estTitle}>{estimateTime()} weeks</Text>
                </View>
            )}
            <Button onClick={onNextPress} text="next" disabled={false} style={styles.btn} />
            <Button onClick={generateMealPlans} text="next" disabled={false} style={styles.btn} />
            <InfoModal
                visible={visible}
                setVisible={() => setVisible(false)}
                heading="what's suggested goal weight?"
                description={`based on your height and weight, we calculated an estimate range for your ideal weight. you can use this as it is or edit it.
					 however, we don't recommend going too far (ex: -5kg) since that might be detrimental for your health.
        			`}
            />
        </Animated.View>
    );
};

export default Slide5;
