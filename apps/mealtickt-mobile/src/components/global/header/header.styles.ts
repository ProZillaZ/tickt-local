import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { isIOS } from 'utils/helpers.ts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { w100, flexRow, justifyContentBetween, bgTransparent, resizeContain } = commonStyles;
const { black, blackText } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...flexRow, ...justifyContentBetween, ...bgTransparent, ...w100,
		top: isIOS ? 0 : 10,
		zIndex: 99,
		paddingHorizontal: wp('4%'),
	},
	logo: {
		width: 100, height: hp('2.53%'), ...resizeContain, tintColor: black,
	},
	crossbtn: {
		width: hp('2.63%'), height: hp('2.63%'), ...resizeContain, tintColor: blackText,
	},
});
