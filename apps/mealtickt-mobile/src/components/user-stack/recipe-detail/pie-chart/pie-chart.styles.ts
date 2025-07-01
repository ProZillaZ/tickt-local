import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { flexRow, justifyContentBetween, alignItemsCenter, bgTransparent, w100 } = commonStyles;
const {} = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, marginTop: hp('4%'),
	},
	chart: {
		height: hp('20%'), marginRight: wp('10%'), position: 'relative',
	},
	tail: {
		position: 'absolute',
		resizeMode: 'contain',
		height: hp('0.3%'),
		width: hp('2%'),
		left: wp('43%'),
		top: hp('0.45%'),
		backgroundColor: 'orange',
		transform: [{ rotate: '90deg' }],
	},
	tail2: {
		position: 'absolute',
		resizeMode: 'contain',
		height: hp('0.3%'),
		width: hp('10%'),
		left: wp('23.5%'),
		top: hp('1.3%'),
		backgroundColor: 'orange',
	},
});
