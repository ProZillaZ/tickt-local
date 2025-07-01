import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { black_40, neutrals, black_60 } = colors;
const {
	w80,
	justifyContentBetween,
	flexRow,
	alignItemsCenter,
	flex1,
	fontRegular,
	fontBold,
	fts1_4,
	resizeContain,
} = commonStyles;

export const styles = StyleSheet.create({
	container: {
		...w80, alignSelf: 'center', ...justifyContentBetween, ...flexRow, marginTop: hp('2%'), marginBottom: hp('2%'),
	},
	dayContainer: {
		...flex1, ...alignItemsCenter, paddingVertical: hp('1.5%'),
	},
	day: {
		color: black_40, ...fontRegular, ...fts1_4,
	},
	dayStrikeThrough: {
		textDecorationLine: 'line-through',
	},
	activeDay: {
		color: black_60, ...fontBold,
	},
	borderBottomContainer: {
		position: 'absolute', bottom: 0, left: 0, right: 0, height: hp('0.1%'),
	},
	borderBottom: {
		position: 'absolute', bottom: 0, left: 0, width: '100%', height: hp('0.15%'), backgroundColor: neutrals,
	},
	activeBorder: {
		backgroundColor: black_60, height: hp('0.28%'),
	},
	icon: {
		width: hp('2.6%'), height: hp('2.6%'), ...resizeContain, tintColor: black_40,
	},
	iconActive: {
		tintColor: black_60,
	},
});
