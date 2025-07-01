import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation/navigation.props';

export const useNav = () => {
	const { navigate } = useNavigation<NavigationProp<'profile'>>();

	const toProfile = () => navigate('profile');

	return {
		toProfile,
	};
};
