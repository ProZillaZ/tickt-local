// Define the valid field names for the form
export type FormField = 'mealCount' | 'dietaryPreferences' | 'activityLevel';

// Form state definition
export type OnboardingState = {
	mealCount: string;
	dietaryPreferences: string;
	activityLevel: string;
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
export interface Slide2Props {
	handleNext: () => void;
}
