import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	justifyContentCenter,
	justifyContentStart,
	alignItemsCenter,
	alignItemsStart,
	resizeContain,
	bgTransparent,
	w100,
	fts1_8,
	fts1_3,
	fontRegular,
} = commonStyles;
const { blackText } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'),
	},
	inputContainer: {},
	inputBox: {
		...justifyContentCenter, marginTop: hp('1.5%'),
	},
	input: {
		width: wp('40%'),
	},
	searchContainer: {
		marginVertical: hp('2%'), height: hp('45%'),
	},
	item: {
		...flexRow, ...alignItemsStart, columnGap: hp('0.7%'), marginBottom: hp('2%'),
	},
	icon: {
		width: hp('2.6%'), height: hp('2.6%'), ...resizeContain,
	},
	textGroup: {
		width: '100%', rowGap: hp('0.7%'),
	},
	title: {
		width: '90%', color: blackText, ...fts1_8, ...fontRegular,
	},
	date: {
		color: blackText, ...fts1_3, ...fontRegular,
	},
});
