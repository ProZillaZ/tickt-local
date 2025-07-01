import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	bgPrimary,
	fontRegular,
	fontBold,
	fts1_5,
	fts2_6,
	justifyContentBetween,
	alignItemsCenter,
	bgTransparent,
	w100,
	fts1_8,
} = commonStyles;
const { greyMuted, black_60, yellowLight, blackText } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'),
	},
	btnContainer: {
		...flexRow,
		columnGap: 10, ...bgTransparent,
		borderWidth: 1,
		borderColor: greyMuted,
		borderRadius: hp('3%'),
		paddingVertical: hp('1.5%'),
		paddingHorizontal: wp('4%'),
	},
	btnContainer2: {
		...flexRow,
		columnGap: 10, ...bgTransparent,
		borderWidth: 1,
		borderColor: greyMuted,
		borderRadius: hp('3%'),
		paddingVertical: hp('1%'),
		paddingHorizontal: wp('4%'),
	},
	btnTextStyles: {
		...fontRegular, color: black_60, ...fts1_5,
	},
	btnTextStyles2: {
		marginTop: hp('0.3%'),
	},
	leftIconStyle: {
		tintColor: blackText, marginBottom: hp('0%'),
	},
	options: {
		rowGap: hp('1.52%'),
	},
	bar: {
		backgroundColor: yellowLight, height: hp('0.6%'), width: wp('12%'), borderRadius: hp('2%'), alignSelf: 'center',
	},
	heading: {
		color: blackText, ...fts2_6, alignSelf: 'flex-start', marginVertical: hp('2%'), ...fontBold,
	},
	modal: {
		...bgPrimary, borderTopLeftRadius: hp('2%'), borderTopRightRadius: hp('2%'), padding: hp('3.5%'),
	},
	repeatRecipeContainer: {},
	text: {
		color: blackText, ...fontRegular, ...fts1_8,
	},
	button: {
		width: '100%',
	},
});
