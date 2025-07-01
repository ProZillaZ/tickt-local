import { colors, commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flexRow, alignItemsCenter, fontRegular, fontBold, fts1_4, w60 } = commonStyles;
const { neutrals, blackText, yellow, black_60 } = colors;
export const styles = StyleSheet.create({
	container: {
		...flexRow, ...alignItemsCenter,
		columnGap: hp('1%'),
		borderWidth: 1,
		borderColor: neutrals,
		borderRadius: hp('3%'),
		padding: 4, ...w60,
	},
	item: {
		color: blackText, ...fontRegular, ...fts1_4,
	},
	itemActive: {
		...fontBold, color: black_60, ...fts1_4,
	},
	itemContainer: {
		...alignItemsCenter, paddingVertical: hp('1%'), borderRadius: hp('2%'),
	},
	itemContainerActive: {
		backgroundColor: yellow,
	},
});
