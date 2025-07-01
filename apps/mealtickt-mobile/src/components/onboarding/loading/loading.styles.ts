import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	h5,
	dFlex,
	flex1,
	bgPrimary,
	fts3_7,
	fts1_6,
	fontBold,
	fontRegular,
	textAlignCenter,
	resizeContain,
} = commonStyles;
const { black_60, blackText, black } = colors;

export const styles = StyleSheet.create({
	container: {
		margin: 0,
	},
	subContainer: {
		...dFlex, ...flex1, ...bgPrimary, paddingTop: hp('7%'), paddingHorizontal: wp('4%'),
	},
	loadingDot: {
		height: hp('1.52%'),
		width: hp('1.52%'),
		backgroundColor: colors.yellow,
		borderRadius: hp('3%'),
		alignSelf: 'center',
		marginTop: hp('15%'),
	},
	title: {
		...fts3_7, ...fontBold, ...textAlignCenter, paddingHorizontal: hp('2%'), marginTop: hp('15%'), color: black_60,
	},
	description: {
		...fts1_6, ...fontRegular, ...textAlignCenter,
		paddingHorizontal: hp('2%'),
		marginTop: hp('2%'),
		color: blackText,
	},
	logo: {
		width: 100, height: hp('2.53%'), ...resizeContain, tintColor: black,
	},
});
