export interface DaySelectionProps {
	onChange: (data: string[]) => void;
	style?: object;
	defaultValue?: string[];
	showHeader?: boolean;
}

export const defaultProps = {
	showHeader: true,
};
