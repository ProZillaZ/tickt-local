import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CollapsableView from 'components/global/collapsible/collapsible.index';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppLogger from 'app/logger/logger';
import { colors } from 'utils/styles';

import { DataItem, SelectedData, ShopCollapsibleProps } from './shop-collapsibles.props';
import { useShopCollapsible } from './use-shop-collapsibles';
import { styles } from './shop-collapsibles.styles';

const { primary } = colors;

interface Props
    extends Pick<ShopCollapsibleProps, 'selectedData' | 'onUpdate' | 'todayShoppingList'> {}

const ShopCollapsibles: React.FC<Props> = ({ selectedData, onUpdate, todayShoppingList }) => {
    const { getChevronIcon, onCheckBoxPress, isChecked } = useShopCollapsible({
        onUpdate,
    });

    const renderHeader = (isActive: boolean, section: DataItem) => (
        <View style={styles.header}>
            <Text style={styles.heading}>{section.heading}</Text>
            <Image style={styles.chevron} source={getChevronIcon(isActive)} />
        </View>
    );

    const renderCollapsable = (section: DataItem) => {
        // always default to [] if there's no entry yet
        const dayData: number[] = selectedData?.[section.heading] ?? [];

        return (
            <View style={styles.itemRowGap}>
                {section.options.map((option) => {
                    const { id, item, quantity, unit, otherQuantity, otherUnit } = option;
                    const checked = isChecked(section.heading, id, dayData);

                    return (
                        <View style={styles.item} key={id}>
                            <BouncyCheckbox
                                style={styles.bouncyBox}
                                isChecked={checked}
                                size={hp('2.2%')}
                                fillColor={primary}
                                unFillColor={primary}
                                iconImageStyle={styles.iconImageStyle}
                                innerIconStyle={styles.innerIconStyle}
                                onPress={() => onCheckBoxPress(section.heading, id, dayData)}
                            />

                            <Pressable
                                onPress={() => {
                                    AppLogger.trackEvent('shopping_item_checked', {
                                        category: section.heading,
                                        item,
                                        position: id,
                                    });
                                    onCheckBoxPress(section.heading, id, dayData);
                                }}
                                style={styles.item}>
                                <Text
                                    style={[
                                        styles.textQuantity,
                                        checked && styles.textStrikeThough,
                                    ]}>
                                    {quantity}
                                    {unit}
                                    {otherQuantity &&
                                        otherUnit &&
                                        ` / ${otherQuantity}${otherUnit}`}
                                </Text>
                                <Text style={[styles.itemText, checked && styles.textStrikeThough]}>
                                    {item}
                                </Text>
                            </Pressable>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.smallText}>
                check the items as you buy them while you're doing your weekly groceries.
            </Text>
            <View style={styles.collapsable}>
                {todayShoppingList.map((section, idx) => (
                    <CollapsableView
                        key={idx}
                        renderHeader={(_: any, __: any, isActive: boolean) =>
                            renderHeader(isActive, section)
                        }
                        renderCollapsable={() => renderCollapsable(section)}
                    />
                ))}
            </View>
        </View>
    );
};

export default ShopCollapsibles;
