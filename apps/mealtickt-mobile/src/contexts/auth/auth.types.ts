import {
    ActivityLevel,
    Allergen,
    DietGoal,
    DietType,
    Gender,
    GoalPace,
    IngredientMeasurement,
    MealCount,
} from '@tickt-engineering/types';
import { MeasurementSystem } from 'app/components/onboarding/slides/slide1/slide1.props';

export enum onboarding {
    COMPLETED = 'completed',
    NOTCOMPLETED = 'notCompleted',
}
type avoidIngredient = {
    id: number;
    name: string;
};
export interface User {
    email: string;
    name?: string;
    profilePic?: string;
    uid?: string;
    onboarding?: onboarding;
    measurementSystem?: MeasurementSystem;
    height?: string;
    age?: string;
    gender?: Gender;
    weight?: string;
    allergies?: Allergen[];
    notification?: 'on' | 'off';
    goal?: DietGoal;
    pace?: GoalPace;
    targetWeight?: string;
    dietaryPreferences?: DietType;
    mealCount?: MealCount;
    activityLevel?: ActivityLevel;
    freeDays?: string[];
    ingredientMeasurement?: IngredientMeasurement;
    avoidedIngredients?: avoidIngredient[];
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
    isOnboarding: boolean;
    handleOnboarding: (type: boolean) => void;
}
