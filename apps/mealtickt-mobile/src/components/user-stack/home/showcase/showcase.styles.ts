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
	fts1_8,
	fts1_6,
	fts2_6,
	fts3_5,
	w100,
	justifyContentBetween,
	bgPrimary,
	w60,
	h0_5,
} = commonStyles;
const { blackText, greyMuted, yellow, black_60, primary, yellowLight, neutrals, yellowDark, neutrals_200 } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const sharedTitle = { color: primary, ...fontBold, ...fts3_5 };
const sharedText = { color: primary, ...fontRegular, ...fts1_8 };
const sharedIcon = { width: hp('3%'), height: hp('3%'), ...resizeContain, tintColor: primary };

export const styles = StyleSheet.create({
	container: {
		...w100, marginTop: hp('-2%'), marginBottom: hp('2.5%'),
	},
	slide: {
		...alignItemsCenter, ...justifyContentCenter,
		alignSelf: 'center',
		height: hp('65%'),
		width: wp('90%'),
		borderRadius: hp('2.5%'),
		position: 'relative',
		marginHorizontal: wp('1%'),
	},
	skipDay: {
		backgroundColor: neutrals_200,
	},
	congrats: {
		backgroundColor: yellow,
	},
	sad: {
		backgroundColor: black_60,
	},
	slideImage: {
		borderRadius: hp('2.5%'),
	},
	title: {
		...sharedTitle,
	},
	skipTitle: {
		...sharedTitle, color: black_60,
	},
	skipIcon: {
		...sharedIcon, tintColor: black_60,
	},
	skipText: {
		...sharedText, color: blackText,
	},
	circleContainer: {
		height: '100%', width: 10, position: 'absolute', ...alignItemsCenter, ...justifyContentBetween, zIndex: 99,
	},
	circle: {
		height: hp('3%'), width: hp('3%'), ...bgPrimary, borderRadius: hp('3%'),
	},
	circle1: {
		marginTop: hp('-1.5%'),
	},
	circle2: {
		marginBottom: hp('-1.5%'),
	},
	card: {
		height: '100%', width: '100%', ...justifyContentBetween, padding: hp('3%'), zIndex: 99,
	},
	skipCard: {
		...alignItemsCenter, ...justifyContentCenter,
	},
	cardHead: {
		flexDirection: 'column', rowGap: hp('1%'), alignSelf: 'flex-end',
	},
	cardOptContainer: {
		backgroundColor: yellow,
		borderRadius: hp('5%'),
		height: hp('5.5%'),
		width: hp('5.5%'), ...alignItemsCenter, ...justifyContentCenter,
	},
	cardOptLogo: {
		width: hp('3%'), height: hp('3%'), ...resizeContain, tintColor: black_60,
	},
	cardbody: {
		rowGap: hp('2%'),
	},
	sperator: {
		width: '100%', borderWidth: 1, borderColor: primary, borderRadius: hp('1%'), borderStyle: 'dashed',
	},
	footer: {
		...row, columnGap: hp('2%'),
	},
	type: {
		...row, columnGap: hp('1%'),
	},
	icon: {
		...sharedIcon,
	},
	text: {
		...sharedText,
	},
	dot: {
		height: hp('0.4%'), width: hp('0.4%'), ...bgPrimary, borderRadius: hp('3%'),
	},
	gradient: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		height: '40%',
		width: '100%',
		borderRadius: hp('3%'),
		zIndex: 10,
	},
	progressContainer: {
		...w60, ...h0_5, backgroundColor: yellowLight, borderRadius: 5, marginBottom: hp('4%'), alignSelf: 'center',
	},
	progressBar: {
		...h0_5, backgroundColor: neutrals, borderRadius: hp('10%'),
	},
	modal: {
		...bgPrimary, borderTopLeftRadius: hp('2%'), borderTopRightRadius: hp('2%'), padding: hp('3.5%'),
	},
	bar: {
		backgroundColor: yellowLight, height: hp('0.6%'), width: wp('12%'), borderRadius: hp('2%'), alignSelf: 'center',
	},
	optionContainer: {
		rowGap: hp('2%'),
	},
	buttonContainer: {
		rowGap: hp('1%'),
		borderRadius: hp('2.53%'),
		borderWidth: 1,
		borderColor: greyMuted,
		paddingVertical: hp('2%'),
		paddingHorizontal: hp('1.5%'),
	},
	buttonContainerActive: {
		borderColor: yellowDark, backgroundColor: yellowLight,
	},
	durationContainer: {
		...row, columnGap: hp('0.5%'),
	},
	heading: {
		color: blackText, ...fts2_6, alignSelf: 'flex-start', marginVertical: hp('2%'),
	},
	durationTitle: {
		...fts1_8, color: black_60, ...fontRegular,
	},
	duration: {
		...fts1_6, color: blackText, ...fontRegular,
	},
	durationIcon: {
		width: hp('2.6%'), height: hp('2.6%'), tintColor: blackText,
	},
});
