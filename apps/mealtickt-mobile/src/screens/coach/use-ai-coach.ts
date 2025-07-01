import { coachToggleOptions } from 'app/constants/constants';
import { useState } from 'react';

const initialState = { toggleOption: 0 };

export const useAiCoach = () => {
	const [state, setState] = useState(initialState);
	const [chatModalOpen, setChatModalOpen] = useState(false);

	const handleChatModalPress = (type: boolean) => setChatModalOpen(type);
	const updateState = (field: string, value: any) => setState(s => ({ ...s, [field]: value }));

	return {
		state,
		chatModalOpen,
		toggleOptions: coachToggleOptions.options,
		updateState,
		handleChatModalPress,
	};
};
