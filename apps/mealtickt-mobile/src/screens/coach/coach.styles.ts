import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles.ts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { w90, wh100, dFlex, flex1, flexCenter, bgPrimary, h0_5, w60, fts1_4, fontBold, fts3_5 } = commonStyles;
const { blackText, yellowLight, neutrals, black_60 } = colors;

export const styles = StyleSheet.create({
	container: {
		...wh100, ...dFlex, ...flex1, ...bgPrimary,
	},
	toggleContainer: {
		...w90, alignSelf: 'center', borderWidth: 0, backgroundColor: yellowLight, borderRadius: hp('5%'),
	},
	itemsStyles: {
		paddingVertical: hp('1.5%'), borderRadius: hp('5%'),
	},
	contentContainer: {
		marginTop: hp('1%'), paddingHorizontal: wp('4%'), marginBottom: hp('5%'),
	},
	contentTitle: {
		textAlign: 'left', marginBottom: hp('1%'), ...fontBold, ...fts3_5, color: black_60,
	},
	contentDescription: {
		...fts1_4,
	},
});
