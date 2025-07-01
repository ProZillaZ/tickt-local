// Define the valid field names for the form
export type FormField = 'allergies' | 'ingredientMeasurement' | 'freeDays';

// Form state definition
export type OnboardingState = {
	allergies: string[];
	ingredientMeasurement: string;
	freeDays: string[];
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
export interface Slide3Props {
	handleNext: () => void;
}

// Exported type for ingredient measurement
export type IngredientMeasurement = 'actualWeight' | 'servings' | '';
