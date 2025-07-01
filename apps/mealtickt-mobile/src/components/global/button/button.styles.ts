import { StyleSheet } from 'react-native';
import { colors, commonStyles } from '../../../utils/styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { buttonInterface } from './button.props';
import { isTablet } from 'utils/helpers.ts';

const { alignItemsCenter, fts1_8 } = commonStyles;
const { black, yellow } = colors;

export const buttonStyles = (mode: buttonInterface) =>
	StyleSheet.create({
		button: {
			backgroundColor: yellow,
			paddingVertical: hp(isTablet ? '1.5%' : '1.85%'),
			borderRadius: hp('2.2%'),
			width: mode.type === 'large' ? wp('92%') : wp('48%'), ...alignItemsCenter,
		},
		inActive: {
			opacity: 0.5,
		},
		buttonText: {
			color: black, ...fts1_8, fontFamily: 'Inter-SemiBold',
		},
		leftIcon: {
			height: hp('2.7%'), width: hp('2.7%'), tintColor: black,
		},
	});
