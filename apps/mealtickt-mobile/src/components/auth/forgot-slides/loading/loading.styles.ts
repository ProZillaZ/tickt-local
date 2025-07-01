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
	alignItemsCenter,
} = commonStyles;
const { black_60, blackText, black } = colors;

export const styles = StyleSheet.create({
	container: {
		margin: 0,
	},
	subContainer: {
		...dFlex, ...flex1, ...bgPrimary, paddingTop: hp('6%'), ...alignItemsCenter,
	},
	title: {
		...fts3_7, ...fontBold, ...textAlignCenter, paddingHorizontal: hp('2%'), marginTop: hp('15%'), color: black_60,
	},
	description: {
		...fts1_6, ...fontRegular, ...textAlignCenter,
		paddingHorizontal: hp('2%'),
		marginTop: hp('2%'),
		color: blackText,
		textAlign: 'left',
	},
	logo: {
		height: hp('17%'),
		width: hp('17%'), ...resizeContain,
		tintColor: black,
		marginTop: hp('6%'),
		marginBottom: hp('-17%'),
	},
});
