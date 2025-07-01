import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';

const { black_60 } = colors;
const { paddingY1_7, flexRow, gap2, justifyContentStart, fts1_8, marginBottom2 } = commonStyles;

export const styles = StyleSheet.create({
	container: {
		...paddingY1_7,
	},
	allergiesContainer: {
		...flexRow, flexWrap: 'wrap', ...gap2, ...justifyContentStart,
	},
	allergiesText: {
		...justifyContentStart, ...fts1_8, ...marginBottom2, color: black_60, fontFamily: 'Inter-Regular',
	},
});
