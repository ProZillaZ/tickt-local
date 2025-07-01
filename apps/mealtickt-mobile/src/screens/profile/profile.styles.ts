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
});
