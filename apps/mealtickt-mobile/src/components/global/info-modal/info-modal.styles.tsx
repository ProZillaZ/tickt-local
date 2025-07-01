import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { justifyContentStart, fts1_5, fts1_7 } = commonStyles;
const { black_60, blackText } = colors;

const styles = StyleSheet.create({
	container: {
		padding: hp('2%'), marginTop: hp('3%'),
	},
	heading: {
		...justifyContentStart, ...fts1_5, color: black_60, fontFamily: 'Inter-Bold',
	},
	description: {
		...justifyContentStart, ...fts1_7,
		color: blackText,
		fontFamily: 'Inter-Regular',
		marginTop: 10,
		lineHeight: hp('2.33%'),
	},
});

export default styles;
