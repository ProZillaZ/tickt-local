import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const {
	flex1,
	paddingX4,
	w100,
	resizeContain,
	flexRow,
	alignItemsCenter,
	justifyContentBetween,
	fts3_5,
	fts2_1,
	fts1_5,
	fontBold,
	fontRegular,
	bgTransparent,
} = commonStyles;
const { yellowLight, black_60, blackText, greyMuted } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const sharedIcon = { width: hp('2.63%'), height: hp('2.63%'), ...resizeContain, tintColor: blackText };

export const styles = StyleSheet.create({
	headerContainer: {
		...flex1, ...paddingX4, ...w100, position: 'relative',
	},
	icon: {
		...sharedIcon, alignSelf: 'flex-end', marginTop: isIOS ? 0 : hp('1%'),
	},
	profileLogoContainer: {
		backgroundColor: yellowLight, padding: hp('1%'), borderRadius: hp('6%'),
	},
	profileLogo: {
		height: hp('2%'), width: hp('2%'), ...resizeContain, tintColor: black_60,
	},
	headingContainer: {
		...row, columnGap: hp('1%'), marginVertical: hp('5%'),
	},
	title: {
		...fontBold, ...fts3_5, color: black_60,
	},
	btn: {
		...row, ...justifyContentBetween,
		borderWidth: 1,
		borderColor: greyMuted,
		borderRadius: hp('2%'),
		padding: hp('1.82%'),
	},
	btnLeft: {
		...row, columnGap: hp('1%'),
	},
	btnIcon: {
		...sharedIcon, width: hp('2%'), height: hp('2%'),
	},
	btnIcon1: {
		...sharedIcon,
	},
	btnTitle: {
		...fontRegular, ...fts2_1, color: black_60,
	},
	btnContainer: {
		rowGap: hp('1.8%'), marginBottom: hp('4%'),
	},
	confirm: {
		...bgTransparent, borderWidth: 1, borderColor: greyMuted, borderRadius: hp('5%'),
	},
	confirmText: {
		...fontRegular, ...fts1_5, color: blackText,
	},
});
