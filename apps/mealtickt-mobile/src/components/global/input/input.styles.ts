import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIOS, isTablet } from 'utils/helpers.ts';

const {
	fts1_6,
	flexRow,
	alignItemsCenter,
	justifyContentBetween,
	rounded2,
	padding0,
	bgTransparent,
	w90,
	w88,
	h3_7,
	rounded3,
} = commonStyles;
const { grey, blackText, yellowDark, neutrals, black_60 } = colors;

export const styles = StyleSheet.create({
	primaryContainer: {
		marginVertical: hp('0.5%'),
	},
	primaryInput: {
		...rounded3,
		borderWidth: 1,
		borderColor: neutrals,
		paddingVertical: hp('0.8%'),
		paddingHorizontal: isTablet ? wp('1.5%') : wp('3.3%'),
		marginVertical: hp('0.3%'),
	},
	searchCloseIcon: {
		height: 15, width: 15, tintColor: grey,
	},
	input: {
		...fts1_6, ...w88,
		marginRight: 10,
		fontFamily: 'Inter-Regular',
		color: blackText,
		fontWeight: '400',
		height: isIOS ? h3_7.height : undefined,
	},
	searchBar: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween, ...rounded2, ...padding0,
		columnGap: 5, ...bgTransparent,
	},
	searchIcon: {
		height: hp('2.7%'), width: hp('2.7%'), tintColor: blackText,
	},
	verified: {
		height: hp('2.7%'), width: hp('2.7%'), tintColor: yellowDark,
	},
	labelContainer: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween, marginBottom: hp('.52%'),
	},
	label: {
		fontFamily: 'Inter-Regular', color: black_60, ...fts1_6,
	},
});
