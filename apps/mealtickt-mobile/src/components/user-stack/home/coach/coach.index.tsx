import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './coach.styles';
import { aiCoachContent } from 'app/constants/constants';
import Button from 'components/global/button/button.index';
import { CoachProps } from './coach.props';

const AiCoach = ({ onChatPress }: CoachProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{aiCoachContent.title}</Text>
			{/* <Text style={styles.description}>{aiCoachContent.description}</Text> */}
			<Text style={styles.description}>{aiCoachContent.description}</Text>
			<View style={styles.optionContainer}>
				{
					aiCoachContent.options.map((option, id) => (
						<Button key={id} type="none" text={option} onClick={() => onChatPress(option)} disabled={false}
								style={styles.btnContainer} textStyles={styles.btnTextStyles} />
					))
				}
			</View>
			<Button style={styles.confirmButton} text={aiCoachContent.buttonTitle} onClick={() => onChatPress('')}
					disabled={false} />
		</View>
	);
};

export default AiCoach;
