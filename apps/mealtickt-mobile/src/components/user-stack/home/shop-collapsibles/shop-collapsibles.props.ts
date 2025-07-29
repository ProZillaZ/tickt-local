// your DataItem and prop types
export interface ShopOption {
    id: number;
    item: string;
    quantity: string | number;
    unit: string;
    otherQuantity?: string | number;
    otherUnit?: string;
}

export interface DataItem {
    heading: string;
    options: ShopOption[];
}

export type SelectedData = {
    [heading: string]: number[];
};

export interface ShopCollapsibleProps {
    selectedData: SelectedData;
    onUpdate: (heading: string, ids: number[]) => void;
    todayShoppingList: DataItem[];
}
