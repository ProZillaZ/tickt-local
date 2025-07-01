import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { flexRow, justifyContentBetween, alignItemsCenter, fontRegular, w90, fts1_6 } = commonStyles;
const { yellow, black_60 } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...flexRow, ...justifyContentBetween, ...alignItemsCenter,
		backgroundColor: yellow, ...w90,
		marginTop: hp('3%'),
		paddingHorizontal: wp('4%'),
		paddingVertical: hp('2.8%'),
		borderRadius: hp('1.42%'),
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	textIconContainer: { ...flexRow, ...alignItemsCenter, columnGap: hp('1%'), flex: 0.88 },
	icon: { tintColor: black_60, width: hp('2.6%'), height: hp('2.6%') },
	textStyles: { color: black_60, ...fts1_6, ...fontRegular },
	actionButtonStyles: {},
	actionButonTextStyle: { color: black_60, textDecorationLine: 'underline', ...fts1_6, ...fontRegular },
});
