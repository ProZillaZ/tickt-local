export interface DietaryPreferencesProps {
	selectedLabel: string;
	onUpdate: (field: string, value: string | number) => void;
}
