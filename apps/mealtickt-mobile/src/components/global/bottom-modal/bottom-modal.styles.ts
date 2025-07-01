import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { flexRow, justifyContentBetween, alignItemsCenter, bgTransparent, w100 } = commonStyles;
const { white } = colors;

export const styles = StyleSheet.create({
	modal: {
		justifyContent: 'flex-end', margin: 0, flex: 1,
	},
	keyboardView: {
		flex: 1,
	},
	content: {
		width: wp('100%'), backgroundColor: white, borderTopLeftRadius: 10, borderTopRightRadius: 10,
	},
});
