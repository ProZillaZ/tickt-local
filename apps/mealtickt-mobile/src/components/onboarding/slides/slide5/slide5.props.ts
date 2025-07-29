import { DietGoal, GoalPace } from '@tickt-ltd/types';

// Define the valid field names for the form
export type FormField = 'targetWeight' | 'goal' | 'pace';

// Form state definition
export type OnboardingState = {
    targetWeight: string;
    goal: DietGoal;
    pace: GoalPace;
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
export interface Slide5Props {
    handleNext: () => void;
}
