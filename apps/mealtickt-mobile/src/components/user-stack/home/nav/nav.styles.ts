import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	w100,
	flexRow,
	justifyContentBetween,
	bgTransparent,
	resizeContain,
	alignItemsCenter,
	bgPrimary,
} = commonStyles;
const { black, blackText, black_60, yellowLight } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...flexRow, ...justifyContentBetween, ...alignItemsCenter, ...bgTransparent, ...w100,
		paddingHorizontal: wp('2%'),
		paddingVertical: hp('1%'),
	},
	profileLogoContainer: {
		backgroundColor: yellowLight, padding: hp('1.5%'), borderRadius: hp('6%'),
	},
	profileLogo: {
		height: hp('2%'), width: hp('2%'), ...resizeContain, tintColor: black_60,
	},
	logo: {
		width: 100, height: hp('2.53%'), ...resizeContain, tintColor: black, marginLeft: hp('-1%'),
	},
	crossbtn: {
		width: hp('2.63%'), height: hp('2.63%'), ...resizeContain, tintColor: blackText,
	},
});
