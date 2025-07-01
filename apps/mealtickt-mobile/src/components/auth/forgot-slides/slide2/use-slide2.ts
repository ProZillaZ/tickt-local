import { useState } from 'react';
import { UseSlide2Props } from './slide2.props';

const initialState = { password: '', cpassword: '' };
export const useSlide2 = ({ handleNext }: UseSlide2Props) => {
	const [state, setState] = useState(initialState);

	const onStateChange = (field: string, value: string) => {
		setState(s => ({ ...s, [field]: value }));
	};
	const onSubmit = () => {
		handleNext();
	};
	return {
		state,
		onStateChange,
		onSubmit,
	};
};
