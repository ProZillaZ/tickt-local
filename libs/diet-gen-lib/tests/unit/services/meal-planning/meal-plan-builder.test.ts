import { MealPlanBuilder } from '../../../../src/services/meal-planning/meal-plan.builder';
import { mockUserProfile } from '../../../__mocks__/mock-user-profile';
import { mockWeekMealPlan } from '../../../__mocks__/mock-week-meal-plan';
import { MacroAllocation } from '../../../../src/models/macros/macro-allocation';
import { DEFAULT_MEAL_COUNT } from '../../../../src/utils/constants';

jest.mock('../../../../src/services/caloric-intake.service');
jest.mock('../../../../src/services/macronutrient.service');
jest.mock('../../../../src/services/meal-planning/week-meal-plan.service');

describe('MealPlanBuilder', () => {
    // Mock service responses
    const mockServiceResponses = {
        calculateBmr: 1800,
        adjustBmrForActivityLevel: 2500,
        adjustCaloriesForDietGoal: 2300,
        calculateMacroCalories: { proteinCalories: 575, carbCalories: 1150, fatCalories: 575 },
        scaleMacroAllocation: { proteinCalories: 4025, carbCalories: 8050, fatCalories: 4025 },
    };

    beforeEach(() => {
        jest.resetAllMocks();

        // Mock WeekMealPlanService to return our mockWeekMealPlan
        const WeekMealPlanServiceMock = jest.requireMock('../../../../src/services/meal-planning/week-meal-plan.service').WeekMealPlanService;
        WeekMealPlanServiceMock.prototype.createWeekMealPlan.mockReturnValue(mockWeekMealPlan);

        // Mock MacronutrientService methods
        const MacronutrientServiceMock = jest.requireMock('../../../../src/services/macronutrient.service').MacronutrientService;
        MacronutrientServiceMock.prototype.calculateMacroCalories.mockReturnValue(mockServiceResponses.calculateMacroCalories);
        MacronutrientServiceMock.prototype.scale.mockReturnValue(mockServiceResponses.scaleMacroAllocation);
    });

    it('should create a MealPlanBuilder instance', () => {
        const builder = new MealPlanBuilder(mockUserProfile);
        expect(builder).toBeInstanceOf(MealPlanBuilder);
    });

    it('should build a WeekMealPlan', () => {
        const builder = new MealPlanBuilder(mockUserProfile);
        const weekMealPlan = builder.build();
        expect(weekMealPlan).toEqual(mockWeekMealPlan);
    });

    it('should use the correct user profile data', () => {
        const CaloricIntakeServiceMock = jest.requireMock('../../../../src/services/caloric-intake.service').CaloricIntakeService;
        const calculateBmrMock = CaloricIntakeServiceMock.prototype.calculateBmr;

        new MealPlanBuilder(mockUserProfile).build();

        expect(calculateBmrMock).toHaveBeenCalledWith(
            mockUserProfile.gender,
            mockUserProfile.weightKg,
            mockUserProfile.heightCm,
            mockUserProfile.age,
        );
    });

    it('should use the correct diet filters and macro allocation', () => {
        const WeekMealPlanServiceMock = jest.requireMock('../../../../src/services/meal-planning/week-meal-plan.service').WeekMealPlanService;
        const createWeekMealPlanMock = WeekMealPlanServiceMock.prototype.createWeekMealPlan;

        new MealPlanBuilder(mockUserProfile).build();

        const expectedMacroAllocation = new MacroAllocation(
            mockServiceResponses.scaleMacroAllocation.proteinCalories,
            mockServiceResponses.scaleMacroAllocation.carbCalories,
            mockServiceResponses.scaleMacroAllocation.fatCalories,
        );

        expect(createWeekMealPlanMock).toHaveBeenCalledWith(
            mockUserProfile.dietType,
            mockUserProfile.dietFilters?.allergies ?? [],
            expectedMacroAllocation,
            mockUserProfile.dietFilters?.mealCount,
        );
    });

    it('should handle missing diet filters', () => {
        const userProfileWithoutFilters = { ...mockUserProfile, dietFilters: undefined };
        const WeekMealPlanServiceMock = jest.requireMock('../../../../src/services/meal-planning/week-meal-plan.service').WeekMealPlanService;
        const createWeekMealPlanMock = WeekMealPlanServiceMock.prototype.createWeekMealPlan;

        new MealPlanBuilder(userProfileWithoutFilters).build();

        const expectedMacroAllocation = new MacroAllocation(
            mockServiceResponses.scaleMacroAllocation.proteinCalories,
            mockServiceResponses.scaleMacroAllocation.carbCalories,
            mockServiceResponses.scaleMacroAllocation.fatCalories,
        );

        expect(createWeekMealPlanMock).toHaveBeenCalledWith(
            userProfileWithoutFilters.dietType,
            [],
            expectedMacroAllocation,
            DEFAULT_MEAL_COUNT,
        );
    });


    it('should calculate total week macro allocation', () => {
        const CaloricIntakeServiceMock = jest.requireMock('../../../../src/services/caloric-intake.service').CaloricIntakeService;
        const MacronutrientServiceMock = jest.requireMock('../../../../src/services/macronutrient.service').MacronutrientService;

        const calculateBmrMock = CaloricIntakeServiceMock.prototype.calculateBmr;
        const adjustBmrForActivityLevelMock = CaloricIntakeServiceMock.prototype.adjustBmrForActivityLevel;
        const adjustCaloriesForDietGoalMock = CaloricIntakeServiceMock.prototype.adjustCaloriesForDietGoal;
        const calculateMacroCaloriesMock = MacronutrientServiceMock.prototype.calculateMacroCalories;
        const scaleMock = MacronutrientServiceMock.prototype.scale;

        calculateBmrMock.mockReturnValue(mockServiceResponses.calculateBmr);
        adjustBmrForActivityLevelMock.mockReturnValue(mockServiceResponses.adjustBmrForActivityLevel);
        adjustCaloriesForDietGoalMock.mockReturnValue(mockServiceResponses.adjustCaloriesForDietGoal);

        new MealPlanBuilder(mockUserProfile).build();

        expect(calculateBmrMock).toHaveBeenCalled();
        expect(adjustBmrForActivityLevelMock).toHaveBeenCalledWith(mockServiceResponses.calculateBmr, mockUserProfile.activityLevel);
        expect(adjustCaloriesForDietGoalMock).toHaveBeenCalledWith(mockServiceResponses.adjustBmrForActivityLevel, mockUserProfile.goal);
        expect(calculateMacroCaloriesMock).toHaveBeenCalledWith(mockServiceResponses.adjustCaloriesForDietGoal);
        expect(scaleMock).toHaveBeenCalledWith(mockServiceResponses.calculateMacroCalories, 7);
    });
});