import React, { useState, useRef, useEffect } from 'react';
import { FlatList, Animated, Dimensions, ViewabilityConfig, FlatListProps } from 'react-native';
import { slides, Slide } from './onboarding.props.ts';
import { loadingContent } from 'app/constants/constants.ts';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation/navigation.props';
import { useAuth } from 'contexts/auth/auth';
import { useOnboarding as useOnboardingContext } from 'contexts/onboarding/onboarding-context';
import { OnboardingState } from 'contexts/onboarding/onboarding.types';
import { DbService } from 'app/services/db.service.ts';
import { User } from 'app/contexts/auth/auth.types.ts';

const initialLoadingState = { title: '', description: '' };
const dbService = new DbService();
const { width } = Dimensions.get('window');

// Custom hook for managing the onboarding logic
export const useOnboarding = () => {
    // Reference to FlatList component
    const flatListRef = useRef<FlatList<Slide>>(null);
    const { navigate, popToTop } = useNavigation<NavigationProp<'BottomBar'>>();
    const { handleOnboarding } = useAuth();
    const { onboardingState, saveStep, isLoading, lastSlideRef } = useOnboardingContext();
    const { user, login, logout } = useAuth();
    // State to keep track of the current index in the slides
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleLoadingModal, setVisibleLoadingModal] = useState(false);
    const [loadingModalContent, setLoadingModalContent] = useState(initialLoadingState);

    const scrollX = useRef(new Animated.Value(0)).current;
    // Load saved step from onboarding state if it exists
    useEffect(() => {
        if (onboardingState && onboardingState.currentStep !== undefined) {
            setCurrentIndex(onboardingState.currentStep);
            // Scroll to the saved step on initial load
            const stepIndex = onboardingState.currentStep;
            setTimeout(() => {
                flatListRef?.current?.scrollToIndex({
                    index: stepIndex,
                    animated: false,
                });
            }, 100);
        }
    }, [onboardingState]);

    // Calculate the progress percentage based on the current index
    const progressPercentage = ((currentIndex + 1) / slides.length) * 100;

    // Log onboarding state when reaching the last slide
    useEffect(() => {
        if (currentIndex === slides.length - 1) {
        }
    }, [currentIndex, onboardingState]);

    // Handler for navigating to the next slide
    const handleNext = async () => {
        let timeout = 100;

        if (currentIndex < slides.length - 1) {
            // For transition from slide 3 to 4, show the loading screen first
            if (currentIndex == 3) {
                // Show loading screen immediately
                setLoadingModalContent(loadingContent[0]);
                setVisibleLoadingModal(true);

                // Set timeout for moving to next slide
                timeout = 3000;

                // Wait and then save state, navigate, and hide loading
                setTimeout(async () => {
                    // Save the current step to onboarding state
                    await saveStep({ currentStep: currentIndex + 1 });

                    // Hide loading screen and navigate
                    setVisibleLoadingModal(false);
                    setLoadingModalContent(initialLoadingState);
                    flatListRef?.current?.scrollToIndex({
                        index: currentIndex + 1,
                        animated: true,
                    });
                    setCurrentIndex(currentIndex + 1);
                }, timeout);

                return; // Exit early to avoid executing the code below
            }

            // For all other transitions (except 3→4)
            // Save the current step to onboarding state
            await saveStep({ currentStep: currentIndex + 1 });

            // Scroll to the next slide
            setTimeout(() => {
                flatListRef?.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
                setCurrentIndex(currentIndex + 1); // Update currentIndex
            }, timeout);
        }

        if (currentIndex == 4) {
            // Show loading screen immediately
            setLoadingModalContent(loadingContent[1]);
            setVisibleLoadingModal(true);

            timeout = 3000;

            setTimeout(async () => {
                setVisibleLoadingModal(false);
                setLoadingModalContent(initialLoadingState);

                // Complete the onboarding process
                try {
                    const onboardData = {
                        ...onboardingState,
                        pace: lastSlideRef.current.pace,
                        goal: lastSlideRef.current.goal,
                        targetWeight: lastSlideRef.current.targetWeight,
                    };
                    console.log('onboarding state :', onboardData);
                    const userData = await dbService.completeOnboarding(
                        user?.uid as string,
                        onboardData,
                    );
                    // Ensure userData has all required User fields
                    const userForLogin = {
                        ...(userData as User),
                        email: userData.email ?? user?.email ?? '',
                        uid: userData.uid ?? user?.uid ?? '',
                        // Add other required User fields here if necessary
                    };
                    await login(userForLogin);
                } catch (error) {
                    logout();
                    // Use console.log instead of console.error to avoid the red screen in Expo Go
                    console.log('Failed to complete onboarding:', error);

                    // Or disable error reporting in development only
                    if (!__DEV__) {
                        // Log to analytics or monitoring service in production
                        console.error('Failed to complete onboarding:', error);
                    }
                }

                // Continue to next screen regardless of API success/failure
                handleOnboarding(true);
                // navigate('BottomBar');
            }, timeout);
        }
    };

    // Handler for navigating to the previous slide
    const handlePrevious = async () => {
        if (currentIndex > 0) {
            // Save the current step to onboarding state
            await saveStep({ currentStep: currentIndex - 1 });

            // Scroll to the previous slide
            flatListRef?.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
            setCurrentIndex(currentIndex - 1); // Update currentIndex
        }
    };

    // Update onboarding data using the context's saveStep function
    const updateStepData = async (data: Partial<OnboardingState>) => {
        try {
            await saveStep(data);
        } catch (error) {
            console.error('Failed to save step data:', error);
        }
    };
    const viewConfigRef = useRef<ViewabilityConfig>({
        viewAreaCoveragePercentThreshold: 90,
        minimumViewTime: 800,
    });

    const onViewableItemsChanged = useRef<FlatListProps<Slide>['onViewableItemsChanged']>(
        (info) => {
            if (info.viewableItems.length > 0) {
                const newIndex = info.viewableItems[0].index;
                if (newIndex != null && newIndex !== currentIndex) {
                    setCurrentIndex(newIndex);
                    saveStep({ currentStep: newIndex });
                }
            }
        },
    ).current;
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
    });
    // Render item function for FlatList that dynamically renders the component for each slide
    const renderItem = ({ item, index }: { item: Slide; index: number }) =>
        React.createElement(item.component, {
            handleNext,
            updateStepData,
            onboardingState,
            isActive: index === currentIndex,
        });

    // Return values from the custom hook to be used in the component
    return {
        currentIndex,
        flatListRef,
        handleNext,
        handlePrevious,
        renderItem,
        progressPercentage,
        visibleLoadingModal,
        loadingModalContent,
        onScroll,
        onViewableItemsChanged,
        viewabilityConfig: viewConfigRef.current,
        scrollX,
        onboardingState,
        updateStepData,
        isLoading,
    };
};
