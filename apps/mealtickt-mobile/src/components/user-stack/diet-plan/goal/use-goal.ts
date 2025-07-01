import { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';

export const useGoal = () => {
	const [editable, setEditable] = useState(false);
	const inputRef = useRef<TextInput | null>(null);

	const toggleEditMode = () => setEditable(!editable);
	useEffect(() => {
		setTimeout(() => inputRef.current?.focus(), 500);
	}, [editable]);

	return {
		editable,
		inputRef,
		toggleEditMode,
	};
};
