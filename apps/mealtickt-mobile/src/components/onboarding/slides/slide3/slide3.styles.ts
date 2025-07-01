import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flex1, paddingX4, w100, fts1_9 } = commonStyles;
const { red } = colors;

export const styles = StyleSheet.create({
	container: {
		...flex1, ...paddingX4, ...w100, paddingTop: hp('5%'),
	},
	errorText: {
		color: red || 'red',
		fontSize: hp('1.5%'),
		marginBottom: hp('0.8%'),
		marginTop: hp('-0.4%'),
	},
	inputContainer: {
		marginBottom: hp('1%'),
	},
	btn: {
		marginTop: hp('2%'),
	},
});
