import { StyleSheet } from 'react-native';
import { colors, commonStyles } from 'utils/styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { flex1, paddingX4, w100, fts1_9 } = commonStyles;
const { blackText, red } = colors;

export const styles = StyleSheet.create({
    container: {
        ...flex1,
        ...paddingX4,
        ...w100,
        paddingTop: hp('3%'),
        position: 'relative',
    },
    item: {
        paddingVertical: hp('0.7%'),
    },
    searchContainer: {
        marginVertical: hp('2%'),
        ...flex1,
    },
    itemText: {
        ...fts1_9,
        color: blackText,
    },
    lowerContainer: {
        marginTop: hp('1.8%'),
        rowGap: hp('1%'),
    },
    btn: {
        marginTop: hp('2%'),
    },
    errorText: {
        color: red || 'red',
        fontSize: hp('1.5%'),
        marginBottom: hp('0.8%'),
        marginTop: hp('-0.4%'),
    },
    inputContainer: {
        marginBottom: hp('1%'),
    },
});
