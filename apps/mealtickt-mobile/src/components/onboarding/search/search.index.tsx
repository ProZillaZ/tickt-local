import { View, Text } from 'react-native';
import React from 'react';
import Input from 'components/global/input/input.index';
import { useSearch } from './use-search.ts';
import { defaultSearchProps, SearchProps } from './search.props';
import { styles } from './search.styles';
import { colors } from 'utils/styles';

const Search: React.FC<SearchProps> = ({
   data,
   onSearchResults,
   placeholder = defaultSearchProps.placeholder,
   searchKeys = defaultSearchProps.searchKeys,
   handleResetData,
}) => {
	const { searchText, onClear, handleSearch } = useSearch({ data, onSearchResults, searchKeys, handleResetData });

	return (
		<View style={styles.container}>
			<Input value={searchText} placeholder={placeholder} onClear={onClear} onUpdate={handleSearch}
				   isVerfied={false} placeholderTextColor={colors.blackText} />
		</View>
	);
};

export default Search;
