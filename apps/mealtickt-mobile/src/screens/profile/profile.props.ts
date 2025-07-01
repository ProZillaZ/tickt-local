import { Slide1, Slide2, Slide3, Slide4, Slide5 } from 'components/user-stack/profile/slides/index';
import { FlatList } from 'react-native';

// Define the structure of a Slide object
export interface Slide {
	id: string;  // Unique identifier for each slide
	component: React.FC<{ handleNext: (id: number) => void }>;  // The React component for the slide
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

