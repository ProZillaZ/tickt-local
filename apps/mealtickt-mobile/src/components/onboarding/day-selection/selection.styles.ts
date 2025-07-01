import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const {
	paddingY1_3,
	flexRow,
	justifyContentBetween,
	alignItemsCenter,
	marginBottom2,
	flex1,
	w100,
	fts1_8,
	fts1_7,
} = commonStyles;
const { greyMuted, black_60, blackText, yellowLight, yellowDark } = colors;

export const styles = StyleSheet.create({
	container: {
		...paddingY1_3,
	},
	headerContainer: {
		...flexRow, ...justifyContentBetween, ...alignItemsCenter, ...marginBottom2,
	},
	title: {
		...fts1_8, color: black_60, ...flex1, fontFamily: 'Inter-Regular',
	},
	daysContainer: {
		...flexRow, ...justifyContentBetween,
	},
	dayButton: {
		paddingVertical: hp('2%'),
		borderRadius: 8,
		borderWidth: 1,
		borderColor: greyMuted,
		minWidth: wp('11%'), ...alignItemsCenter,
	},
	selectedDayButton: {
		backgroundColor: yellowLight, borderColor: yellowDark,
	},
	dayText: {
		color: blackText, ...fts1_7, fontFamily: 'Inter-Regular',
	},
	selectedDayText: {
		color: black_60,
	},
	info: {
		height: hp('2.3%'), width: hp('2.3%'), resizeMode: 'contain', tintColor: black_60, marginTop: -5,
	},
});
