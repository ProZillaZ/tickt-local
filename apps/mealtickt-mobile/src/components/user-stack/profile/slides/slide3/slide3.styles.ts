import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flex1,
	paddingX4,
	w100,
	resizeContain,
	fts2_6,
	fts1_8,
	fontBold,
	fontRegular,
	flexRow,
	alignItemsCenter,
	justifyContentBetween,
} = commonStyles;
const { black_60, neutrals, blackText, yellowLight, greyMuted } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const border = { borderBottomWidth: 1, borderColor: neutrals };
const text = { ...fontRegular, ...fts1_8, color: black_60 };

export const styles = StyleSheet.create({
	headerContainer: {
		...flex1, ...paddingX4, ...w100, position: 'relative',
	},
	profileLogo: {
		height: hp('2.8%'), width: hp('2.8%'), ...resizeContain, tintColor: black_60,
	},
	headingContainer: {
		...row, columnGap: hp('0.7%'), marginTop: hp('5%'), marginBottom: hp('5%'),
	},
	title: {
		...fontBold, ...fts2_6, color: black_60,
	},
	genderContainer: {
		paddingBottom: hp('1.72%'), marginBottom: hp('3.3%'),
	},
	optionContainer: {
		...row, ...border,
		borderWidth: 1,
		paddingHorizontal: hp('1%'),
		paddingVertical: hp('1.2%'),
		borderRadius: hp('1%'),
		columnGap: hp('0.5%'),
	},
	optionContainerActive: {
		backgroundColor: yellowLight, borderColor: greyMuted,
	},
	genderRow: {
		...row, marginTop: hp('2%'), columnGap: hp('0.7%'),
	},
	systemContainer: {
		...row, ...justifyContentBetween, ...border,
		paddingBottom: hp('1.72%'),
		marginBottom: hp('3.3%'),
		paddingHorizontal: wp('2%'),
	},
	systemText: {
		...text, marginTop: hp('0.5%'),
	},
	inputCardContainer: {
		...row, columnGap: hp('1.5%'),
	},
	inputCardIconContainer: {
		...row, columnGap: hp('0.6%'),
	},
	inputCardIcon: {
		height: hp('2.5%'), width: hp('2.5%'), ...resizeContain, tintColor: black_60,
	},
	inputCardValue: {
		...fontBold, ...fts1_8, color: black_60,
	},
	systemText2: {
		...text, color: blackText,
	},
	input: {
		width: '80%',
	},
});
