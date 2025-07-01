import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	flexCenter,
	justifyContentBetween,
	alignItemsCenter,
	bgTransparent,
	w100,
	fontRegular,
	fts1_6,
	fts1_5,
} = commonStyles;
const { blackText, greyMuted, black_60 } = colors;
const border = { borderWidth: 1, borderRadius: hp('2%') };
const sharedText = { ...fts1_5, ...fontRegular, color: black_60 };
const sharedIcon = { width: hp('2.6%'), height: hp('2.6%'), tintColor: black_60 };

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'), marginTop: hp('2.5%'),
	},
	headText: {
		...fts1_6, ...fontRegular, color: blackText, textAlign: 'center', fontWeight: 'light',
	},
	aiOptContainer: {
		...flexRow, ...flexCenter, ...bgTransparent,
		borderWidth: 1,
		borderColor: greyMuted,
		borderRadius: hp('10%'),
		paddingVertical: hp('1%'),
		paddingHorizontal: wp('4%'),
	},
	optContainer: {
		flexWrap: 'wrap', ...flexRow, gap: hp('1%'), marginTop: hp('2.5%'),
	},
	aiOptText: {
		...sharedText,
	},
	confirm: {
		marginTop: hp('4%'),
	},
});
