import { useState } from 'react';

export const useRecipeInfo = () => {
	const [sign, setSign] = useState(false);

	const toggleSign = () => setSign(!sign);

	return {
		sign,
		toggleSign,
	};
};
