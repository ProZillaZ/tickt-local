import { showSuccess } from 'utils/toast-config';
import { MealSwapProps } from './meal-swap-modal.props';
import { useState } from 'react';

export const useMealSwap = ({ onUpdate, onClose }: Partial<MealSwapProps>) => {
	const handleToggleModal = () => onClose && onClose();

	const handleSwap = (id: number) => {
		onUpdate && onUpdate('swapedRecipe', id);
		handleToggleModal();
		showSuccess({
			text: 'recipe successfully swapped!',
			buttonText: 'undo',
			onActionPress: () => console.log('action undo >>>'),
		});
	};

	return {
		handleSwap,
	};
};
