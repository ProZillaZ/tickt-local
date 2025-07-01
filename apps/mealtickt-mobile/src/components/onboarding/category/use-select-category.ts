import { allergies } from 'app/constants/constants';
import { useEffect, useState } from 'react';
import { CategoryProps } from './category.props';

export const useSelectCategory = ({ onChange, defaultValue, data }: Partial<CategoryProps>) => {
	const [selectedAllergies, setSelectedAllergies] = useState(['']);

	// useEffect(()=>{onChange && onChange(selectedAllergies)},[selectedAllergies])
	useEffect(() => {
		defaultValue && defaultValue?.length > 0 && setSelectedAllergies(defaultValue);
	}, [defaultValue]);

	const selectAllergy = (allergyId: string) => {
		if (allergyId === 'none') {
			// setSelectedAllergies(['none']);
			onChange && onChange(['none']);
			return;
		}

		if (selectedAllergies.includes('none')) {
			onChange && onChange([allergyId]);
			return;
		}

		if (selectedAllergies.includes(allergyId)) {
			return;
		} else {
			const res = selectedAllergies.filter(id => id !== '');
			onChange && onChange([...res, allergyId]);
			// setSelectedAllergies([...selectedAllergies, allergyId]);
		}
	};

	const deSelectAllergy = (allergyId: string) => {
		if (selectedAllergies.includes(allergyId)) {
			const res = selectedAllergies.filter(id => id !== allergyId);
			onChange && onChange(res?.length > 0 ? res : ['']);
			// setSelectedAllergies(selectedAllergies.filter(id => id !== allergyId));

		}
	};

	return {
		allergies: data,
		selectedAllergies,
		selectAllergy,
		deSelectAllergy,
	};
};
