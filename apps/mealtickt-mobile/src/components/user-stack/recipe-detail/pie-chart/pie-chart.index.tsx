import React from 'react';
import { Image, Text, View } from 'react-native';
import { PieChart as PieChartComponent } from 'react-native-svg-charts';
import { styles } from './pie-chart.styles';
import { colors } from 'utils/styles';

const PieChart = PieChartComponent as any;
const { yellowLight, yellowDark, neutrals } = colors;

// Function to generate random colors
const generateRandomColor = () => {
    const colors = [
        '#FF6B6B',
        '#4ECDC4',
        '#45B7D1',
        '#96CEB4',
        '#FFEAA7',
        '#DDA0DD',
        '#98D8C8',
        '#F7DC6F',
        '#BB8FCE',
        '#85C1E9',
        '#F8C471',
        '#82E0AA',
        '#F1948A',
        '#85C1E9',
        '#D7BDE2',
        '#F9E79F',
        '#A9DFBF',
        '#F5B7B1',
        '#AED6F1',
        '#D2B4DE',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const PieGraph = (data: { [key: string]: number }) => {
    const pieData = Object.entries(data).map(([key, value]) => ({
        key: key,
        value: value,
        svg: { fill: generateRandomColor() },
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
