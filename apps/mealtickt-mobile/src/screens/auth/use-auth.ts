import React, { useEffect, useState } from 'react';
import { Slide } from './auth.props';
import { authToggleOptions } from 'app/constants/constants';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'app/navigation/navigation.props';
import { useAuth as authHook } from 'app/contexts/auth/auth';
import { AuthServices } from 'app/services/auth.service.ts';

const authServices = new AuthServices();
export const useAuth = () => {
	const route = useRoute<RouteProp<RootStackParamList, 'auth'>>();
	const { params } = route;
	const [currentIndex, setCurrentIndex] = useState(authToggleOptions.default);
	const [withEmail, setWithEmail] = useState(false);
	const [loading, setLoading] = useState(false);
	const { login } = authHook();
	const renderItem = (item: Slide, idx: number) =>
		currentIndex == idx && React.createElement(item.component);
	const handleToggle = (index: number) => {
		if (index != currentIndex) {
			setWithEmail(false);
			setCurrentIndex(index);
		}
	};
	const logInWithSocial = async (id: string) => {
		console.log('id :', id);
		setLoading(true);
		try {
			const userInfo = await authServices.socialSignIn(id);
			await login(userInfo);
		} catch (error) {
			console.log('error :', error);
		} finally {
			setLoading(false);
		}
	};
	const handleAuthPress = (id: string) => {
		if (id === 'email') setWithEmail(true);
		else {
			logInWithSocial(id);
		}
	};

	useEffect(() => {
		if (params) {
			setCurrentIndex(params.page);
			setWithEmail(params.email);
		}
	}, [params]);

	return {
		withEmail,
		currentIndex,
		toggleOptions: authToggleOptions.options,
		handleAuthPress,
		renderItem,
		handleToggle,
		loading,
	};
};
