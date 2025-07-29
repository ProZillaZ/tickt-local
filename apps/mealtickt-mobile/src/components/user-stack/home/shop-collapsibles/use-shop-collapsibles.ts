import { ShopCollapsibleProps } from './shop-collapsibles.props';

export const useShopCollapsible = ({ onUpdate }: Pick<ShopCollapsibleProps, 'onUpdate'>) => {
    const getChevronIcon = (up: boolean) =>
        up
            ? require('../../../../assets/icons/chevron-up.png')
            : require('../../../../assets/icons/chevron-down.png');

    // Default `dayData` to an empty array so .includes never blows up
    const onCheckBoxPress = (heading: string, id: number, dayData: number[] = []) => {
        const remain = dayData.includes(id)
            ? dayData.filter((item) => item !== id)
            : [...dayData, id];

        onUpdate(heading, remain);
    };

    const isChecked = (heading: string, id: number, dayData: number[] = []) => dayData.includes(id);

    return {
        getChevronIcon,
        onCheckBoxPress,
        isChecked,
    };
};
