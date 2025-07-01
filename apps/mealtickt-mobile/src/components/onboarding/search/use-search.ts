import { useState } from 'react';
import { UseSearchProps, UseSearchReturn } from './search.props';

export const useSearch = ({ data, onSearchResults, searchKeys, handleResetData }: UseSearchProps): UseSearchReturn => {
	const [searchText, setSearchText] = useState('');

	const onClear = () => {
		setSearchText('');
		handleResetData && handleResetData();
	};

	const handleSearch = (text: string) => {
		setSearchText(text);

		if (!text.trim()) {
			onSearchResults(data);
			return;
		}
		const filteredData = data.filter((item: Record<string, any>) => {
			return searchKeys?.some(key => {
				const itemValue = item[key]?.toString().toLowerCase();
				return itemValue?.includes(text.toLowerCase());
			});
		});
		onSearchResults(filteredData);
	};

	return {
		searchText,
		onClear,
		handleSearch,
	};
};
