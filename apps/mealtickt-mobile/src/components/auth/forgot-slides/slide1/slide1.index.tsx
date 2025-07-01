import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './slide1.styles';
import Content from 'components/onboarding/content/content.index';
import Input from 'components/global/input/input.index';
import Button from 'components/global/button/button.index';
import { useSlide1 } from './use-slide1.ts';
import { Slide1Props } from './slide1.props';

const Slide1: React.FC<Slide1Props> = ({ handleNext }) => {
	const { state, onStateChange, onSubmit } = useSlide1({ handleNext });
	return (
		<View style={styles.container}>
			<Content headerText="forgot password" description="enter your email below to reset your password." />
			<View style={styles.inputContainer}>
				<Input placeholder="john.doe@gmail.com" label="email" value={state.email}
					   onUpdate={(text) => onStateChange('email', text)} mode="primary" leftIcon={null} />
			</View>
			<Button text="recover password" onClick={onSubmit} disabled={false} style={styles.button} />
		</View>
	);
};

export default Slide1;
