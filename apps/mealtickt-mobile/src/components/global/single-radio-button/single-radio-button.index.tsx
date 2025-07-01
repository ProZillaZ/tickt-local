import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSingleRadioButton } from './use-single-radio-button.ts';
import { styles } from './single-radio-button.styles.ts';
import { SingleOptionButton } from './single-radio-button.props.ts';

const singleRadioButton = ({ style, data, onChange, defaultValue }: SingleOptionButton) => {
    const { selectedOption, handleSelectedOption } = useSingleRadioButton({
        onChange,
        defaultValue,
    });

    return (
        <View style={[styles.container, style]}>
            {data.label && <Text style={styles.title}>{data.label}</Text>}
            <View style={styles.toggleContainer}>
                {data.options.map((option) => {
                    return (
                        <TouchableOpacity
                            key={option.id}
                            style={[styles.toggleButton]}
                            onPress={() => handleSelectedOption(option.id)}>
                            <View
                                style={[
                                    styles.radioCircle,
                                    selectedOption === option.id && styles.radioCircleSelected,
                                ]}>
                                {selectedOption === option.id && (
                                    <View style={styles.selectedRadio} />
                                )}
                            </View>
                            <Text
                                style={[
                                    styles.toggleText,
                                    selectedOption === option.id && styles.selectedToggleText,
                                ]}>
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export default singleRadioButton;
