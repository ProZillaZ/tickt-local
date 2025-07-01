export interface ShopCollapsibleProps {
	selectedData: { [key: string]: any };
	onUpdate: (field: string, value: number[]) => void;
}

export interface DataItem {
	heading: string,
	options: [{ [key: string]: string | number }]
}

export type selectedData = { [key: string]: any }
