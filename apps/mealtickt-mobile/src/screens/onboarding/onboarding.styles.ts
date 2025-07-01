import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles.ts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { w100, wh100, dFlex, flex1, flexCenter, bgPrimary, h0_5, w60, fts1_4 } = commonStyles;
const { blackText, yellowLight, neutrals } = colors;

// Define the styles for the OnboardingScreen component
export const styles = StyleSheet.create({
	container: {
		...wh100, ...dFlex, ...flex1, ...flexCenter, ...bgPrimary,
	},
	progressContainer: {
		...w60, ...h0_5, backgroundColor: yellowLight, borderRadius: 5, marginTop: hp('4%'),
	},
	progressBar: {
		...h0_5, backgroundColor: neutrals, borderRadius: hp('10%'),
	},
	progressText: {
		color: blackText, textAlign: 'center', ...fts1_4, marginTop: hp('2%'), fontFamily: 'Inter-Regular',
	},
	titleStyle: {
		paddingHorizontal: hp('1%'),
	},
});
