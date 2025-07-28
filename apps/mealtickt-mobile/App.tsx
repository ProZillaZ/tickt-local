import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from 'app/navigation/navigation.index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardAvoidingView, StatusBar, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { commonStyles } from 'utils/styles';
import Toast from 'react-native-toast-message';
import { toastConfig } from 'utils/toast-config';
import { AuthProvider } from 'contexts/auth/auth';
import { isIOS } from 'utils/platform';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingProvider } from 'contexts/onboarding/onboarding-context';
import analytics, { logScreenView } from '@react-native-firebase/analytics';
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 1000, fade: true });
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';
import { analyticsMobile } from 'firebaseConfig';
mobileAds()
    .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.PG,

        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
    })
    .then(() => {
        // Request config successfully set!
    });
const App: React.FC = () => {
    const routeNameRef = useRef();
    const navigationRef = useRef();

    // Initialize React Query Client Configurations
    // Set default options for queries and mutations
    // Adjust stale time, retry attempts, and refetch behavior
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 40000,
                retry: 10,
                refetchOnWindowFocus: true,
                refetchOnReconnect: true,
                refetchOnMount: true,
            },
            mutations: {
                retry: 0,
            },
        },
    });
    // TEMPORARY: Clear onboarding data on app start
    useEffect(() => {
        const clearOnboardingData = async () => {
            try {
                await AsyncStorage.removeItem('onboarding');
                console.log('Onboarding data cleared for testing');
            } catch (error) {
                console.error('Failed to clear onboarding data:', error);
            }
        };

        clearOnboardingData();
    }, []);

    const [loaded, error] = useFonts({
        'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <GestureHandlerRootView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <KeyboardAvoidingView behavior={isIOS ? 'padding' : 'height'} style={styles.container}>
                <NavigationContainer
                    ref={navigationRef}
                    onReady={() => {
                        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
                    }}
                    onStateChange={async () => {
                        const previousRouteName = routeNameRef.current;
                        const currentRouteName = navigationRef.current.getCurrentRoute().name;

                        if (previousRouteName !== currentRouteName) {
                            await logScreenView(analyticsMobile, {
                                screen_name: currentRouteName,
                                screen_class: currentRouteName,
                            });
                        }
                        routeNameRef.current = currentRouteName;
                    }}>
                    <AuthProvider>
                        <QueryClientProvider client={queryClient}>
                            <OnboardingProvider>
                                <StackNavigator />
                            </OnboardingProvider>
                        </QueryClientProvider>
                    </AuthProvider>
                    <Toast config={toastConfig} />
                </NavigationContainer>
            </KeyboardAvoidingView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: commonStyles.flex1,
});

export default App;
