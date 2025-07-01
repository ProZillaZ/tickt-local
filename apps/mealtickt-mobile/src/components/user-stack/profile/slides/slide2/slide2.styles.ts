import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { flex1, paddingX4, w100, resizeContain, flexRow, alignItemsCenter, fontBold, fts2_6, fts1_8 } = commonStyles;
const { blackText, black_60 } = colors;
const row = { ...flexRow, ...alignItemsCenter };
const sharedIcon = { width: hp('2.3%'), height: hp('2.3%'), ...resizeContain, tintColor: blackText };

export const styles = StyleSheet.create({
	headerContainer: {
		...flex1, ...paddingX4, ...w100, position: 'relative',
	},
	icon: {
		...sharedIcon,
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
	item: {
		paddingVertical: hp('0.7%'),
	},
	searchContainer: {
		marginVertical: hp('2%'), height: hp('30%'),
	},
	itemText: {
		...fts1_8, color: blackText, fontFamily: 'Inter-Regular',
	},
	avoid: {
		...fts1_8, color: blackText, fontFamily: 'Inter-Regular',
	},
});
