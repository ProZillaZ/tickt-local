import { Platform, StyleSheet } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const primary = '#F7F5EE';
// const primary = "#F7F5EE";
const blue = '#2B3674';
const pink = '#D066CE';
const white = '#fff';
const grey = 'grey';
const blueSoft = '#E8F2FF';
const blueLight = '#80BDF4';
const blueHeading = '#4D78DE';
const blueLightHeading = '#2ABFCB';
const greenLight = '#87EB9C';
const yellowLight = '#EAE5D4';
const yellowDark = '#A6A395';
const greenLight90 = '#E6F4E9';
const green = '#2B8234';
const redLight = '#FEE9E8';
const red = '#E13F46';
const blackText = '#505050';
const greyMuted = '#BFBCAC';
const black = '#000';
const yellow = '#F4C82D';
const black_40 = '#808080';
const black_50 = '#666';
const black_60 = '#323232';
const black_70 = '#333';
const neutrals = '#CECAB9';
const neutrals_200 = '#F4EBCF';
const accent_100 = '#F5E29F';
const accent_50 = '#CBC8C8';

export const colors = {
	primary,
	blue,
	pink,
	white,
	grey,
	blueSoft,
	blueLight,
	blueHeading,
	greenLight,
	yellowLight,
	yellowDark,
	greenLight90,
	green,
	red,
	redLight,
	blueLightHeading,
	blackText,
	greyMuted,
	black,
	yellow,
	black_50,
	black_70,
	neutrals,
	black_60,
	accent_100,
	black_40,
	accent_50,
	neutrals_200,
};

export const commonStyles = StyleSheet.create({
	wh5: { height: hp('5%'), width: wp('5%') },
	wh10: { height: hp('10%'), width: wp('10%') },
	wh15: { height: hp('15%'), width: wp('15%') },
	wh20: { height: hp('20%'), width: wp('20%') },
	wh25: { height: hp('25%'), width: wp('25%') },
	wh30: { height: hp('30%'), width: wp('30%') },
	wh35: { height: hp('35%'), width: wp('35%') },
	wh40: { height: hp('40%'), width: wp('40%') },
	wh45: { height: hp('45%'), width: wp('45%') },
	wh50: { height: hp('50%'), width: wp('50%') },
	wh55: { height: hp('55%'), width: wp('55%') },
	wh60: { height: hp('60%'), width: wp('60%') },
	wh65: { height: hp('65%'), width: wp('65%') },
	wh70: { height: hp('70%'), width: wp('70%') },
	wh75: { height: hp('75%'), width: wp('75%') },
	wh80: { height: hp('80%'), width: wp('80%') },
	wh85: { height: hp('85%'), width: wp('85%') },
	wh90: { height: hp('90%'), width: wp('90%') },
	wh95: { height: hp('95%'), width: wp('95%') },
	wh100: { height: hp('100%'), width: wp('100%') },
	w5: { width: wp('5%') },
	w10: { width: wp('10%') },
	w15: { width: wp('15%') },
	w20: { width: wp('20%') },
	w25: { width: wp('25%') },
	w30: { width: wp('30%') },
	w35: { width: wp('35%') },
	w40: { width: wp('40%') },
	w45: { width: wp('45%') },
	w50: { width: wp('50%') },
	w55: { width: wp('55%') },
	w60: { width: wp('60%') },
	w65: { width: wp('65%') },
	w70: { width: wp('70%') },
	w75: { width: wp('75%') },
	w80: { width: wp('80%') },
	w85: { width: wp('85%') },
	w88: { width: wp('88%') },
	w90: { width: wp('90%') },
	w95: { width: wp('95%') },
	w100: { width: wp('100%') },
	h0_5: { height: hp('0.5%') },
	h1: { height: hp('1%') },
	h3_7: { height: hp('3.75%') },
	h5: { height: hp('5%') },
	h10: { height: hp('10%') },
	h15: { height: hp('15%') },
	h20: { height: hp('20%') },
	h25: { height: hp('25%') },
	h30: { height: hp('30%') },
	h35: { height: hp('35%') },
	h40: { height: hp('40%') },
	h45: { height: hp('45%') },
	h50: { height: hp('50%') },
	h55: { height: hp('55%') },
	h60: { height: hp('60%') },
	h65: { height: hp('65%') },
	h70: { height: hp('70%') },
	h75: { height: hp('75%') },
	h80: { height: hp('80%') },
	h85: { height: hp('85%') },
	h90: { height: hp('90%') },
	h95: { height: hp('95%') },
	h100: { height: hp('100%') },
	px20: {
		paddingHorizontal: hp('2%'),
	},
	fontRegular: {
		fontFamily: 'Inter-Regular',
	},
	fontBold: {
		fontFamily: 'Inter-Bold',
	},
	flexContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	bgPrimary: {
		backgroundColor: primary,
	},
	bgTransparent: {
		backgroundColor: 'transparent',
	},
	bglight: {
		backgroundColor: '#f0f0f0',
	},
	textPrimary: {
		color: primary,
	},
	textMuted: {
		color: greyMuted,
	},
	textBlue: {
		color: blue,
	},
	textPink: {
		color: pink,
	},
	colorBlack: {
		color: '#000',
	},


	// All other classes
	textCenter: {
		textAlign: 'center',
	},
	flexCenter: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	flex1: {
		flex: 1,
	},
	padding0: {
		padding: 0,
	},
	padding1: {
		padding: 5,
	},
	padding2: {
		padding: 10,
	},
	padding3: {
		padding: 15,
	},
	padding4: {
		padding: 20,
	},
	padding5: {
		padding: 25,
	},
	paddingX: {
		paddingHorizontal: 0,
	},
	paddingX1: {
		paddingHorizontal: 5,
	},
	paddingX2: {
		paddingHorizontal: 10,
	},
	paddingX3: {
		paddingHorizontal: 15,
	},
	// paddingX4: {
	//     paddingHorizontal: 20
	// },
	paddingX5: {
		paddingHorizontal: 25,
	},
	paddingX10: {
		paddingHorizontal: 50,
	},
	paddingY0: {
		paddingVertical: 0,
	},
	paddingY1: {
		paddingVertical: 5,
	},
	paddingY2: {
		paddingVertical: 10,
	},
	// paddingY3: {
	//     // paddingVertical: 15,
	//     paddingVertical: hp('1.25%'),
	// },
	// paddingY4: {
	//     // paddingVertical: 20,
	//     paddingVertical: hp('1.7%'),
	// },
	paddingY5: {
		paddingVertical: 25,
	},
	// paddingX1: {paddingHorizontal: wp("1%")},
	// paddingX2: {paddingHorizontal: wp("2%")},
	// paddingX3: {paddingHorizontal: wp("3%")},
	paddingX4: { paddingHorizontal: wp('4%') },
	// paddingX5: {paddingHorizontal: wp("5%")},
	// paddingX6: {paddingHorizontal: wp("6%")},
	// paddingX7: {paddingHorizontal: wp("7%")},
	// paddingX8: {paddingHorizontal: wp("8%")},
	// paddingX9: {paddingHorizontal: wp("9%")},
	// paddingX10: {paddingHorizontal: wp("10%")},
	// paddingX11: {paddingHorizontal: wp("11%")},
	// paddingX12: {paddingHorizontal: wp("12%")},
	// paddingX13: {paddingHorizontal: wp("13%")},
	// paddingX14: {paddingHorizontal: wp("14%")},
	// paddingX15: {paddingHorizontal: wp("15%")},
	// paddingX16: {paddingHorizontal: wp("16%")},
	// paddingX17: {paddingHorizontal: wp("17%")},
	// paddingX18: {paddingHorizontal: wp("18%")},
	// paddingX19: {paddingHorizontal: wp("19%")},
	// paddingX20: { paddingHorizontal: wp('20%')},
	// paddingY1: {paddingVertical: hp("1%")},
	paddingY1_6: { paddingVertical: hp('1.6%') },
	paddingY1_3: { paddingVertical: hp('3%') },
	paddingY1_7: { paddingVertical: hp('4%') },
	// paddingY2: {paddingVertical: hp("2%")},
	// paddingY3: {paddingVertical: hp("3%")},
	// paddingY4: {paddingVertical: hp("4%")},
	// paddingY5: {paddingVertical: hp("5%")},
	// paddingY6: {paddingVertical: hp("6%")},
	// paddingY7: {paddingVertical: hp("7%")},
	// paddingY8: {paddingVertical: hp("8%")},
	// paddingY9: {paddingVertical: hp("9%")},
	// paddingY10: {paddingVertical: hp("10%")},
	// paddingY11: {paddingVertical: hp("11%")},
	// paddingY12: {paddingVertical: hp("12%")},
	// paddingY13: {paddingVertical: hp("13%")},
	// paddingY14: {paddingVertical: hp("14%")},
	// paddingY15: {paddingVertical: hp("15%")},
	// paddingY16: {paddingVertical: hp("16%")},
	// paddingY17: {paddingVertical: hp("17%")},
	// paddingY18: {paddingVertical: hp("18%")},
	// paddingY19: {paddingVertical: hp("19%")},
	// paddingY20: { paddingVertical: hp('20%')},
	margin0: {
		margin: 0,
	},
	margin1: {
		margin: 5,
	},
	margin2: {
		margin: 10,
	},
	margin3: {
		margin: 15,
	},
	margin4: {
		margin: 20,
	},
	margin5: {
		margin: 25,
	},
	marginX0: {
		marginHorizontal: 0,
	},
	marginX1: {
		marginHorizontal: 5,
	},
	marginX2: {
		marginHorizontal: 10,
	},
	marginX3: {
		marginHorizontal: 15,
	},
	marginX4: {
		marginHorizontal: 20,
	},
	marginX5: {
		marginHorizontal: 25,
	},
	marginY0: {
		marginVertical: 0,
	},
	marginY1: {
		marginVertical: 5,
	},
	marginY2: {
		marginVertical: 10,
	},
	marginY3: {
		marginVertical: 15,
	},
	marginY4: {
		marginVertical: 20,
	},
	marginY5: {
		marginVertical: 25,
	},
	// marginX1: {marginHorizontal: wp("1%")},
	// marginX2: {marginHorizontal: wp("2%")},
	// marginX3: {marginHorizontal: wp("3%")},
	// marginX4: {marginHorizontal: wp("4%")},
	// marginX5: {marginHorizontal: wp("5%")},
	// marginX6: {marginHorizontal: wp("6%")},
	// marginX7: {marginHorizontal: wp("7%")},
	// marginX8: {marginHorizontal: wp("8%")},
	// marginX9: {marginHorizontal: wp("9%")},
	// marginX10: {marginHorizontal: wp("10%")},
	// marginX11: {marginHorizontal: wp("11%")},
	// marginX12: {marginHorizontal: wp("12%")},
	// marginX13: {marginHorizontal: wp("13%")},
	// marginX14: {marginHorizontal: wp("14%")},
	// marginX15: {marginHorizontal: wp("15%")},
	// marginX16: {marginHorizontal: wp("16%")},
	// marginX17: {marginHorizontal: wp("17%")},
	// marginX18: {marginHorizontal: wp("18%")},
	// marginX19: {marginHorizontal: wp("19%")},
	// marginX20: { marginHorizontal: wp('20%')},
	// marginY1: {marginVertical: hp("1%")},
	// marginY2: {marginVertical: hp("2%")},
	// marginY3: {marginVertical: hp("3%")},
	// marginY4: {marginVertical: hp("4%")},
	// marginY5: {marginVertical: hp("5%")},
	// marginY6: {marginVertical: hp("6%")},
	// marginY7: {marginVertical: hp("7%")},
	// marginY8: {marginVertical: hp("8%")},
	// marginY9: {marginVertical: hp("9%")},
	// marginY10: {marginVertical: hp("10%")},
	// marginY11: {marginVertical: hp("11%")},
	// marginY12: {marginVertical: hp("12%")},
	// marginY13: {marginVertical: hp("13%")},
	// marginY14: {marginVertical: hp("14%")},
	// marginY15: {marginVertical: hp("15%")},
	// marginY16: {marginVertical: hp("16%")},
	// marginY17: {marginVertical: hp("17%")},
	// marginY18: {marginVertical: hp("18%")},
	// marginY19: {marginVertical: hp("19%")},
	// marginY20: { marginVertical: hp('20%')},
	border: {
		borderWidth: 1,
	},
	rounded0: {
		borderRadius: 0,
	},
	rounded1: {
		borderRadius: 5,
	},
	rounded2: {
		borderRadius: 10,
	},
	rounded3: {
		borderRadius: 15,
	},
	rounded4: {
		borderRadius: hp('5%'),
	},
	rounded5: {
		borderRadius: 25,
	},
	fts1: { fontSize: RFPercentage(1) },
	fts1_3: { fontSize: RFPercentage(1.3) },
	fts1_4: { fontSize: RFPercentage(1.4) },
	fts1_5: { fontSize: RFPercentage(1.5) },
	fts1_6: { fontSize: RFPercentage(1.6) },
	fts1_7: { fontSize: RFPercentage(1.7) },
	fts1_8: { fontSize: RFPercentage(1.8) },
	fts1_85: { fontSize: RFPercentage(1.85) },
	fts1_9: { fontSize: RFPercentage(1.9) },
	fts2: { fontSize: RFPercentage(2) },
	fts2_1: { fontSize: RFPercentage(2.1) },
	fts2_2: { fontSize: RFPercentage(2.2) },
	fts2_3: { fontSize: RFPercentage(2.3) },
	fts2_4: { fontSize: RFPercentage(2.4) },
	fts2_5: { fontSize: RFPercentage(2.5) },
	fts2_6: { fontSize: RFPercentage(2.6) },
	fts2_8: { fontSize: RFPercentage(2.8) },
	fts3: { fontSize: RFPercentage(3) },
	fts3_5: { fontSize: RFPercentage(3.5) },
	fts3_7: { fontSize: RFPercentage(3.7) },
	fts4: { fontSize: RFPercentage(4) },
	fts5: { fontSize: RFPercentage(5) },
	fts6: { fontSize: RFPercentage(6) },
	fts7: { fontSize: RFPercentage(7) },
	fts8: { fontSize: RFPercentage(8) },
	fts9: { fontSize: RFPercentage(9) },
	fts10: { fontSize: RFPercentage(10) },
	fts11: { fontSize: RFPercentage(11) },
	fts12: { fontSize: RFPercentage(12) },
	fts13: { fontSize: RFPercentage(13) },
	fts14: { fontSize: RFPercentage(14) },
	fts15: { fontSize: RFPercentage(15) },
	fts16: { fontSize: RFPercentage(16) },
	fts17: { fontSize: RFPercentage(17) },
	fts18: { fontSize: RFPercentage(18) },
	fts19: { fontSize: RFPercentage(19) },
	fts20: { fontSize: RFPercentage(20) },
	fs0: {
		fontSize: 14,
	},
	fs1: {
		fontSize: 16,
	},
	fs2: {
		fontSize: 18,
	},
	fs3: {
		fontSize: 21,
	},
	fs4: {
		fontSize: 24,
	},
	fs5: {
		fontSize: 26,
	},
	fs6: {
		fontSize: 27,
	},
	fw1: {
		fontWeight: '500',
	},
	fw2: {
		fontWeight: '600',
	},
	fw3: {
		fontWeight: '700',
	},
	fw4: {
		fontWeight: '800',
	},
	fw5: {
		fontWeight: '900',
	},
	marginTop0: {
		marginTop: 0,
	},
	marginTop1: {
		marginTop: 5,
	},
	marginTop2: {
		marginTop: 10,
	},
	marginTop3: {
		marginTop: 15,
	},
	marginTop4: {
		marginTop: 20,
	},
	marginTop5: {
		marginTop: 25,
	},
	marginBottom0: {
		marginBottom: 0,
	},
	marginBottom1: {
		marginBottom: 5,
	},
	marginBottom2: {
		marginBottom: 10,
	},
	marginBottom3: {
		marginBottom: 15,
	},
	marginBottom4: {
		marginBottom: hp('3.5%'),
		// marginBottom: 20,
	},
	marginBottom5: {
		marginBottom: 25,
	},
	marginLeft0: {
		marginLeft: 0,
	},
	marginLeft1: {
		marginLeft: 5,
	},
	marginLeft2: {
		marginLeft: 10,
	},
	marginLeft3: {
		marginLeft: 15,
	},
	marginLeft4: {
		marginLeft: 20,
	},
	marginLeft5: {
		marginLeft: 25,
	},
	marginRight0: {
		marginRight: 0,
	},
	marginRight1: {
		marginRight: 5,
	},
	marginRight2: {
		marginRight: 10,
	},
	marginRight3: {
		marginRight: 15,
	},
	marginRight4: {
		marginRight: 20,
	},
	marginRight5: {
		marginRight: 25,
	},
	paddingTop0: {
		paddingTop: 0,
	},
	paddingTop1: {
		paddingTop: 5,
	},
	paddingTop2: {
		// paddingTop: 10,
		paddingTop: hp('0.8%'),
	},
	paddingTop3: {
		paddingTop: 15,
	},
	paddingTop4: {
		paddingTop: 20,
	},
	paddingTop5: {
		paddingTop: 25,
	},
	paddingBottom0: {
		paddingBottom: 0,
	},
	paddingBottom1: {
		paddingBottom: 5,
	},
	paddingBottom2: {
		paddingBottom: 10,
	},
	paddingBottom3: {
		paddingBottom: 15,
	},
	paddingBottom4: {
		paddingBottom: 20,
	},
	paddingBottom5: {
		paddingBottom: 25,
	},
	paddingLeft0: {
		paddingLeft: 0,
	},
	paddingLeft1: {
		paddingLeft: 5,
	},
	paddingLeft2: {
		paddingLeft: 10,
	},
	paddingLeft3: {
		paddingLeft: 15,
	},
	paddingLeft4: {
		paddingLeft: 20,
	},
	paddingLeft5: {
		paddingLeft: 25,
	},
	paddingRight0: {
		paddingRight: 0,
	},
	paddingRight1: {
		paddingRight: 5,
	},
	paddingRight2: {
		paddingRight: 10,
	},
	paddingRight3: {
		paddingRight: 15,
	},
	paddingRight4: {
		paddingRight: 20,
	},
	paddingRight5: {
		paddingRight: 25,
	},
	dFlex: {
		display: 'flex',
	},
	justifyContentCenter: {
		justifyContent: 'center',
	},
	justifyContentStart: {
		justifyContent: 'flex-start',
	},
	justifyContentEnd: {
		justifyContent: 'flex-end',
	},
	justifyContentBetween: {
		justifyContent: 'space-between',
	},
	justifyContentAround: {
		justifyContent: 'space-around',
	},
	justifyContentEvenly: {
		justifyContent: 'space-evenly',
	},
	alignItemsCenter: {
		alignItems: 'center',
	},
	alignItemsStart: {
		alignItems: 'flex-start',
	},
	alignItemsEnd: {
		alignItems: 'flex-end',
	},
	flexRow: {
		flexDirection: 'row',
	},
	flexCol: {
		flexDirection: 'column',
	},
	flexRowR: {
		flexDirection: 'row-reverse',
	},
	flexColR: {
		flexDirection: 'column-reverse',
	},
	gap: {
		gap: 0,
	},
	gap1: {
		gap: 5,
	},
	gap2: {
		gap: 10,
	},
	gap3: {
		gap: 15,
	},
	gap4: {
		gap: 20,
	},
	textAlignCenter: {
		textAlign: 'center',
	},
	textAlignLeft: {
		textAlign: 'left',
	},
	textAlignRight: {
		textAlign: 'right',
	},
	bgWhite: {
		backgroundColor: '#fff',
	},
	bgShadow: {
		backgroundColor: '#fff',
	},
	bgShadowBlack: {
		backgroundColor: '#000',
	},
	shadow1: {
		elevation: 1,
	},
	shadow2: {
		elevation: 2,
	},
	shadow3: {
		elevation: 3,
	},
	shadow4: {
		elevation: 4,
	},
	shadow5: {
		elevation: 5,
	},
	positionAbsolute: {
		position: 'absolute',
	},
	positionRelative: {
		position: 'relative',
	},
	overflowHidden: {
		overflow: 'hidden',
	},
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.15,
		shadowRadius: 2.84,
		elevation: 3,
		backgroundColor: '#fff',
	},
	bottomBar: {
		position: 'absolute',
		backgroundColor: colors.white,
		elevation: 3,
		borderTopWidth: 0,
		height: Platform.OS === 'android' ? 80 : 90,
		paddingTop: Platform.OS === 'android' ? 5 : 15,
	},
	scrollView: {
		flex: 1,
		zIndex: 1000,
		paddingBottom: 30,
	},
	resizeContain: {
		resizeMode: 'contain',
	},
});
