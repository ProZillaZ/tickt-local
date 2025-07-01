import { useEffect, useState } from 'react';
import { UseInputPros, UseInputReturn } from './input.props';

export const useInput = ({ value, onUpdate, onClear, type }: UseInputPros): UseInputReturn => {
	const [localValue, setLocalValue] = useState<string | undefined>(undefined);

	const handleUpdate = (text: string) => {
		setLocalValue(text);
		onUpdate(text);
	};

	const handleClear = () => {
		setLocalValue('');
		onClear();
	};

	useEffect(() => {
		if (value) setLocalValue(value);
	}, [value]);

	return {
		localValue: type == 'password' ? '*'?.repeat(localValue?.length as number) : localValue,
		handleUpdate,
		handleClear,
	};
};
