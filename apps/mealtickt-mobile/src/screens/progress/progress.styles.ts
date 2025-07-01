import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { w100, wh100, dFlex, flex1, flexCenter, bgPrimary, h0_5, w60, fts1_4, w90, fts1_8, fontRegular } = commonStyles;
const { blackText, yellowLight, black_60 } = colors;

export const styles = StyleSheet.create({
	container: {
		...flex1, ...bgPrimary, ...flexCenter, paddingHorizontal: wp('4%'),
	},
	heading: {
		...fts1_8, ...fontRegular, color: black_60, textAlign: 'center',
	},
});
