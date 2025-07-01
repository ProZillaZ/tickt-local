import { commonStyles } from 'utils/styles';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { alignItemsCenter, flexRow } = commonStyles;

export const styles = StyleSheet.create({
	container: { ...flexRow, ...alignItemsCenter, columnGap: 8, rowGap: 8, flexWrap: 'wrap', marginVertical: hp('2%') },
});
