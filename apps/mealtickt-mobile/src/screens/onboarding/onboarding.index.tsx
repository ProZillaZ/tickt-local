import React from 'react';
import { View, Text, SafeAreaView, FlatList, Animated, Dimensions } from 'react-native';
import { styles } from './onboarding.styles.ts';
import { Slide, slides } from './onboarding.props.ts';
import { useOnboarding } from './use-onboarding.ts';
import Header from 'components/global/header/header.index';
import LoadingModalFull from 'components/onboarding/loading/loading.index';
import ScrollViewBase from 'components/global/scroll-view-base/scroll-view-base.index';
import { OnboardingProvider } from 'contexts/onboarding/onboarding-context';
const { width } = Dimensions.get('window');

const OnboardingScreenContent = () => {
    const {
        currentIndex,
        flatListRef,
        handlePrevious,
        renderItem,
        progressPercentage,
        visibleLoadingModal,
        loadingModalContent,
        onScroll,
        viewabilityConfig,
        onViewableItemsChanged,
    } = useOnboarding();

    return (
        <SafeAreaView style={styles.container}>
            <Header onCrossPress={handlePrevious} currentIndex={currentIndex} />
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>step {`${currentIndex + 1}/${slides.length}`}</Text>
            <ScrollViewBase
                scrollEnabled={currentIndex == 3 && true}
                contentContainerStyle={{ flex: 1 }}>
                <Animated.FlatList
                    ref={flatListRef}
                    data={slides}
                    renderItem={renderItem}
                    horizontal
                    bounces={false}
                    scrollEnabled={false}
                    keyExtractor={(item: Slide) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    scrollEventThrottle={76}
                    onScroll={onScroll}
                    snapToInterval={width}
                    snapToAlignment="start"
                    viewabilityConfig={viewabilityConfig}
                    onViewableItemsChanged={onViewableItemsChanged}
                    decelerationRate="normal"
                />
            </ScrollViewBase>
            {/* <Button onClick={handleNext} text={'next'} disabled={false} /> */}
            <LoadingModalFull
                titleStyle={currentIndex == 4 ? styles.titleStyle : undefined}
                visible={visibleLoadingModal}
                title={loadingModalContent.title}
                description={loadingModalContent.description}
            />
        </SafeAreaView>
    );
};

const OnboardingScreen = () => {
    return (
        <OnboardingProvider>
            <OnboardingScreenContent />
        </OnboardingProvider>
    );
};

export default OnboardingScreen;
