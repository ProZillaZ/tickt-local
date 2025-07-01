export interface ToggleProps {
	options: string[];
	onPress: (text: number) => void;
	value: number;
	style?: object;
	itemStyles?: object;
	itemWidthOffset?: number;
}

export interface UseToggleProps {
	onPress: (text: number) => void;
	value: number;
}
