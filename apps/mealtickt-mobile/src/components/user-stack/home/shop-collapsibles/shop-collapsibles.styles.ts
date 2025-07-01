import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentBetween,
	alignItemsCenter,
	resizeContain,
	bgTransparent,
	w100,
	fts1_3,
	fts1_5,
	fts2,
	fontRegular,
	fontBold,
} = commonStyles;
const { blackText, black_60, greyMuted } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'), marginBottom: hp('6%'),
	},
	smallText: {
		...fts1_3, color: blackText, ...fontRegular, marginBottom: hp('2.5%'), marginTop: hp('1%'),
	},
	header: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween,
	},
	heading: {
		...fts2, color: black_60, ...fontBold,
	},
	chevron: {
		height: hp('2%'), width: hp('2%'), tintColor: black_60, ...resizeContain,
	},
	collapsable: {
		rowGap: hp('4%'),
	},
	iconImageStyle: {
		tintColor: greyMuted, height: hp('1%'), width: hp('1%'),
	},
	innerIconStyle: {
		borderColor: greyMuted, borderWidth: hp('0.15%'), borderRadius: hp('0.25%'),
	},
	bouncyBox: {
		width: hp('2.5%'),
	},
	textQuantity: {
		...fts1_5, color: blackText, ...fontBold,
	},
	itemText: {
		...fts1_5, color: blackText, ...fontRegular,
	},
	item: {
		...flexRow, ...alignItemsCenter, columnGap: hp('0.8%'),
	},
	itemRowGap: {
		rowGap: hp('1.5%'), marginTop: hp('2.5%'),
	},
	textStrikeThough: {
		textDecorationLine: 'line-through',
	},
});
