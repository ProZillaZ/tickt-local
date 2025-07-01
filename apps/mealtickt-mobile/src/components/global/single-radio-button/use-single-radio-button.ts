import { useEffect, useState } from 'react';

export const useSingleRadioButton = ({ onChange, defaultValue }: { onChange: Function, defaultValue?: string }) => {
	const [selectedOption, setSelectedOption] = useState<string | number>(defaultValue || '');

	const handleSelectedOption = (option: string | number) => {
		setSelectedOption(option);
		onChange(option);
	};

	// useEffect(()=>{defaultValue && setSelectedOption(defaultValue)},[defaultValue])
	return {
		selectedOption,
		handleSelectedOption,
	};
};
