import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const {
	flexRow,
	justifyContentBetween,
	justifyContentCenter,
	flexCenter,
	alignItemsCenter,
	resizeContain,
	fts1_6,
	bgTransparent,
	w90,
	h3_7,
	w50,
	w60,
	w80,
	fontBold,
	fts2_6,
	bgPrimary,
	fontRegular,
	fts1_5,
} = commonStyles;
const { yellowLight, blackText, yellowDark, greyMuted, black_60, neutrals, yellow } = colors;
const border = { borderWidth: 1, borderRadius: hp('2%') };
const sharedText = { ...fts1_5, ...fontRegular, color: black_60 };
const sharedIcon = { width: hp('2.6%'), height: hp('2.6%'), tintColor: black_60 };

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w90, paddingHorizontal: wp('4%'),
	},
	scrollView: {
		paddingBottom: hp('2%'),
	},
	userContainer: {
		backgroundColor: yellowLight,
		alignSelf: 'flex-end', ...border,
		borderColor: yellowDark,
		paddingVertical: hp('1%'), ...w50,
	},
	userContainer2: {
		...w60,
	},
	userMsg: {
		...sharedText, lineHeight: hp('2.2%'),
	},
	aiMsg: {
		...sharedText, color: blackText, width: '90%', lineHeight: hp('2.2%'),
	},
	aiMsg2: {
		...sharedText, color: blackText,
	},
	aiContainer: {
		...w80, paddingHorizontal: wp('0%'),
	},
	aiRow: {
		...flexRow, ...alignItemsCenter, columnGap: hp('1%'),
	},
	aiIconContainer: {
		...border, borderColor: neutrals, borderRadius: hp('5%'), padding: hp('1.4%'),
	},
	aiIcon: {
		width: hp('1.72%'), height: hp('1.72%'), ...resizeContain, tintColor: black_60,
	},
	aiOptContainer: {
		...flexRow, ...flexCenter, ...bgTransparent,
		borderWidth: 1,
		borderColor: greyMuted,
		borderRadius: hp('10%'),
		paddingVertical: hp('1%'),
		paddingHorizontal: wp('4%'),
	},
	optContainer: {
		flexWrap: 'wrap', ...flexRow, gap: hp('1%'), marginLeft: hp('5%'), marginTop: hp('1%'),
	},
	aiOptText: {
		...sharedText,
	},
	inputContainer: {
		...flexRow, ...alignItemsCenter,
		columnGap: hp('1%'), ...border,
		padding: hp('0.3%'),
		borderRadius: hp('2.5%'),
		paddingLeft: hp('1%'),
		borderColor: greyMuted,
	},
	inputLeftIcon: {
		...sharedIcon,
	},
	inputRightIconContainer: {
		backgroundColor: yellow, padding: hp('1%'), borderRadius: hp('5%'),
	},
	inputRightIcon: {
		...sharedIcon,
	},
	inputStyle: {
		...fts1_6,
		flex: 1,
		height: isIOS ? h3_7.height : undefined,
		fontFamily: 'Inter-Regular',
		color: blackText,
		fontWeight: '400',
	},
	chatContainer: {
		rowGap: hp('3%'),
	},
	bar: {
		backgroundColor: yellowLight,
		height: hp('0.6%'),
		width: wp('12%'),
		borderRadius: hp('2%'),
		alignSelf: 'center',
		marginBottom: hp('1.8%'),
	},
	heading: {
		color: blackText, ...fts2_6, alignSelf: 'flex-start', marginVertical: hp('2%'), ...fontBold,
	},
	modal: {
		...bgPrimary, borderTopLeftRadius: hp('2%'), borderTopRightRadius: hp('2%'), padding: hp('3.5%'),
	},
	rowGap: {
		paddingLeft: hp('5%'), rowGap: hp('1.5%'), marginTop: hp('1%'),
	},
	row: {
		...flexRow, ...alignItemsCenter, columnGap: hp('1%'),
	},
	circle: {
		backgroundColor: yellowLight, width: hp('3.5%'), height: hp('3.5%'), borderRadius: hp('5%'), ...flexCenter,
	},
	question: {
		...sharedText, color: blackText, paddingLeft: hp('5%'), marginTop: hp('1%'),
	},
});
