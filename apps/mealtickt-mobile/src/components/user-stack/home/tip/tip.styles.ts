import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, commonStyles } from 'utils/styles';

const {
	flexRow,
	alignItemsCenter,
	justifyContentCenter,
	resizeContain,
	fontRegular,
	fontBold,
	fts2_1,
	fts1_6,
	fts1_8,
	justifyContentBetween,
	bgPrimary,
} = commonStyles;
const { blackText, greyMuted, yellow, black_60, primary, accent_50 } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const shareIcon = { width: hp('2.7%'), height: hp('2.7%'), ...resizeContain };

export const styles = StyleSheet.create({
	container: {
		marginTop: hp('-2%'),
		marginBottom: hp('2.5%'),
		marginHorizontal: wp('4%'), ...bgPrimary,
		borderRadius: hp('2%'),
		padding: hp('2%'),
		shadowColor: accent_50,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3.84,
		elevation: 3,
	},
	top: {
		...row, columnGap: hp('0.5%'),
	},
	tip: {
		...fontBold, color: black_60, ...fts1_6,
	},
	icon: {
		...shareIcon, tintColor: black_60,
	},
	title: {
		color: blackText, ...fts2_1, ...fontBold, fontWeight: '600', marginTop: hp('2%'),
	},
	description: {
		...fontRegular, color: blackText, ...fts1_8, marginVertical: hp('1%'),
	},
	optionContainer: {
		marginTop: hp('1%'), rowGap: hp('0.8%'),
	},
	tipItem: {
		...row, columnGap: hp('0.5%'),
	},
	item: {
		...fontRegular, color: blackText, ...fts1_8,
	},
	icon2: {
		...shareIcon, tintColor: blackText,
	},
	button: {
		width: '100%', marginTop: hp('3%'),
	},
});
