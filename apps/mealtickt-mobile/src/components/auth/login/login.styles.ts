import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flex1, paddingX4, w100, fts1_7, fontRegular } = commonStyles;
const { blackText } = colors;
export const styles = StyleSheet.create({
	container: {
		...flex1, ...paddingX4, ...w100, paddingTop: hp('5%'),
	},
	inputGroup: {
		rowGap: hp('0.8%'),
	},
	button: {
		marginTop: hp('3.5%'),
	},
	forgotText: {
		alignSelf: 'center',
		color: blackText, ...fts1_7, ...fontRegular,
		textDecorationLine: 'underline',
		marginTop: hp('5%'),
	},
});
