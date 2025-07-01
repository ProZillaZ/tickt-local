import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, commonStyles } from 'utils/styles';

const {
	flexRow,
	alignItemsCenter,
	justifyContentCenter,
	resizeContain,
	fontRegular,
	fts1_4,
	fts1_8,
	w100,
	justifyContentBetween,
} = commonStyles;
const { blackText, greyMuted } = colors;

export const styles = StyleSheet.create({
	container: {
		...w100, marginTop: hp('3%'), marginBottom: hp('2.5%'),
	},
	slide: {
		...alignItemsCenter, ...justifyContentCenter, height: hp('5%'), rowGap: hp('0.5%'), position: 'relative',
	},
	title: {
		color: blackText, ...fontRegular, ...fts1_8, fontWeight: '600',
	},
	range: {
		color: blackText, ...fontRegular, ...fts1_4, fontWeight: 'light',
	},
	chevron: {
		height: hp('2%'), width: hp('2%'), ...resizeContain, tintColor: blackText,
	},
	disabledChevron: {
		tintColor: greyMuted,
	},
	buttonsContainer: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween,
		marginHorizontal: wp('4%'),
		position: 'absolute',
		top: hp('1.5%'),
		width: wp('90%'),
	},
});
