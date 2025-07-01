import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { neutrals, blackText, greyMuted } = colors;
const { paddingTop2, flexRow, gap4, alignItemsCenter, flexCenter, fts1_8, fts1_6 } = commonStyles;

export const styles = StyleSheet.create({
	container: {
		...paddingTop2,
	},
	toggleContainer: {
		...flexRow, ...gap4, marginLeft: 2,
	},
	toggleButton: {
		...flexRow, ...alignItemsCenter, paddingVertical: hp('0.51%'), paddingHorizontal: wp('0.4'),
	},
	toggleText: {
		...fts1_6, color: blackText, marginLeft: wp('1%'), fontFamily: 'Inter-Regular',
	},
	selectedToggleText: {
		color: blackText, fontFamily: 'Inter-Regular',
	},
	radioCircle: {
		height: hp('1.9%'),
		width: hp('1.9%'),
		borderRadius: hp('1.9%'),
		borderWidth: 2,
		borderColor: neutrals, ...flexCenter,
		 
	},
	selectedRadio: {
		height: hp('0.9%'), width: hp('0.9%'), borderRadius: hp('0.9%'), backgroundColor: greyMuted,
	},
	radioCircleSelected: {
		borderColor: greyMuted, 
	},
	title: {
		alignSelf: 'flex-start', ...fts1_8, marginBottom: 10, color: blackText, fontFamily: 'Inter-Regular',
	},
});
