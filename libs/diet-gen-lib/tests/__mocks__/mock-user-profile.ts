import { UserProfile, Gender, ActivityLevel, DietGoal, UnitSystem, DietType, MealCount, Allergen } from '@tickt-ltd/types';

export const mockUserProfile: UserProfile = {
    id: '1',
    email: 'tests@example.com',
    age: 30,
    gender: Gender.MALE,
    heightCm: 180,
    weightKg: 80,
    activityLevel: ActivityLevel.MODERATELY_ACTIVE,
    goal: DietGoal.MAINTENANCE,
    dietType: DietType.STANDARD,
    unitSystem: UnitSystem.METRIC,
    dietFilters: {
        mealCount: MealCount.THREE,
        allergies: [Allergen.PEANUTS],
    },
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
};
