import { useNavigation } from '@react-navigation/native';
import { UseSlide3Props } from './slide3.props';
import { NavigationProp } from 'app/navigation/navigation.props';

export const useSlide3 = ({ handleNext }: UseSlide3Props) => {
	const { navigate } = useNavigation<NavigationProp<'auth'>>();
	const onSubmit = () => {
		handleNext();
		navigate('auth', { page: 1, email: true });
	};
	return {
		onSubmit,
	};
};
