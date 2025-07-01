import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isTablet } from 'utils/helpers.ts';

const { wh100, dFlex, flex1, w90, bgPrimary, resizeContain, fts1_7, fontRegular, alignItemsCenter } = commonStyles;
const { black, blackText } = colors;

export const styles = StyleSheet.create({
	container: {
		...wh100, ...dFlex, ...flex1, ...bgPrimary, ...alignItemsCenter,
	},
	scrollview: {
		...alignItemsCenter,
		paddingVertical: hp('4%'),

	},
	logo: {
		height: hp('17%'), width: hp('17%'), ...resizeContain, tintColor: black, marginTop: hp('6%'),
	},
	itemStyles: {
		width: isTablet ? '48.6%' : '48%',
	},
	text: {
		...fts1_7, color: blackText, ...fontRegular, marginTop: hp('-3%'), marginBottom: hp('4%'),
	},
});
