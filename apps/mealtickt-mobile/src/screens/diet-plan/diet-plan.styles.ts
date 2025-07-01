import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isIOS } from 'utils/helpers.ts';

const {
	w100,
	w95,
	paddingX4,
	flex1,
	bgPrimary,
	flexRow,
	alignItemsCenter,
	resizeContain,
	fontBold,
	fontRegular,
	fts3_5,
} = commonStyles;
const { blackText, yellowLight, black_60 } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const sharedIcon = { width: hp('2.63%'), height: hp('2.63%'), ...resizeContain, tintColor: blackText };

export const styles = StyleSheet.create({
	container: {
		...flex1, ...w100, position: 'relative', ...bgPrimary,
	},
	icon: {
		...sharedIcon, alignSelf: 'flex-end', marginRight: wp('4%'), marginTop: isIOS ? 0 : hp('1%'),
	},
	profileLogoContainer: {
		backgroundColor: yellowLight, padding: hp('1%'), borderRadius: hp('6%'),
	},
	profileLogo: {
		height: hp('2%'), width: hp('2%'), ...resizeContain, tintColor: black_60,
	},
	headingContainer: {
		...row, columnGap: hp('1%'), marginVertical: hp('5%'), marginHorizontal: wp('4%'),
	},
	title: {
		...fontBold, ...fts3_5, color: black_60,
	},
	radio: {
		marginTop: hp('3%'), ...paddingX4,
	},
	scrollview: {
		paddingBottom: hp('2%'),
	},
	day: {
		...paddingX4,
	},
	button: {
		...w95, alignSelf: 'center', marginTop: hp('2%'),
	},
});
