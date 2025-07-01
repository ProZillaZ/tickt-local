import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flex1,
	paddingX4,
	w100,
	resizeContain,
	alignItemsStart,
	fts2_6,
	fts2_8,
	fts2_2,
	fts1_8,
	fts1_6,
	fontBold,
	fontRegular,
	flexRow,
	alignItemsCenter,
	justifyContentBetween,
} = commonStyles;
const { black_60, blackText, neutrals } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const sharedText = { ...fts1_8, ...fontRegular, color: blackText };
const border = { borderBottomWidth: 1, borderColor: neutrals };

export const styles = StyleSheet.create({
	headerContainer: {
		...flex1, ...paddingX4, ...w100, position: 'relative',
	},
	profileLogo: {
		height: hp('2.8%'), width: hp('2.8%'), ...resizeContain, tintColor: black_60,
	},
	headingContainer: {
		...row, columnGap: hp('0.7%'), marginTop: hp('5%'), marginBottom: hp('1%'),
	},
	title: {
		...fontBold, ...fts2_6, color: black_60,
	},
	text: {
		...sharedText, marginTop: hp('3%'),
	},
	heading: {
		...sharedText, marginVertical: hp('4%'), ...fts2_2, color: black_60,
	},
	currentPlanText: {
		...fontBold, color: black_60,
	},
	benefitsContainer: {
		...row, columnGap: hp('0.7%'), width: wp('90%'),
	},
	benefitsIcon: {
		height: hp('2.8%'), width: hp('2.8%'), ...resizeContain, tintColor: blackText,
	},
	benefitText: {
		...sharedText,
	},
	rowGap: {
		rowGap: hp('1%'),
	},
	optionContainer: {
		...border,
		rowGap: hp('2.5%'), ...alignItemsCenter,
		borderWidth: 1,
		width: '32%',
		paddingVertical: hp('2.5%'),
		borderRadius: hp('2%'),
		columnGap: hp('0.5%'),
	},
	genderRow: {
		...row, ...justifyContentBetween, marginVertical: hp('4%'), columnGap: hp('1.5%'), width: wp('90%'),
	},
	price: {
		...fontBold, ...fts2_8, color: blackText,
	},
	duration: {
		...sharedText, ...fts1_6,
	},
});
