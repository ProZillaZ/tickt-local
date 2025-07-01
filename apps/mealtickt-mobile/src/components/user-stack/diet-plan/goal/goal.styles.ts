import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const {
	flexRow,
	justifyContentBetween,
	alignItemsCenter,
	alignItemsStart,
	bgTransparent,
	w100,
	fontBold,
	fontRegular,
	fts1_8,
	resizeContain,
} = commonStyles;
const { black_60, blackText, neutrals } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const border = { borderBottomWidth: 1, borderColor: neutrals };
const text = { ...fontRegular, ...fts1_8, color: black_60 };

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'),
	},
	systemContainer: {
		...row, ...justifyContentBetween, marginBottom: hp('3.3%'),
	},
	systemText: {
		...text,
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
		width: '80%', height: isIOS ? hp('4%') : undefined, marginBottom: hp('0.5%'),
	},
	dropdown: {
		rowGap: hp('1.5%'),
	},
});
