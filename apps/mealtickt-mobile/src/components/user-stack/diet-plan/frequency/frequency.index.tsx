import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { DailyFrequencyProps } from './frequency.props';
import { styles } from './frequency.styles';

const DailyFrequency = ({ data, onUpdate }: DailyFrequencyProps) => {
    console.log('fre quency :', data.frequency);
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.label}>how often do you eat in a day?</Text>
            <View style={styles.items}>
                {Array.from({ length: 6 }, (_, i) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => onUpdate('frequency', i + 1)}
                        style={[
                            styles.container,
                            (`${i + 1} times` === data.frequency && styles.containerActive) ||
                                (i + 1 === data.frequency && styles.containerActive),
                        ]}>
                        <Text style={styles.text}>{i + 1}</Text>
                        <Image
                            style={styles.icon}
                            source={require('../../../../assets/icons/boul2.png')}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default DailyFrequency;
