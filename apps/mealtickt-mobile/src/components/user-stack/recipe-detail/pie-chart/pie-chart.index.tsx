import React from 'react';
import { Image, Text, View } from 'react-native';
import { PieChart as PieChartComponent } from 'react-native-svg-charts';
import { styles } from './pie-chart.styles';
import { colors } from 'utils/styles';

const PieChart = PieChartComponent as any;
const { yellowLight, yellowDark, neutrals } = colors;

// Function to generate random colors

const PieGraph = (data: { [key: string]: number }) => {
    const pieData = Object.entries(data).map(([key, value]) => ({
        key: key,
        value: value,
        svg: {
            fill:
                key === 'protein'
                    ? '#3B82F6'
                    : key === 'carbohydrates'
                      ? '#FACC15'
                      : key === 'fat'
                        ? '#F97316'
                        : '#10B981',
        },
        arc: { outerRadius: '95%', innerRadius: 2, padAngle: 0.04 },
        label: key,
    }));

    return (
        <View style={styles.headerContainer}>
            <PieChart style={styles.chart} data={pieData} />
        </View>
    );
};

export default PieGraph;
