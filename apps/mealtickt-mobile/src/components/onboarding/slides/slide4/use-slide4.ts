import { useEffect, useState } from 'react';
import { ingredientMenu } from 'app/constants/constants';

// Custom hook for managing the onboarding logic
export const useSlide4 = () => {
	const initialData = ingredientMenu;
	const [filteredData, setFilteredData] = useState<Array<{ [key: string]: string | number }>>(initialData);
	const [selectedData, setSelectedData] = useState<Array<{ [key: string]: string | number }>>([]);

	const handleFilterData = (data: Array<{ [key: string]: string | number }>) => {
		updateFilterData(data);
	};

	const handleResetData = () => {
		setFilteredData(initialData);
	};

	const updateFilterData = (data: Array<{ [key: string]: string | number }>) => {
		const updatedData = data?.filter((item: { [key: string]: string | number }) => !selectedData?.includes(item));
		setFilteredData(updatedData);
	};

	const handleItemSelection = (item: { [key: string]: string | number }) => {
		setSelectedData((prev) => {
			if (prev.some((s) => s.id === item.id)) {
				return prev;
			}
			return [...prev, item];
		});
	};

	const handleRemoveItem = (id: string | number) => {
		const removedSelected = selectedData?.filter(s => s.id == id);
		setFilteredData(s => ([...s, ...removedSelected]));
		setSelectedData(selectedData?.filter(s => s.id != id));
	};

	useEffect(() => {
		updateFilterData(filteredData);
	}, [selectedData]);

	// Return values from the custom hook to be used in the component
	return {
		filteredData,
		initialData,
		selectedData,
		setSelectedData,
		handleFilterData,
		handleResetData,
		handleItemSelection,
		handleRemoveItem,
	};
};
