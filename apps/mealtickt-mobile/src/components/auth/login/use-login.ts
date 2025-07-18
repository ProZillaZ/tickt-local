import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'contexts/auth/auth';
import { NavigationProp } from 'app/navigation/navigation.props';
import { useState } from 'react';
import { showSuccess } from 'app/utils/toast-config';
import { useAuthServices } from 'app/services/auth.service.adapter.ts';

const initialState = { email: '', password: '' };
export const useLogin = () => {
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const authServices = useAuthServices();

	const { navigate } = useNavigation<NavigationProp<'forgot'>>();

	const handleChange = (field: string, value: string | number) => {
		setState((s) => ({ ...s, [field]: value }));
	};

	const onSubmit = async () => {
		try {
			if (!state.email || !state.password) {
				showSuccess({
					text: 'Please enter the login details!',
				});
				return;
			}
			setLoading(true);
			const userInfo = await authServices.signIn(state.email, state.password);
			login(userInfo as any);
			showSuccess({ text: 'Login successful' });
		} catch (error: any) {
			console.log('error:', error);

			let message = 'An unknown error occurred. Please try again.';

			switch (error.code) {
				case 'auth/invalid-email':
					message = 'The email address is not valid.';
					break;
				case 'auth/user-disabled':
					message = 'This user account has been disabled.';
					break;
				case 'auth/user-not-found':
					message = 'No user found with this email.';
					break;
				case 'auth/wrong-password':
					message = 'Incorrect password. Please try again.';
					break;
				case 'auth/too-many-requests':
					message = 'Too many failed attempts. Please try again later.';
					break;
				case 'auth/network-request-failed':
					message = 'Network error. Please check your internet connection.';
					break;
				default:
					message = error.message;
					break;
			}
			showSuccess({ text: message });
		} finally {
			setLoading(false);
		}
	};
	const onForgot = () => {
		navigate('forgot');
	};

	return {
		state,

		handleChange,
		onSubmit,
		onForgot,
		loading,
	};
};
