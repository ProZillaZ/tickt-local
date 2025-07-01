import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

export const useScrollBase = () => {
	const [isKeyboadOpen, setIsKeyboadOpen] = useState(false);
	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsKeyboadOpen(true));
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setIsKeyboadOpen(false));
		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);
	return {
		isKeyboardOpen: isKeyboadOpen,
	};
};
