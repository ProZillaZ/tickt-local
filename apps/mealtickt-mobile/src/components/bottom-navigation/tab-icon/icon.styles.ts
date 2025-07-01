import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const { alignItemsCenter, justifyContentCenter, fts1_6, fontRegular, fontBold } = commonStyles;
const { primary } = colors;
export const styles = StyleSheet.create({
	icon: {
		width: hp('2.5%'), height: hp('2.5%'), tintColor: primary, resizeMode: 'contain',
	},
	iconId: {
		width: hp('2.3%'), height: hp('2.3%'), tintColor: primary, resizeMode: 'contain', marginBottom: hp('0%'),
	},
	text: {
		color: primary, ...fts1_6, ...fontRegular,
	},
	activeText: {
		...fontBold,
	},
	container: {
		paddingVertical: hp('0.5%'),
		marginHorizontal: hp('0.5%'),
		marginTop: isIOS ? hp('1.5%') : hp('0.5%'), ...alignItemsCenter, ...justifyContentCenter,
		rowGap: hp('0.5%'),
	},
});
