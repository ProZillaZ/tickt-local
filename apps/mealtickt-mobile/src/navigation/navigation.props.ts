import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface screenProps {
	component: React.FC;
	name: string;
}

export type RootStackParamList = {
	forgot: undefined;
	auth: { page: number, email: boolean };
	profile: undefined;
	diet: { skipDays: string[], onUpdate: (field: string, value: string[]) => void };
	'recipe-detail': undefined;
	BottomBar: undefined;
	onBoarding: undefined;
};

export type NavigationProp<T extends keyof RootStackParamList> = NativeStackNavigationProp<RootStackParamList, T>;
