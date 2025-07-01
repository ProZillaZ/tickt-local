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
				authenticateThroughOptions.map((item, id) => (
					<Button key={id} leftIcon={item.icon} textStyles={styles.text} leftIconStyles={styles.icon}
							text={item.text} onClick={() => onPress(item.id)} disabled={false}
							style={styles.buttonContainer} />
				))
			}
		</View>
	);
};

export default AuthenticateThrough;
