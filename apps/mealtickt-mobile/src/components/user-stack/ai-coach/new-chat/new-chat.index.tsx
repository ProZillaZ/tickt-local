import { View, Text } from 'react-native';
import React from 'react';
import { styles } from './new-chat.styles';
import { aiCoachContent } from 'app/constants/constants';
import Button from 'components/global/button/button.index';
import { NewChatProps } from './new-chat.props';

const NewChat = ({ onChatStart }: NewChatProps) => {
	return (
		<View style={styles.headerContainer}>
			<Text style={styles.headText}>here are one ideas to get started</Text>
			<View style={styles.optContainer}>
				{
					aiCoachContent?.options?.map((option, id) => (
						<Button key={id} type="none" text={option} onClick={onChatStart} disabled={false}
								style={styles.aiOptContainer} textStyles={styles.aiOptText} />
					))
				}
			</View>
			<Button text="start chatting" style={styles.confirm} onClick={onChatStart} disabled={false} />
		</View>
	);
};

export default NewChat;
