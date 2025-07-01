import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ListRenderItem,
    ScrollView,
    Alert,
} from 'react-native';
import React from 'react';
import { styles } from './slide2.styles';
import { Slide2Props } from './slide2.props';
import { useSlide2 } from './use-slide2.ts';
import BackButton from 'components/global/back/back.index';
import SelectCategory from 'components/onboarding/category/category.index';
import { allergies } from 'app/constants/constants.ts';
import ScrollBar from 'components/global/scrollbar/scrollbar.index';
import Search from 'components/onboarding/search/search.index';
import SelectedTags from 'components/onboarding/selected-tags/tags.index';
import Button from 'components/global/button/button.index';
import { useUpdateUser } from 'app/hooks/use-update-user.ts';

const Slide2 = ({ handleNext }: Slide2Props) => {
    const {
        state,
        initialData,
        selectedData,
        filteredData,
        allergyLabel,
        handleRemoveItem,
        handleResetData,
        handleFilterData,
        handleBack,
        handleChangeAllergies,
        handleItemSelection,
    } = useSlide2({ handleNext });
    const { isEqual, updateUser, user } = useUpdateUser();
    const hasEqual = isEqual(user?.allergies, state.selectedAllergies);
    const hasEqual2 = isEqual(user?.avoidedIngredients, selectedData);
    const renderItem: ListRenderItem<{ [key: string]: string | number }> = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemSelection(item)} style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.headerContainer}>
            <ScrollView
                nestedScrollEnabled={true}
                contentContainerStyle={{ paddingBottom: 10 }}
                showsVerticalScrollIndicator={false}>
                <BackButton onPress={handleBack} />
                <View style={styles.headingContainer}>
                    <Image
                        style={styles.profileLogo}
                        source={require('../../../../../assets/icons/snack.png')}
                    />
                    <Text style={styles.title}>food settings</Text>
                </View>
                <SelectCategory
                    data={allergies}
                    label={allergyLabel}
                    defaultValue={state.selectedAllergies}
                    onChange={(data) => handleChangeAllergies(data)}
                />
                {selectedData?.length > 0 && (
                    <View>
                        <Text style={styles.avoid}>any foods you'd like to avoid?</Text>
                        <SelectedTags
                            data={selectedData}
                            onClear={(id: string | number) => handleRemoveItem(id)}
                        />
                    </View>
                )}
                <Search
                    data={initialData}
                    handleResetData={handleResetData}
                    onSearchResults={handleFilterData}
                    searchKeys={['name']}
                    placeholder="start typing or select from the list below "
                />
                <View style={[styles.searchContainer]}>
                    <ScrollBar
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item: { [key: string]: string | number }) =>
                            item.id.toString()
                        }
                    />
                </View>
                <Button
                    text="save changes"
                    onClick={() => {
                        updateUser({
                            allergies: state.selectedAllergies,
                            avoidedIngredients: selectedData,
                        });
                    }}
                    disabled={hasEqual && hasEqual2}
                />
            </ScrollView>
        </View>
    );
};

export default Slide2;
