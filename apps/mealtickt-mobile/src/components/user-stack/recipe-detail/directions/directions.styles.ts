import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentCenter,
	alignItemsCenter,
	bgTransparent,
	w100,
	fontRegular,
	fontBold,
	fts1_6,
	fts1_4,
	fts2,
} = commonStyles;
const { black_60, blackText, yellowLight } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'), marginTop: hp('3%'),
	},
	heading: {
		color: black_60, ...fts2, ...fontBold, marginBottom: hp('2%'),
	},
	optionsContainer: {
		rowGap: hp('2%'),
	},
	option: {
		color: blackText, ...fts1_6, ...fontRegular,
	},
	direction: {
		...flexRow, ...alignItemsCenter, columnGap: hp('1%'), width: '90%',
	},
	numContainer: {
		height: hp('3%'),
		width: hp('3%'),
		borderRadius: hp('3%'),
		backgroundColor: yellowLight, ...alignItemsCenter, ...justifyContentCenter,
	},
	number: {
		color: blackText, ...fts1_4, ...fontRegular,
	},
});
