import {
	DataItem,
	selectedData,
	ShopCollapsibleProps,
} from "./shop-collapsibles.props";

export const useShopCollapsible = ({
	onUpdate,
}: Partial<ShopCollapsibleProps>) => {
	const getChevronIcon = (up: boolean) => {
		if (up) return require("../../../../assets/icons/chevron-up.png");
		else return require("../../../../assets/icons/chevron-down.png");
	};

	const onCheckBoxPress = (heading: string, id: number, data: number[]) => {
		let remain;
		if (data.includes(id)) remain = data?.filter((item) => item != id);
		else remain = [...data, id];
		onUpdate && onUpdate(heading, remain);
	};

	const isChecked = (heading: string, id: number, data: selectedData) =>
		data[heading].includes(id);

	return {
		getChevronIcon,
		onCheckBoxPress,
		isChecked,
	};
};
