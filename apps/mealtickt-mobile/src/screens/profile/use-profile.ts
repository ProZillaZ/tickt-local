import React, { useState, useRef, useEffect } from 'react';
import { FlatList } from 'react-native';
import { slides, Slide } from './profile.props';
import AppLogger from 'app/logger/logger';

const initialLoadingState = { title: '', description: '' };

// Custom hook for managing the onboarding logic
export const useProfile = () => {
    // Reference to FlatList component
    const flatListRef = useRef<FlatList<Slide>>(null);
    // State to keep track of the current index in the slides
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleLoadingModal, setVisibleLoadingModal] = useState(false);
    const [loadingModalContent, setLoadingModalContent] = useState(initialLoadingState);
    // Calculate the progress percentage based on the current index
    const progressPercentage = ((currentIndex + 1) / slides.length) * 100;

    // Handler for navigating to the next slide
    const handleNext = (id: number) => {
        setCurrentIndex(id);
        if (id === 3) {
            AppLogger.trackEvent('subscription_viewed', {
                plan_type: 'premium',
                from_screen: 'profile',
            });
        }
        flatListRef?.current?.scrollToIndex({ index: id, animated: false });
    };

    // Render item function for FlatList that dynamically renders the component for each slide
    const renderItem = ({ item }: { item: Slide }) =>
        React.createElement(item.component, { handleNext });

    // Return values from the custom hook to be used in the component
    return {
        currentIndex,
        flatListRef,
        progressPercentage,
        visibleLoadingModal,
        loadingModalContent,
        handleNext,
        renderItem,
    };
};
