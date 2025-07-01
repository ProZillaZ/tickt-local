import Slide1 from 'components/onboarding/slides/slide1/slide1.index';
import Slide2 from 'components/onboarding/slides/slide2/slide2.index';
import Slide3 from 'components/onboarding/slides/slide3/slide3.index';
import Slide4 from 'components/onboarding/slides/slide4/slide4.index';
import Slide5 from 'components/onboarding/slides/slide5/slide5.index';
import { FlatList } from 'react-native';
import { OnboardingState } from 'contexts/onboarding/onboarding.types';

// Define the structure of a Slide object
export interface Slide {
	id: string;  // Unique identifier for each slide
	component: React.FC<SlideComponentProps>;  // The React component for the slide
}

// Props for individual slide components
export interface SlideComponentProps {
	handleNext: () => void;
	updateStepData?: (data: Partial<OnboardingState>) => Promise<void>;
	onboardingState?: Partial<OnboardingState> | null;
}

// Array of slides, each containing an id and a component to render
export const slides: Slide[] = [
	{
		id: '1',
		component: Slide1,// Dynamically require the Slide2 component
	},
	{
		id: '2',
		component: Slide2, // Dynamically require the Slide2 component
	},
	{
		id: '3',
		component: Slide3, // Dynamically require the Slide1 component
	},
	{
		id: '4',
		component: Slide4, // Dynamically require the Slide2 component
	},
	{
		id: '5',
		component: Slide5, // Dynamically require the Slide2 component
	},
];

// Interface for the props expected in the Onboarding component
export interface OnboardingProps {
	currentIndex: number;  // Current index of the slide in the onboarding process
	flatListRef: React.RefObject<FlatList<any>>;  // Reference to the FlatList component for scrolling
	handleNext: () => void;  // Function to navigate to the next slide
	handlePrevious: () => void;  // Function to navigate to the previous slide
	updateStepData: (data: Partial<OnboardingState>) => Promise<void>; // Function to update onboarding state
	onboardingState: Partial<OnboardingState> | null; // Current onboarding state
}
