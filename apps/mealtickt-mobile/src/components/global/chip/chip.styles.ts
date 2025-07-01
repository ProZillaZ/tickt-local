import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { greyMuted, yellowLight, blackText, black_60, yellowDark } = colors;
const {
	flexRow,
	gap2,
	fts1_5,
	paddingLeft1,
	paddingX3,
	paddingY2,
	rounded4,
	border,
	alignItemsCenter,
	dFlex,
	justifyContentEvenly,
} = commonStyles;

export const styles = StyleSheet.create({
	chipContainer: {
		...paddingX3, ...paddingY2, ...rounded4, ...border,
		borderColor: greyMuted, ...alignItemsCenter, ...dFlex, ...justifyContentEvenly, ...flexRow, ...gap2,
	},
	selectecdChipContainer: {
		backgroundColor: yellowLight, borderColor: yellowDark,
	},
	chipText: {
		color: blackText, ...fts1_5, ...paddingLeft1, fontFamily: 'Inter-Regular',
	},
	selectedChipText: {
		color: black_60,
	},
	crossIcon: {
		width: hp('1.85%'), height: hp('1.85%'), resizeMode: 'contain', tintColor: black_60,
	},
	selectedCrossIcon: {
		display: 'none',
	},
});
