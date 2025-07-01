import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { activePace, step2Options } from 'app/constants/constants';
import { styles } from './active.styles';
import { ActiveForDietProps } from './active.props';

const ActiveForDiet = ({ selectedLabel, onUpdate }: ActiveForDietProps) => {
    console.log('active pace :',activePace,selectedLabel)
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.label}>{activePace.label}</Text>
            <View style={styles.items}>
                {activePace.options.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => onUpdate(activePace.key, item)}
                        style={[styles.container, item == selectedLabel && styles.containerActive]}>
                        <Text style={styles.text}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default ActiveForDiet;
