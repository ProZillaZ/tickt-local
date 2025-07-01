import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import {
	heightPercentageToDP as hp,
	widthPercentageToDP,
	widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentCenter,
	alignItemsCenter,
	bgTransparent,
	w100,
	fts2_8,
	fontBold,
	fontRegular,
	fts1_6,
} = commonStyles;
const { black_60, blackText } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'), marginTop: hp('4%'),
	},
	heading: {
		...fts2_8, ...fontBold, color: black_60,
	},
	stars: {
		height: hp('2.5%'), width: hp('2.5%'),
	},
	ratingContainer: {
		...flexRow, ...alignItemsCenter, columnGap: hp('2%'), ...justifyContentCenter, marginVertical: hp('2.5%'),
	},
	text: {
		color: blackText, ...fts1_6, ...fontRegular,
	},
});
