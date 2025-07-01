import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { DataItem, ShopCollapsibleProps } from './shop-collapsibles.props';
import { styles } from './shop-collapsibles.styles';
import CollapsableView from 'components/global/collapsible/collapsible.index';
import { mealsData } from 'app/constants/constants.ts';
import { useShopCollapsible } from './use-shop-collapsibles.ts';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { colors } from 'utils/styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AppLogger from 'app/logger/logger.ts';

const { primary } = colors;

const ShopCollapsibles = ({ selectedData, onUpdate }: ShopCollapsibleProps) => {
    const { getChevronIcon, onCheckBoxPress, isChecked } = useShopCollapsible({ onUpdate });

    const renderHeader = (isActive: boolean, data: DataItem) => {
        return (
            <View style={styles.header}>
                <Text style={styles.heading}>{data.heading}</Text>
                <Image style={styles.chevron} source={getChevronIcon(isActive)} />
            </View>
        );
    };

    const renderCollapsable = (data: DataItem) => (
        <View style={styles.itemRowGap}>
            {data.options.map((option, id) => {
                const checked = isChecked(data.heading, id, selectedData);
                return (
                    <View style={[styles.item]} key={id}>
                        <BouncyCheckbox
                            style={styles.bouncyBox}
                            isChecked={checked}
                            size={hp('2.2%')}
                            fillColor={primary}
                            unFillColor={primary}
                            iconImageStyle={styles.iconImageStyle}
                            innerIconStyle={styles.innerIconStyle}
                            onPress={() =>
                                onCheckBoxPress(data.heading, id, selectedData[data.heading])
                            }
                        />
                        <Pressable
                            onPress={() => {
                                AppLogger.trackEvent('shopping_item_checked', {
                                    category: data.heading,
                                    item: option.item,
                                    position: id,
                                });
                                onCheckBoxPress(data.heading, id, selectedData[data.heading]);
                            }}
                            style={styles.item}>
                            <Text style={[styles.textQuantity, checked && styles.textStrikeThough]}>
                                {option.quantity}
                                {option.unit}
                                {option.otherQuantity &&
                                    option.otherUnit &&
                                    ` / ${option.otherQuantity}${option.otherUnit}`}
                            </Text>
                            <Text style={[styles.itemText, checked && styles.textStrikeThough]}>
                                {option.item}
                            </Text>
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );

    return (
        <View style={styles.headerContainer}>
            <Text style={styles.smallText}>
                check the items as you buy them while you're doing your weekly groceries.
            </Text>
            <View style={styles.collapsable}>
                {mealsData?.map((data: any, index: number) => (
                    <CollapsableView
                        key={index}
                        renderHeader={(c: any, i: number, isActive: boolean) =>
                            renderHeader(isActive, data)
                        }
                        renderCollapsable={() => renderCollapsable(data)}
                    />
                ))}
            </View>
        </View>
    );
};

export default ShopCollapsibles;
