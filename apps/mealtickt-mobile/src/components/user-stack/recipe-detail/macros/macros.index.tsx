import { View, Text, Image } from 'react-native';
import React, { Fragment } from 'react';
import { MacrosOptionProps, MacrosProps } from './macros.props';
import { styles } from './macros.styles';
import PieGraph from '../pie-chart/pie-chart.index';

const MacrosOption = ({ value, type }: MacrosOptionProps) => {
    return (
        <View style={styles.MacrosOption}>
            <Image
                style={styles.icon}
                source={require('../../../../assets/icons/CheckCircle.png')}
            />
            <Text style={styles.text2}>
                {value}gr {type}
            </Text>
        </View>
    );
};

const RecipeMacros: React.FC<MacrosProps> = ({ data }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.heading}>macros</Text>
            <Text style={styles.text}>{data.calories} calories</Text>
            <View style={styles.MacrosOptionContainer}>
                {Object.entries(data).map(([key, value], index, array) => {
                    if (index == 0) return null;
                    return (
                        <Fragment key={key}>
                            <MacrosOption value={value as number} type={key} />
                        </Fragment>
                    );
                })}
            </View>
            <PieGraph {...data} />
        </View>
    );
};

export default RecipeMacros;
