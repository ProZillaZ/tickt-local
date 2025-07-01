import { WeekMealPlanService } from '../../../../src/services/meal-planning/week-meal-plan.service';
import { DayMealPlanService } from '../../../../src/services/meal-planning/day-meal-plan.service';
import { NutritionalInfoService } from '../../../../src/services/nutritional-info.service';
import { DietType, Allergen, MealCount } from '@tickt-engineering/types';
import { MacroAllocation } from '../../../../src/models/macros/macro-allocation';
import { WeekMealPlan } from '../../../../src/models/meal-plans/week-meal-plan';
import { DayMealPlan } from '../../../../src/models/meal-plans/day-meal-plan';
import { MealService } from '../../../../src/services/meal-planning/meal.service';
import { MacronutrientService } from '../../../../src/services/macronutrient.service';

// Mock dependencies
jest.mock('../../../../src/services/meal-planning/day-meal-plan.service');
jest.mock('../../../../src/services/nutritional-info.service');

describe('WeekMealPlanService', () => {
    let weekMealPlanService: WeekMealPlanService;
    let mockDayMealPlanService: jest.Mocked<DayMealPlanService>;
    let mockNutritionalInfoService: jest.Mocked<NutritionalInfoService>;
    let mockMealService: jest.Mocked<MealService>;
    let mockMacronutrientService: jest.Mocked<MacronutrientService>;

    beforeEach(() => {
        // Create mock instances
        mockMealService = {
            createMeals: jest.fn(),
        } as unknown as jest.Mocked<MealService>;

        mockMacronutrientService = {
            distribute: jest.fn(),
        } as unknown as jest.Mocked<MacronutrientService>;

        mockNutritionalInfoService = {
            calculateDayNutritionalInfo: jest.fn(),
            calculateWeekNutritionalInfo: jest.fn(),
        } as unknown as jest.Mocked<NutritionalInfoService>;

        mockDayMealPlanService = new DayMealPlanService(
            mockMealService,
            mockMacronutrientService,
            mockNutritionalInfoService,
        ) as jest.Mocked<DayMealPlanService>;

        // Mock the createDailyMealPlans method
        mockDayMealPlanService.createDailyMealPlans = jest.fn();

        weekMealPlanService = new WeekMealPlanService(mockDayMealPlanService, mockNutritionalInfoService);
    });

    describe('createWeekMealPlan', () => {
        it('should create a week meal plan with correct properties', () => {
            // Arrange
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [Allergen.PEANUTS];
            const totalWeekMacroAllocation: MacroAllocation = new MacroAllocation(2000, 3000, 1000);
            const mealCount = MealCount.THREE;

            const mockDayMealPlans: DayMealPlan[] = Array(7).fill({} as DayMealPlan);
            mockDayMealPlanService.createDailyMealPlans.mockReturnValue(mockDayMealPlans);

            const mockWeekNutritionalInfo = {
                totalCalories: 14000,
                totalProtein: 700,
                totalCarbs: 1750,
                totalFats: 467,
            };
            mockNutritionalInfoService.calculateWeekNutritionalInfo.mockReturnValue(mockWeekNutritionalInfo);

            // Act
            const result: WeekMealPlan = weekMealPlanService.createWeekMealPlan(dietType, allergens, totalWeekMacroAllocation, mealCount);

            // Assert
            expect(result).toBeDefined();
            expect(result.dayPlans).toHaveLength(7);
            expect(result.weekNutritionalInfo).toEqual(mockWeekNutritionalInfo);
            expect(result.startDate).toBeInstanceOf(Date);
            expect(result.endDate).toBeInstanceOf(Date);
            expect(result.createdAt).toBeInstanceOf(Date);
            expect(result.updatedAt).toBeInstanceOf(Date);
        });

        it('should call dayMealPlanService.createDailyMealPlans with correct parameters', () => {
            // Arrange
            const dietType = DietType.VEGETARIAN;
            const allergens: Allergen[] = [Allergen.GLUTEN, Allergen.SOY];
            const totalWeekMacroAllocation: MacroAllocation = new MacroAllocation(1800, 2700, 900);
            const mealCount = MealCount.FOUR;

            mockDayMealPlanService.createDailyMealPlans.mockReturnValue([]);
            mockNutritionalInfoService.calculateWeekNutritionalInfo.mockReturnValue({} as any);

            // Act
            weekMealPlanService.createWeekMealPlan(dietType, allergens, totalWeekMacroAllocation, mealCount);

            // Assert
            expect(mockDayMealPlanService.createDailyMealPlans).toHaveBeenCalledWith(
                dietType,
                allergens,
                totalWeekMacroAllocation,
                mealCount,
            );
        });

        it('should call nutritionalInfoService.calculateWeekNutritionalInfo with correct parameters', () => {
            // Arrange
            const dietType = DietType.VEGAN;
            const allergens: Allergen[] = [];
            const totalWeekMacroAllocation: MacroAllocation = new MacroAllocation(1600, 2400, 800);
            const mealCount = MealCount.FIVE;

            const mockDayMealPlans: DayMealPlan[] = Array(7).fill({} as DayMealPlan);
            mockDayMealPlanService.createDailyMealPlans.mockReturnValue(mockDayMealPlans);
            mockNutritionalInfoService.calculateWeekNutritionalInfo.mockReturnValue({} as any);

            // Act
            weekMealPlanService.createWeekMealPlan(dietType, allergens, totalWeekMacroAllocation, mealCount);

            // Assert
            expect(mockNutritionalInfoService.calculateWeekNutritionalInfo).toHaveBeenCalledWith(mockDayMealPlans);
        });

        it('should use default meal count when not provided', () => {
            // Arrange
            const dietType = DietType.STANDARD;
            const allergens: Allergen[] = [];
            const totalWeekMacroAllocation: MacroAllocation = new MacroAllocation(2000, 3000, 1000);

            mockDayMealPlanService.createDailyMealPlans.mockReturnValue([]);
            mockNutritionalInfoService.calculateWeekNutritionalInfo.mockReturnValue({} as any);

            // Act
            weekMealPlanService.createWeekMealPlan(dietType, allergens, totalWeekMacroAllocation);

            // Assert
            expect(mockDayMealPlanService.createDailyMealPlans).toHaveBeenCalledWith(
                dietType,
                allergens,
                totalWeekMacroAllocation,
                expect.anything(), // We don't know the default value, but it should be passed
            );
        });
    });
});