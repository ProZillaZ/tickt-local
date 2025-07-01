import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flex1, paddingX4, w100, fts1_9, flexRow, alignItemsCenter, justifyContentBetween, fts1_6 } = commonStyles;
const { blackText, black_60, red, yellow } = colors;

export const styles = StyleSheet.create({
	container: {
		...flex1, ...paddingX4, ...w100, paddingTop: hp('5%'),
	},
	item: {
		paddingVertical: hp('0.7%'),
	},
	searchContainer: {
		marginVertical: hp('2%'), ...flex1,
	},
	itemText: {
		...fts1_9, color: blackText,
	},
	lowerContainer: {
		marginTop: hp('1.8%'),
	},
	estimatedContainer: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween, marginTop: hp('1.5%'),
	},
	estTitle: { color: black_60, fontFamily: 'Inter-Regular', fontWeight: '400', ...fts1_6 },
	btn: { marginTop: hp('5%') },
	errorText: {
		color: red,
		fontSize: hp('1.5%'),
		marginTop: hp('0.5%'),
		marginLeft: hp('0.5%'),
	},
	inputContainer: {
		marginBottom: hp('1%'),
	},
	// Weight display styles
	weightContainer: {
		borderWidth: 1,
		borderColor: '#E3E3E3',
		borderRadius: 15,
		padding: hp('1.5%'),
	},
	weightLabelContainer: {
		...flexRow,
		...alignItemsCenter,
		...justifyContentBetween,
		marginBottom: hp('0.5%'),
	},
	weightLabel: {
		color: black_60,
		fontSize: hp('1.6%'),
		fontFamily: 'Inter-Regular',
	},
	weightValue: {
		color: blackText,
		fontSize: hp('1.8%'),
		fontFamily: 'Inter-Regular',
		fontWeight: '500',
		paddingHorizontal: hp('2%'),
	},
	infoButton: {
		width: hp('2%'),
		height: hp('2%'),
		borderRadius: hp('1%'),
		backgroundColor: '#E3E3E3',
		color: black_60,
		textAlign: 'center',
		lineHeight: hp('2%'),
		fontSize: hp('1.4%'),
		overflow: 'hidden',
	},
	// Weight adjustment styles
	weightAdjustContainer: {
		...flexRow,
		...alignItemsCenter,
		...justifyContentBetween,
		marginVertical: hp('1%'),
	},
	adjustButton: {
		width: hp('3%'),
		height: hp('3%'),
		borderRadius: hp('1.5%'),
		backgroundColor: yellow,
		...alignItemsCenter,
		...justifyContentBetween,
		alignItems: 'center',
		justifyContent: 'center',
	},
	adjustButtonDisabled: {
		opacity: 0.5,
	},
	adjustButtonText: {
		fontSize: hp('2%'),
		color: blackText,
	},
	adjustmentText: {
		color: black_60,
		fontSize: hp('1.4%'),
		textAlign: 'center',
		fontStyle: 'italic',
	},
});
