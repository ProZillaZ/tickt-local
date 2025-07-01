export interface SingleOptionButton {
	data: {
		key: string;
		label?: string;
		options: Array<{ id: string; label: string }>;
	};
	style?: object;
	onChange: Function;
	defaultValue?: string;
}
