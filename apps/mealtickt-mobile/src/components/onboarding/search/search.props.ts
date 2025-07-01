export interface SearchProps {
	data: Array<{ [key: string]: string | number }>;
	onSearchResults: (data: Array<{ [key: string]: string | number }>) => void;
	placeholder?: string,
	searchKeys?: string[]
	handleResetData?: () => void
}

export const defaultSearchProps = {
	searchKeys: ['name'],
	placeholder: 'Search...',
};

export interface UseSearchProps {
	data: Array<{ [key: string]: string | number }>;
	onSearchResults: (data: Array<{ [key: string]: string | number }>) => void;
	searchKeys?: string[];
	handleResetData?: () => void;
}

export interface UseSearchReturn {
	searchText: string;
	onClear: () => void,
	handleSearch: (text: string) => void
}
