import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flex1,
	paddingX4,
	w100,
	resizeContain,
	fts2_6,
	fontBold,
	flexRow,
	alignItemsCenter,
	fontRegular,
	fts1_8,
} = commonStyles;
const { black_60, blackText } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const text = { ...fontRegular, ...fts1_8, color: black_60 };

export const styles = StyleSheet.create({
	headerContainer: {
		...flex1, ...paddingX4, ...w100, position: 'relative',
	},
	profileLogo: {
		height: hp('2.8%'), width: hp('2.8%'), ...resizeContain, tintColor: black_60,
	},
	headingContainer: {
		...row, columnGap: hp('0.7%'), marginTop: hp('5%'), marginBottom: hp('1%'),
	},
	title: {
		...fontBold, ...fts2_6, color: black_60,
	},
	inputCardIconContainer: {
		...row, columnGap: hp('0.6%'),
	},
	inputCardIcon: {
		height: hp('2.5%'), width: hp('2.5%'), ...resizeContain, tintColor: black_60,
	},
	systemText2: {
		...text, color: blackText,
	},
	inputContainer: {
		rowGap: hp('1.5%'), marginTop: hp('4%'), marginBottom: hp('1.5%'),
	},
	button: {
		marginTop: hp('4%'),
	},
});
