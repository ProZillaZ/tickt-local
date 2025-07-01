export interface RecipeBottomModalProps {
	isVisible: boolean;
	onClose: () => void;
	onUpdate?: (data: string[] | boolean) => void;
	currentIndex?: number | null;
	defaultValue?: string[];
	isRepeatDay: boolean;
}
