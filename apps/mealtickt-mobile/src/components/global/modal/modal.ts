import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isTablet } from 'utils/helpers.ts';

const { rounded2, dFlex, alignItemsEnd, justifyContentEnd } = commonStyles;
const { grey, black_60, primary } = colors;

export const styles = StyleSheet.create({
	container: {
		width: wp('90%'), backgroundColor: primary, elevation: 9, ...rounded2,
	},
	header: {
		position: 'absolute',
		width: isTablet ? wp('88%') : wp('86%'),
		marginTop: isTablet ? wp('2.5%') : wp('4%'), ...dFlex, ...alignItemsEnd, ...justifyContentEnd,
	},
	crossIcon: {
		width: hp('2.5%'), height: hp('2.4%'), resizeMode: 'contain', tintColor: black_60,
	},
});
