import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentBetween,
	alignItemsCenter,
	bgTransparent,
	w100,
	fts2,
	fontBold,
	fontRegular,
	fts1_6,
} = commonStyles;
const { black_60, blackText } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'), marginTop: hp('3%'),
	},
	heading: {
		color: black_60, ...fts2, ...fontBold, marginBottom: hp('2%'),
	},
	optionsContainer: {
		rowGap: hp('1%'),
	},
	option: {
		color: blackText, ...fts1_6, ...fontRegular,
	},
});
