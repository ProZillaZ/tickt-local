import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './option.styles';
import { authenticateThroughOptions } from 'app/constants/constants';
import Button from 'components/global/button/button.index';
import { AuthenticateThroughProps } from './option.props';

const AuthenticateThrough: React.FC<AuthenticateThroughProps> = ({ onPress }) => {
	return (
		<View style={styles.container}>
			{
				authenticateThroughOptions.filter(Boolean).map((item, id) => {
					const authOption = item as { id: string; icon: any; text: string; };
					return (
						<Button key={id} leftIcon={authOption.icon} textStyles={styles.text} leftIconStyles={styles.icon}
								text={authOption.text} onClick={() => onPress(authOption.id)} disabled={false}
								style={styles.buttonContainer} />
					);
				})
			}
		</View>
	);
};

export default AuthenticateThrough;
