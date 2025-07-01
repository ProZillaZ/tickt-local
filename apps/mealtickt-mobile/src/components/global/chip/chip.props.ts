export interface ChipProps {
	onSelect?: (id: string | number) => void;
	onClose: (id: string | number) => void;
	isSelected: boolean;
	item: { [key: string]: string | number },
}
