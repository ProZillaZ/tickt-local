import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const { resizeContain } = commonStyles;
const { black_60, yellow } = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		backgroundColor: yellow,
		padding: hp('1.5%'),
		borderRadius: hp('5%'),
		alignSelf: 'flex-start',
		marginTop: isIOS ? 0 : hp('1%'),
	},
	icon: {
		width: hp('2%'), height: hp('2%'), ...resizeContain, tintColor: black_60,
	},

});
