import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentBetween,
	alignItemsCenter,
	bgTransparent,
	w100,
	fontBold,
	fontRegular,
	fts2,
	fts1_6,
	fts1_5,
} = commonStyles;
const { black_60, blackText } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'), marginTop: hp('3%'),
	},
	heading: {
		color: black_60, ...fts2, ...fontBold, marginBottom: hp('2%'),
	},
	text: {
		color: blackText, ...fts1_6, ...fontRegular,
	},
	text2: {
		color: blackText, ...fts1_5, ...fontRegular,
	},
	MacrosOptionContainer: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween, marginTop: hp('2%'),
	},
	MacrosOption: {
		...flexRow, ...alignItemsCenter, columnGap: hp('0.5%'),
	},
	icon: {
		height: hp('2.6%'), width: hp('2.6%'), tintColor: blackText,
	},
	dot: {
		height: hp('0.4%'), width: hp('0.4%'), backgroundColor: blackText, borderRadius: hp('1%'),
	},
});
