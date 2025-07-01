import { AuthScreen, ForgotScreen, OnboardingScreen, ProfileScreen } from 'screens/index';
import { screenProps } from './navigation.props';
import BottomBar from 'components/bottom-navigation/bottom.index';

export const onBoardingScreens: screenProps[] = [
	{ component: OnboardingScreen, name: 'onBoarding' },
];

export const authScreens: screenProps[] = [
	{ component: AuthScreen, name: 'auth' },
	{ component: ForgotScreen, name: 'forgot' },
];

export const userStack: screenProps[] = [
	{ component: BottomBar, name: 'BottomBar' },
	{ component: ProfileScreen, name: 'profile' },
];
