import { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { ChatSession, ChatMessage, MessageType, SessionStatus } from '@tickt-ltd/types';

export const useChatModal = () => {
	const [chatStarted, setChatStarted] = useState(false);
	const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
	const [currentMessage, setCurrentMessage] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const scrollViewRef = useRef<ScrollView | null>(null);
	const scrollToEnd = () => scrollViewRef.current?.scrollToEnd({ animated: true });

	useEffect(() => {
		if (currentSession?.messages?.length) scrollToEnd();
	}, [currentSession?.messages]);

	const initializeSession = (): ChatSession => {
		const sessionId = `session_${Date.now()}`;
		const userId = 'user_1'; // TODO: Get from auth context
		const title = 'AI Coaching Session';

		const session = new ChatSession(sessionId, userId, title, SessionStatus.ACTIVE);
		setCurrentSession(session);
		return session;
	};

	const updateCurrentMessage = (text: string): void => {
		setCurrentMessage(text);
		setError(null);
	};


	const sendMessage = async (): Promise<void> => {
		if (!currentMessage.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			// Initialize session if it doesn't exist
			let session = currentSession;
			if (!session) {
				session = initializeSession();
			}

			// Create user message
			const userMessage = new ChatMessage(
				`msg_${Date.now()}`,
				session.id,
				'user_1', // TODO: Get from auth context
				MessageType.TEXT,
				currentMessage.trim(),
				new Date(),
				undefined,
				{}
			);

			// Add user message to session
			session.addMessage(userMessage);
			setCurrentSession(ChatSession.fromJSON(session.toJSON()));

			// Clear input
			const messageToSend = currentMessage.trim();
			setCurrentMessage('');

			// TODO: Call Firebase AI Logic here
			// For now, simulate AI response
			setTimeout(() => {
				const aiMessage = new ChatMessage(
					`msg_${Date.now() + 1}`,
					session.id,
					'ai_coach',
					MessageType.COACHING,
					`I understand you're asking about "${messageToSend}". Let me help you with that.`,
					new Date(),
					undefined,
					{}
				);

				session.addMessage(aiMessage);
				setCurrentSession(ChatSession.fromJSON(session.toJSON()));
				setIsLoading(false);
			}, 1000);

			if (!chatStarted) {
				setChatStarted(true);
			}

		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
			setIsLoading(false);
		}
	};

	const clearError = (): void => {
		setError(null);
	};

	return {
		scrollViewRef,
		scrollToEnd,
		chatStarted,
		setChatStarted,
		currentSession,
		currentMessage,
		isLoading,
		error,
		initializeSession,
		updateCurrentMessage,
		sendMessage,
		clearError,
	};
};
