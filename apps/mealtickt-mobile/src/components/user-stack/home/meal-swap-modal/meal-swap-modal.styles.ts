import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentBetween,
	alignItemsCenter,
	bgTransparent,
	w100,
	bgPrimary,
	fontRegular,
	fontBold,
	fts3_5,
	fts2_6,
	fts1_8,
	fts1_6,
} = commonStyles;
const { yellowLight, yellowDark, blackText, black_60, greyMuted, primary } = colors;
const sharedTitle = { color: primary, ...fontBold, ...fts3_5 };
const row = { ...flexRow, ...alignItemsCenter };

export const styles = StyleSheet.create({
	headerContainer: {
		...flexRow, ...justifyContentBetween, ...alignItemsCenter, ...bgTransparent, ...w100,
		paddingHorizontal: wp('4%'),
	},
	title: { ...sharedTitle },
	modal: {
		...bgPrimary, borderTopLeftRadius: hp('2%'), borderTopRightRadius: hp('2%'), padding: hp('3.5%'),
	},
	bar: {
		backgroundColor: yellowLight, height: hp('0.6%'), width: wp('12%'), borderRadius: hp('2%'), alignSelf: 'center',
	},
	optionContainer: {
		rowGap: hp('2%'),
	},
	buttonContainer: {
		rowGap: hp('1%'),
		borderRadius: hp('2.53%'),
		borderWidth: 1,
		borderColor: greyMuted,
		paddingVertical: hp('2%'),
		paddingHorizontal: hp('1.5%'),
	},
	buttonContainerActive: {
		borderColor: yellowDark, backgroundColor: yellowLight,
	},
	durationContainer: {
		...row, columnGap: hp('0.5%'),
	},
	heading: {
		color: blackText, ...fts2_6, alignSelf: 'flex-start', marginVertical: hp('2%'),
	},
	durationTitle: {
		...fts1_8, color: black_60, ...fontRegular,
	},
	duration: {
		...fts1_6, color: blackText, ...fontRegular,
	},
	durationIcon: {
		width: hp('2.6%'), height: hp('2.6%'), tintColor: blackText,
	},
});
