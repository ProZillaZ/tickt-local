import { MeasurementSystem } from 'app/components/onboarding/slides/slide1/slide1.props';
import { ActivityLevel } from 'app/enums/activity-level.enum';
import { Allergen } from 'app/enums/allergen.enum';
import { DietGoal } from 'app/enums/diet-goal.enum';
import { DietType } from 'app/enums/diet-type.enum';
import { Gender } from 'app/enums/gender.enum';
import { GoalPace } from 'app/enums/goal-pace.enum';
import { IngredientMeasurement } from 'app/enums/ingredient-measurement.enum';
import { MealCount } from 'app/enums/meal-count.enum';

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
