import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation/navigation.props';
import { useAuth } from 'contexts/auth/auth';

export const useSlide1 = () => {
	const { goBack, navigate } = useNavigation<NavigationProp<'auth'>>();
	const { logout } = useAuth();

	const handleBack = () => goBack();

	const onSubmit = () => {
		logout();

		setTimeout(() => {
			goBack();
			navigate('auth', { page: 1, email: true });
		}, 1000);
	};

	return {
		handleBack,
		onSubmit,
	};
};
