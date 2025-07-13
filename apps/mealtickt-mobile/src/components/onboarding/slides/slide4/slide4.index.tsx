import React, { useEffect } from 'react';
import { View, Text, ListRenderItem, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { styles } from './slide4.styles';
import { useSlide4 } from './use-slide4.ts';
import Content from 'components/onboarding/content/content.index';
import Search from '../../search/search.index';
import ScrollBar from 'components/global/scrollbar/scrollbar.index';
import SelectedTags from 'components/onboarding/selected-tags/tags.index';
import Button from 'components/global/button/button.index';
import { SlideComponentProps } from 'screens/onboarding/onboarding.props';
import { useActiveAnimation } from '../useActiveAnimation.ts';

const Slide4: React.FC<SlideComponentProps> = ({
    handleNext,
    updateStepData,
    onboardingState,
    isActive,
}) => {
    const {
        filteredData,
        initialData,
        selectedData,
        setSelectedData,
        handleFilterData,
        handleResetData,
        handleItemSelection,
        handleRemoveItem,
    } = useSlide4();

    const { animateValue, translateX } = useActiveAnimation(isActive);

    // Load saved state from onboardingState if it exists
    useEffect(() => {
        if (onboardingState && onboardingState.avoidedIngredients) {
            try {
                // Convert string array to the expected object format if needed
                const savedFoods =
                    Array.isArray(onboardingState.avoidedIngredients) &&
                    typeof onboardingState.avoidedIngredients[0] === 'string'
                        ? onboardingState.avoidedIngredients.map((name) => ({ id: name, name }))
                        : onboardingState.avoidedIngredients;

                setSelectedData(savedFoods as any);
            } catch (error) {
                console.error('Failed to load saved avoid foods:', error);
            }
        }
    }, [onboardingState, setSelectedData]);

    const renderItem: ListRenderItem<{ [key: string]: string | number }> = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemSelection(item)} style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    // Custom next handler to save state before proceeding
    const onNextPress = async () => {
        if (updateStepData) {
            try {
                await updateStepData({
                    avoidedIngredients: selectedData as any,
                });
            } catch (error) {
                console.error('Failed to save slide4 data:', error);
            }
        }
        handleNext();
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: animateValue, transform: [{ translateX: translateX }] },
            ]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Content
                    headerText="next to last question"
                    description="any foods you'd like to avoid?"
                />
                {selectedData?.length > 0 && (
                    <SelectedTags
                        data={selectedData}
                        onClear={(id: string | number) => handleRemoveItem(id)}
                    />
                )}
                <Search
                    data={initialData}
                    handleResetData={handleResetData}
                    onSearchResults={handleFilterData}
                    searchKeys={['name']}
                    placeholder="start typing or select from the list below "
                />
                <ScrollBar
                    style={styles.searchContainer}
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item: { [key: string]: string | number }) => item.id.toString()}
                />
                <Button onClick={onNextPress} text="next" disabled={false} />
            </ScrollView>
        </Animated.View>
    );
};

export default Slide4;
