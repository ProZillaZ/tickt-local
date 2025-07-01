import { View, Text, Image } from 'react-native';
import React from 'react';
import { styles } from './loading.styles';
import ReactNativeModal from 'react-native-modal';
import { LoadingModalProps } from './loading.props';
import LottieView from 'lottie-react-native';
import { loadingAnimation } from 'app/constants/constants';
import LoadingIndicator from 'utils/loading-indicator.tsx';

const LoadingModalFull: React.FC<LoadingModalProps> = ({
    visible,
    title,
    description,
    titleStyle,
}) => {
    return (
        <ReactNativeModal
            hideModalContentWhileAnimating
            animationIn="slideInRight"
            animationOut="slideOutLeft"
            style={styles.container}
            isVisible={visible}
            backdropColor="rgba(0,0,0,0.2)">
            <View style={styles.subContainer}>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/images/mealtickt-lightcream-web.png')}
                />
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        marginTop:'24%'

                    }}>
                    <LoadingIndicator />
                    <Text style={[styles.title, titleStyle, { marginTop: 0 }]}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        </ReactNativeModal>
    );
};

export default LoadingModalFull;
