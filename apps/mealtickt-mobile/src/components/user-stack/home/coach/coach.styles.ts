import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, commonStyles } from 'utils/styles';

const {
	flexRow,
	alignItemsCenter,
	flexCenter,
	justifyContentCenter,
	resizeContain,
	fontRegular,
	fontBold,
	fts2_8,
	fts1_5,
	fts1_8,
	justifyContentBetween,
	bgPrimary,
	bgTransparent,
} = commonStyles;
const { blackText, greyMuted, yellowLight, black_60, primary, accent_50 } = colors;
const row = { ...flexRow, ...alignItemsCenter };

export const styles = StyleSheet.create({
	container: {
		marginHorizontal: wp('4%'), ...bgPrimary,
		borderRadius: hp('2%'),
		padding: hp('2%'),
		backgroundColor: yellowLight,
	},
	btnContainer: {
		...flexRow, ...flexCenter,
		columnGap: 10, ...bgTransparent,
		borderWidth: 1,
		borderColor: greyMuted,
		borderRadius: hp('10%'),
		paddingVertical: hp('1%'),
		paddingHorizontal: wp('4%'),
	},
	btnTextStyles: {
		...fontRegular, color: black_60, ...fts1_5,
	},
	optionContainer: {
		...row, flexWrap: 'wrap', gap: hp('1%'), marginBottom: hp('2%'),
	},
	title: {
		...fontBold, color: blackText, ...fts2_8, marginBottom: hp('1.8%'),
	},
	description: {
		...fontRegular, color: blackText, ...fts1_8, marginBottom: hp('1.5%'),
	},
	confirmButton: {
		width: '100%',
	},
});
