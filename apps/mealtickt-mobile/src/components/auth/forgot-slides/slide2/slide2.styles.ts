import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flex1, paddingX4, w100, fts1_9 } = commonStyles;
const { blackText } = colors;

export const styles = StyleSheet.create({
	container: {
		...flex1, ...paddingX4, ...w100, paddingTop: hp('2%'),
	},
	button: {
		marginTop: hp('3.5%'),
	},
	inputGroup: {
		rowGap: hp('0.8%'), marginTop: hp('3.5%'),
	},
});
