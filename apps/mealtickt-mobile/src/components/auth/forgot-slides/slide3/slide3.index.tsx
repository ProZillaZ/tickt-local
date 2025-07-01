import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './slide3.styles';
import Content from 'components/onboarding/content/content.index';
import Input from 'components/global/input/input.index';
import Button from 'components/global/button/button.index';
import { useSlide3 } from './use-slide3.ts';
import { Slide3Props } from './slide3.props';

const Slide3: React.FC<Slide3Props> = ({ handleNext }) => {
	const { onSubmit } = useSlide3({ handleNext });
	return (
		<View style={styles.container}>
			<Content headerText="password updated!" description="your password has been successfully changed." />
			<Button text="return to login" onClick={onSubmit} disabled={false} style={styles.button} />
		</View>
	);
};

export default Slide3;
