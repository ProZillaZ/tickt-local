import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentBetween,
	justifyContentCenter,
	alignItemsCenter,
	bgTransparent,
	w100,
	fontBold,
	fontRegular,
	fts3_7,
	fts1_5,
	fts1_4,
} = commonStyles;
const { black_60, blackText, yellowLight } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'),
	},
	heading: {
		color: black_60, ...fontBold, ...fts3_7, marginTop: hp('2.3%'),
	},
	recipeDetailContainer: {
		...flexRow, ...alignItemsCenter, columnGap: hp('0.5%'), rowGap: hp('1%'),
	},
	columnGap: {
		flexWrap: 'wrap', ...flexRow, ...alignItemsCenter, columnGap: hp('2%'), rowGap: hp('1%'), marginTop: hp('1.52%'),
	},
	text: {
		color: blackText, ...fontRegular, ...fts1_5,
	},
	text2: {
		color: blackText, ...fontRegular, ...fts1_4,
	},
	icon: {
		height: hp('2.6%'), width: hp('2.6%'), tintColor: blackText,
	},
	dot: {
		height: hp('0.4%'), width: hp('0.4%'), backgroundColor: blackText, borderRadius: hp('1%'), marginLeft: hp('1%'),
	},
	plusContainer: {
		backgroundColor: yellowLight,
		height: hp('2.6%'),
		width: hp('2.6%'),
		borderRadius: hp('3%'), ...alignItemsCenter, ...justifyContentCenter,
	},
});
