import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flex1, paddingX4, w100, fts1_8 } = commonStyles;
const { blackText } = colors;

export const styles = StyleSheet.create({
	container: {
		...flex1, ...paddingX4, ...w100, paddingTop: hp('5%'),
	},
	item: {
		paddingVertical: hp('0.7%'),
	},
	searchContainer: {
		marginVertical: hp('2%'), maxHeight: hp('45%'),
	},
	itemText: {
		...fts1_8, color: blackText, fontFamily: 'Inter-Regular',
	},
});
