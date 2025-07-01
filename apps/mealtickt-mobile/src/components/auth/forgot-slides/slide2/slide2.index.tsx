import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './slide2.styles';
import Content from 'components/onboarding/content/content.index';
import Input from 'components/global/input/input.index';
import Button from 'components/global/button/button.index';
import { useSlide2 } from './use-slide2.ts';
import { Slide2Props } from './slide2.props';

const Slide2: React.FC<Slide2Props> = ({ handleNext }) => {
	const { state, onStateChange, onSubmit } = useSlide2({ handleNext });
	return (
		<View style={styles.container}>
			<ScrollView>
				<Content headerText="reset your password" description="choose a new password for your account" />
				<View style={styles.inputGroup}>
					<Input placeholder="at least 10 characters, including special ones" label="new password"
						   value={state.password} onUpdate={(text) => onStateChange('password', text)} mode="primary"
						   type="password" leftIcon={null} />
					<Input placeholder="at least 10 characters, including special ones" label="confirm password"
						   value={state.cpassword} onUpdate={(text) => onStateChange('cpassword', text)} mode="primary"
						   type="password" leftIcon={null} />
				</View>
				<Button text="reset password" onClick={onSubmit} disabled={false} style={styles.button} />
			</ScrollView>

		</View>
	);
};

export default Slide2;
