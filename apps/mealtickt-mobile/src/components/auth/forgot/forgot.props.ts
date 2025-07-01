import Slide1 from 'components/auth/forgot-slides/slide1/slide1.index';
import Slide2 from 'components/auth/forgot-slides/slide2/slide2.index';
import Slide3 from 'components/auth/forgot-slides/slide3/slide3.index';

// Define the structure of a Slide object
export interface Slide {
	id: string;  // Unique identifier for each slide
	component: React.FC<{ handleNext: () => void }>;  // The React component for the slide
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
];

