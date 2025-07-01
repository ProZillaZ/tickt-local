import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { authScreens, onBoardingScreens, userStack } from './navigation.imports';
import { screenProps } from './navigation.props';
import { useAuth } from 'contexts/auth/auth';
import { onboarding } from 'app/contexts/auth/auth.types';
import { View } from 'react-native';
import LoadingIndicator from 'utils/loading-indicator.tsx';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
    const { user, isOnboarding, loading } = useAuth();
    console.log('user :',user)
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <LoadingIndicator />
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {!user &&
                authScreens.map((screen: screenProps) => (
                    <Stack.Screen
                        name={screen.name}
                        key={screen.name}
                        component={screen.component}
                        options={{ headerShown: false }}
                    />
                ))}
            {user?.onboarding === onboarding.COMPLETED
                ? userStack.map((screen: screenProps) => (
                      <Stack.Screen
                          key={screen.name}
                          name={screen.name}
                          component={screen.component}
                          options={{ headerShown: false }}
                      />
                  ))
                : onBoardingScreens.map((screen: screenProps) => (
                      <Stack.Screen
                          name={screen.name}
                          key={screen.name}
                          component={screen.component}
                          options={{ headerShown: false }}
                      />
                  ))}
        </Stack.Navigator>
    );
};

export default StackNavigator;
