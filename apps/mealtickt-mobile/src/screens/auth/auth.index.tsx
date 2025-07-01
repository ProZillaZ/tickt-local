import { Text, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './auth.styles';
import { useAuth } from './use-auth.ts';
import { slides } from './auth.props';
import Toggle from 'components/global/toggle/toggle.index';
import AuthenticateThrough from 'components/auth/auth-option/option.index';
import LoadingIndicator from 'utils/loading-indicator.tsx';

const AuthScreen = () => {
    const {
        withEmail,
        currentIndex,
        toggleOptions,
        renderItem,
        handleToggle,
        handleAuthPress,
        loading,
    } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/mealtickt-lightcream-web.png')}
                />
                <Text style={styles.text}>your personalised meal plan is 1 minute away.</Text>
                <Toggle
                    itemStyles={styles.itemStyles}
                    options={toggleOptions}
                    value={currentIndex}
                    onPress={(text) => handleToggle(text)}
                />
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        {!withEmail && (
                            <AuthenticateThrough onPress={(id) => handleAuthPress(String(id))} />
                        )}
                        {withEmail &&
                            slides?.map((item, idx) => (
                                <React.Fragment key={idx}>{renderItem(item, idx)}</React.Fragment>
                            ))}
                    </>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default AuthScreen;
