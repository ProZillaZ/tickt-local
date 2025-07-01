import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const {
	flexRow,
	resizeContain,
	alignItemsCenter,
	justifyContentBetween,
	justifyContentCenter,
	bgTransparent,
	w100,
	fts1_5,
	fts1_7,
	fontRegular,
} = commonStyles;
const { blackText, black_60, neutrals, yellowLight, yellowDark } = colors;
const border = { borderWidth: 1, borderColor: neutrals };

export const styles = StyleSheet.create({
	headerContainer: {
		...bgTransparent, ...w100, paddingHorizontal: wp('4%'), rowGap: hp('1%'), marginTop: hp('2.5%'),
	},
	container: {
		...flexRow, ...alignItemsCenter, ...justifyContentCenter,
		columnGap: hp('0.41%'), ...border,
		paddingVertical: hp('2%'),
		borderRadius: hp('1.5%'),
		width: '15%',
	},
	containerActive: {
		backgroundColor: yellowLight, borderColor: yellowDark,
	},
	icon: {
		width: hp('2.5%'), height: hp('2.5%'), ...resizeContain, tintColor: blackText,
	},
	text: {
		...fts1_5, ...fontRegular, color: blackText,
	},
	items: {
		...flexRow, ...alignItemsCenter, ...justifyContentBetween,
	},
	label: {
		...fts1_7, ...fontRegular, color: black_60,
	},
});
