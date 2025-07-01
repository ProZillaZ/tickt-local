import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isTablet } from 'utils/helpers.ts';

const {
	justifyContentStart,
	fts1_7,
	fts1_6,
	rounded3,
	marginBottom2,
	rounded4,
	paddingX2,
	paddingY1_6,
	paddingX1,
	flexRow,
	alignItemsCenter,
	justifyContentBetween,
} = commonStyles;
const { neutrals, black_60, blackText, primary } = colors;

const styles = StyleSheet.create({
	container: {
		// marginVertical:hp('1.3%')
		marginVertical: hp('1%'),

	},
	dropDownContainer: {
		...rounded3, ...paddingX2, ...paddingY1_6, borderColor: neutrals, borderWidth: 1,
	},
	label: {
		...justifyContentStart, ...fts1_6, ...marginBottom2, color: black_60, fontFamily: 'Inter-Regular',
	},
	selectedText: {
		color: blackText, ...fts1_7, ...paddingX1, fontFamily: 'Inter-Regular',
	},
	icon: {
		width: isTablet ? wp('2%') : wp('2.7%'),
		height: wp('1.7%'),
		resizeMode: 'contain',
		tintColor: blackText,
		marginRight: '1%',
	},
	validationIcon: {
		width: isTablet ? wp('3%') : wp('4.5%'),
		height: hp('4.5%'),
		resizeMode: 'contain',
		tintColor: blackText,
		marginRight: '1%',
		marginTop: -10,
	},
	row: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween,
	},
	selectionContainer: {
		backgroundColor: primary, fontSize: 12, ...paddingY1_6,
	},
	selectedTextContainer: {
		color: blackText, ...fts1_7, ...paddingX1, fontFamily: 'Inter-Regular',
	},
});

export default styles;
