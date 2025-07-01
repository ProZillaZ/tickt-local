import {
    Gender,
    ActivityLevel,
    DietGoal,
    DietType,
    UnitSystem,
    GoalPace,
    MealCount,
    Cuisine,
    Allergen,
} from '@tickt-engineering/diet-gen-lib';

export interface OnboardingState {
    email: string;
    age: number;
    gender: Gender;
    heightCm: number;
    weightKg: number;
    ingredientMeasurement: string;
    freeDays: string[];
    activityLevel: ActivityLevel;
    goal: DietGoal;
    dietType: DietType;
    unitSystem: UnitSystem;
    pace?: GoalPace;
    mealCount?: MealCount;
    favoriteCuisines?: Cuisine[];
    allergies?: Allergen[];
    avoidedIngredients?: string[];
    currentStep: number;
    isCompleted: boolean;
    targetWeight?: number;
}
