import React from 'react';
import { Image, Text, View } from 'react-native';
import { PieChart as PieChartComponent } from 'react-native-svg-charts';
import { styles } from './pie-chart.styles';
import { colors } from 'utils/styles';

const PieChart = PieChartComponent as any;
const { yellowLight, yellowDark, neutrals } = colors;
const data = [
	{ key: 1, value: 8, label: 'Protein', color: yellowLight },
	{ key: 3, value: 10, label: 'Carbs', color: yellowDark },
	{ key: 2, value: 10, label: 'Fat', color: neutrals },
];

const PieGraph = () => {
	const pieData = data.map((item) => ({
		key: item.key,
		value: item.value,
		svg: { fill: item.color },
		arc: { outerRadius: '95%', innerRadius: 2, padAngle: 0.04 },
		label: item.label,
	}));

	return (
		<View style={styles.headerContainer}>
			<PieChart style={styles.chart} data={pieData} />
		</View>
	);
};

export default PieGraph;
