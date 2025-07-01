import React, { useState, useRef } from 'react';
import { FlatList } from 'react-native';
import { slides, Slide } from './forgot.props';
import { authLoadingContent } from 'app/constants/constants';

const initialLoadingState = { title: '', description: '' };
// Custom hook for managing the onboarding logic
export const useForgot = () => {

	// Reference to FlatList component
	const flatListRef = useRef<FlatList<Slide>>(null);

	// State to keep track of the current index in the slides
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visibleLoadingModal, setVisibleLoadingModal] = useState(false);
	const [loadingModalContent, setLoadingModalContent] = useState(initialLoadingState);

	// Calculate the progress percentage based on the current index
//   const progressPercentage = ((currentIndex + 1) / slides.length) * 100;


	// Handler for navigating to the next slide
	const handleNext = () => {
		let timeout = 0;
		if (currentIndex < slides.length - 1) {
			// Scroll to the next slide
			if (currentIndex == 0) {
				timeout = 3000;
				setTimeout(() => {
					setLoadingModalContent(authLoadingContent[0]);
					setVisibleLoadingModal(true);
				}, 500);
			}
			setTimeout(() => {
				setVisibleLoadingModal(false);
				setLoadingModalContent(initialLoadingState);
				flatListRef?.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
				setCurrentIndex(currentIndex + 1);
			}, timeout);
		}
	};

//   // Handler for navigating to the previous slide
//   const handlePrevious = () => {
//     if (currentIndex > 0) {
//       // Scroll to the previous slide
//       flatListRef?.current?.scrollToIndex({ index: currentIndex - 1, animated: true });
//       setCurrentIndex(currentIndex - 1);  // Update currentIndex
//     }
//   };

	// Render item function for FlatList that dynamically renders the component for each slide
	const renderItem = ({ item }: { item: Slide }) => React.createElement(item.component, { handleNext });

	// Return values from the custom hook to be used in the component
	return {
		flatListRef,
		renderItem,
		visibleLoadingModal,
		loadingModalContent,
	};
};
