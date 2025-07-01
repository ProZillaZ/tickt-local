import { chatData } from 'app/constants/constants';
import { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

export const useChatModal = () => {
	const scrollViewRef = useRef<ScrollView | null>(null);

	const scrollToEnd = () => scrollViewRef.current?.scrollToEnd({ animated: true });

	useEffect(() => {
		if (chatData?.length) scrollToEnd();
	}, [chatData]);

	return {
		scrollViewRef,
		scrollToEnd,
	};
};
