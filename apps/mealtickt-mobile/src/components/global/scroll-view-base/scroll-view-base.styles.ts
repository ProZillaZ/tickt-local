import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { flexRow, justifyContentBetween, alignItemsCenter, bgTransparent, w100 } = commonStyles;
const {} = colors;

export const styles = StyleSheet.create({
	headerContainer: {
		...flexRow, ...justifyContentBetween, ...alignItemsCenter, ...bgTransparent, ...w100,
		paddingHorizontal: wp('4%'),
	},
});
