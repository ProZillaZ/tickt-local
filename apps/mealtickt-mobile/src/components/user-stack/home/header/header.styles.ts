import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	alignItemsStart,
	alignItemsCenter,
	resizeContain,
	fontBold,
	fontRegular,
	fts3_5,
	fts1_6,
	fts1_8,
	w100,
	justifyContentBetween,
	fts1_5,
} = commonStyles;
const { blackText, black_60, neutrals } = colors;
const sharedText = { ...fts1_5, ...fontRegular, color: blackText };
const sharedContainer = { ...flexRow, ...alignItemsCenter, columnGap: hp('0.7%') };

export const styles = StyleSheet.create({
	container: {
		...w100, paddingHorizontal: wp('4%'), marginTop: hp('1%'),
	},
	headContainer: {
		...flexRow, ...alignItemsStart, ...justifyContentBetween,
	},
	textContainer: {
		rowGap: hp('1.52%'),
	},
	title: {
		...fontBold, ...fts3_5, color: black_60,
	},
	description: {
		...fontRegular, color: blackText, ...fts1_6,
	},
	filterContainer: {
		borderRadius: hp('5%'), borderColor: neutrals, borderWidth: 1, padding: hp('1.2%'),
	},
	filterLogo: {
		height: hp('1.7%'), width: hp('1.7%'), ...resizeContain,
	},
	subContainer: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween, marginTop: hp('2.5%'),
	},
	leftContainer: {
		...sharedContainer,
	},
	rightContainer: {
		...sharedContainer,
	},
	targetLogo: {
		height: hp('2.5%'), width: hp('2.5%'), ...resizeContain, tintColor: blackText,
	},
	text: {
		...sharedText,
	},
	question: {
		...sharedText, textDecorationLine: 'underline',
	},
	repeatMode: {
		...fts1_8, ...fontBold, color: black_60,
	},
});
