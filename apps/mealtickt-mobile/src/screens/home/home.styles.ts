import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles.ts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { w90, wh100, dFlex, flex1, flexCenter, bgPrimary, h0_5, w75, fts1_4 } = commonStyles;
const { blackText, yellowLight, neutrals } = colors;

// Define the styles for the OnboardingScreen component
export const styles = StyleSheet.create({
	container: {
		...wh100, ...dFlex, ...flex1, ...bgPrimary,
	},
	weekDaysContainer: {
		...w75,
	},
	toggleContainer: {
		...w90, alignSelf: 'center', borderWidth: 0, backgroundColor: yellowLight, borderRadius: hp('5%'),
	},
	itemsStyles: {
		paddingVertical: hp('1.5%'), borderRadius: hp('5%'),
	},
	scrollView: {
		paddingBottom: hp('2%'),
	},
});
