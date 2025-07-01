import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User } from './auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [isOnboarding, setOnboarding] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadUser = async () => {
			try {
				const userData = await AsyncStorage.getItem('user');
				const onboarding = await AsyncStorage.getItem('onboarding');
				if (userData) {
					setUser(JSON.parse(userData));
					onboarding && setOnboarding(true);
				}
			} catch (error) {
				console.error('Failed to load user', error);
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, []);

	const handleOnboarding = async (type: boolean) => {
		await AsyncStorage.setItem('onboarding', String(type));
		setOnboarding(type);
	};

	const login = async (userData: User) => {
		try {
			await AsyncStorage.setItem('user', JSON.stringify(userData));
			setUser(userData);
		} catch (error) {
			console.error('Login failed', error);
		}
	};

	const logout = async () => {
		try {
			await AsyncStorage.removeItem('user');
			setUser(null);
		} catch (error) {
			console.error('Logout failed', error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, isOnboarding, handleOnboarding, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};
