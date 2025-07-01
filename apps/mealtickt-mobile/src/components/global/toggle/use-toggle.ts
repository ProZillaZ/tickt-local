import { useEffect, useState } from 'react';
import { UseToggleProps } from './toggle.props';

export const useToggle = ({ onPress, value }: UseToggleProps) => {
	const [selected, setSelected] = useState<number>(0);

	const handleSelect = (text: number) => {
		setSelected(text);
		onPress(text);
	};

	useEffect(() => {
		setSelected(value);
	}, [value]);

	return {
		selected,
		handleSelect,
	};
};
