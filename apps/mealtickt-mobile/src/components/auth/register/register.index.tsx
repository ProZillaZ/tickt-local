import { View } from 'react-native';
import { useRegister } from './use-register.ts';
import { styles } from './register.styles';
import Button from 'components/global/button/button.index';
import Input from 'components/global/input/input.index';
import LoadingIndicator from 'utils/loading-indicator.tsx';

const Register = () => {
	const { handleChange, onSubmit, loading } = useRegister();
	return (
		<View style={styles.container}>
			<View style={styles.inputGroup}>
				<Input
					placeholder="john.doe@gmail.com"
					label="email"
					onUpdate={(text) => handleChange('email', text)}
					mode="primary"
					leftIcon={null}
				/>
				<Input
					placeholder="at least 10 characters, including special ones"
					label="password"
					onUpdate={(text) => handleChange('password', text)}
					mode="primary"
					type="password"
					leftIcon={null}
				/>
			</View>
			{loading ? (
				<LoadingIndicator />
			) : (
				<Button
					text="register"
					onClick={onSubmit}
					disabled={false}
					style={styles.button}
				/>
			)}
		</View>
	);
};

export default Register;
