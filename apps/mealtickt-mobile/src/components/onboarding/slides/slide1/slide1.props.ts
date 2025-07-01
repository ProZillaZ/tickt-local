// Define the valid field names for the form
export type FormField = 'measurementSystem' | 'height' | 'weight' | 'age' | 'gender';

// Form state definition
export type OnboardingState = {
	measurementSystem: string;
	height: string;
	weight: string;
	age: string;
	gender: string;
};

// Validation error state structure
export type ValidationErrors = {
	[key in FormField]?: string;
};

// Fields that have been touched by the user
export type TouchedFields = {
	[key in FormField]?: boolean;
};

// Slide component props
export interface Slide1Props {
	handleNext: () => void;
}

// Exported type for measurement system
export type MeasurementSystem = 'cmKg' | 'ftLbs' | '';
