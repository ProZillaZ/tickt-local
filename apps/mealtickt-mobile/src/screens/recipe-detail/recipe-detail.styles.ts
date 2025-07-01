import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const { w100, wh100, dFlex, flex1, flexCenter, bgPrimary, h0_5, w60, fts1_4, w90, fts2_8, fontBold } = commonStyles;
const { blackText, yellowLight, black_60 } = colors;

// Define the styles for the OnboardingScreen component
export const styles = StyleSheet.create({
	container: {
		...wh100, ...dFlex, ...flex1, ...bgPrimary, position: 'relative',
	},
	scrollview: {
		paddingBottom: hp('2%'),
	},
	image: {
		width: wp('100%'),
		height: hp('60%'),
		resizeMode: 'cover',
		borderBottomLeftRadius: hp('2%'),
		borderBottomRightRadius: hp('2%'),
	},
	backButton: {
		position: 'absolute', left: wp('4%'), top: isIOS ? hp('6%') : hp('2%'),
	},
	toggle: {
		...w90, alignSelf: 'center', borderWidth: 0, backgroundColor: yellowLight, borderRadius: hp('5%'),
	},
	itemStyle: {
		paddingVertical: hp('1.5%'), borderRadius: hp('5%'),
	},
	heading: {
		...fts2_8, ...fontBold,
		marginHorizontal: wp('4%'),
		marginTop: hp('4%'),
		marginBottom: hp('3%'),
		color: black_60,
	},
});
