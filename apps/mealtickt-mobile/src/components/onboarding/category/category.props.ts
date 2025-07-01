export interface CategoryProps {
	onChange: (item: string[]) => void;
	label: string;
	data: { id: string; label: string; }[];
	defaultValue: string[];
}
