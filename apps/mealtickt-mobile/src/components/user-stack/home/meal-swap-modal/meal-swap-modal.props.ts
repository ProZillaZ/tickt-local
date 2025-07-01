export interface MealSwapProps {
	swapedRecipe: number;
	onUpdate: (field: string, value: string | number) => void;
	isVisible: boolean;
	onClose: () => void;
}
