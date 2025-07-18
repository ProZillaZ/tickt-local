import { SafeAreaView } from 'react-native';
import React from 'react';
import { ChatBottomModal, Navbar } from 'components/user-stack/home';
import { styles } from './coach.styles';
import Content from 'components/onboarding/content/content.index';
import Toggle from 'components/global/toggle/toggle.index';
import { useAiCoach } from './use-ai-coach.ts';
import { ChatHistory, NewChat } from 'components/user-stack/ai-coach';
import { isTablet } from 'utils/helpers.ts';
import ScrollViewBase from 'components/global/scroll-view-base/scroll-view-base.index';

const CoachScreen = () => {
	const { state, toggleOptions, chatModalOpen, updateState, handleChatModalPress } = useAiCoach();

	return (
		<SafeAreaView style={styles.container}>
			<Navbar />
			<ScrollViewBase>
				<Content style={styles.contentContainer} titleStyle={styles.contentTitle} headerText="ai diet coach"
						 description="get advice and motivation to stay on track." />
				<Toggle style={styles.toggleContainer} itemStyles={styles.itemsStyles} options={toggleOptions}
						value={state.toggleOption} onPress={(id) => updateState('toggleOption', id)}
						itemWidthOffset={isTablet ? 0.85 : 1.3} />
				{
					state.toggleOption == 0 ?
						<NewChat onChatStart={() => handleChatModalPress(true)} />
						:
						<ChatHistory />
				}
			</ScrollViewBase>
			<ChatBottomModal isVisible={chatModalOpen} onClose={() => handleChatModalPress(false)} />

		</SafeAreaView>
	);
};

export default CoachScreen;
