import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { marginBottom2, marginBottom4, fw3, textCenter, fts3, fts1_8 } = commonStyles;
const { blackText, black_60 } = colors;

export const styles = StyleSheet.create({
	titleContainer: {
		...marginBottom2,
	},
	title: {
		...fts3, ...marginBottom4, ...textCenter, color: black_60, fontFamily: 'Inter-Bold',
	},
	description: {
		...fts1_8, color: blackText, lineHeight: hp('2.5%'), fontFamily: 'Inter-Regular',
	},
});
