import { colors } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const { black_60 } = colors;
export const styles = StyleSheet.create({
	tabStyles: {
		backgroundColor: black_60,
		height: isIOS ? hp('9%') : hp('7.5%'),
		borderTopWidth: 0,

	},
});
