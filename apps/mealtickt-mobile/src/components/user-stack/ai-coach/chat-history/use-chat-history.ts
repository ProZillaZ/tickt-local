import { aiChatHistory } from 'app/constants/constants';
import { useState } from 'react';

export const useChatHistory = () => {
	const initialData = aiChatHistory;
	const [filteredData, setFilteredData] = useState<Array<{ [key: string]: string | number }>>(initialData);

	const handleUpdateFilter = (text: string) => setFilteredData(
		initialData.filter(
			item => item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
		),
	);

	return {
		filteredData,
		handleUpdateFilter,
	};
};
