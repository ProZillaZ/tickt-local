import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';

const { yellowLight } = colors;
const { flex1 } = commonStyles;

export const styles = StyleSheet.create({
	indicator: {
		position: 'absolute', width: 6, top: 1, right: 0, backgroundColor: yellowLight, borderRadius: 10,
	},
	container: {
		...flex1, position: 'relative',
	},
});
