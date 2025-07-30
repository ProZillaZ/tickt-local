import { View, Text } from 'react-native';
import React from 'react';
import { DirectionsProps } from './directions.props';
import { styles } from './directions.styles';

const RecipeDirections: React.FC<DirectionsProps> = ({ data }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.heading}>directions</Text>
            <View style={styles.optionsContainer}>
                {data?.map((direction, id) => (
                    <View key={id} style={styles.direction}>
                        <View style={styles.numContainer}>
                            <Text style={styles.number}>{id + 1}</Text>
                        </View>
                        <Text style={styles.option}>{direction.description}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default RecipeDirections;
