import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flexRow, flexCenter, bgTransparent, fontRegular, fts1_6 } = commonStyles;
const { greyMuted, blackText } = colors;
export const styles = StyleSheet.create({
	container: {
		rowGap: hp('1.7%'), marginTop: hp('4%'),
	},
	buttonContainer: {
		...flexRow, ...flexCenter,
		columnGap: 10, ...bgTransparent,
		borderWidth: 1,
		borderColor: greyMuted,
		borderRadius: hp('10%'),
	},
	text: {
		...fontRegular, color: blackText, ...fts1_6,
	},
	icon: {
		tintColor: blackText,
	},
});
