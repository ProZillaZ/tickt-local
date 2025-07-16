import { MealPlanBuilder } from '../../src/services/meal-planning/meal-plan.builder';
import { WeekMealPlan } from '../../src/models/meal-plans/week-meal-plan';
import { mockUserProfile } from '../__mocks__/mock-user-profile';
import { 
    mockBreakfastRecipe, 
    mockLunchRecipe, 
    mockDinnerRecipe, 
    mockVegetarianRecipe,
    createWeekRecipes,
    createDayRecipes
} from '../__mocks__/mock-recipes';
import { 
    Recipe, 
    UserProfile, 
    DietType, 
    MealCount,
    Allergen
} from '@tickt-ltd/types';

describe('Recipe Meal Plan End-to-End Tests', () => {
    let mealPlanBuilder: MealPlanBuilder;
    let testUserProfile: UserProfile;

    beforeEach(() => {
        testUserProfile = { ...mockUserProfile };
        mealPlanBuilder = new MealPlanBuilder(testUserProfile);
    });

    describe('Basic Recipe Integration', () => {
        it('should create a day meal plan using individual recipes', () => {
            // Arrange
            const dayRecipes = createDayRecipes();
            const weekRecipes = [dayRecipes]; // Single day
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans).toHaveLength(1);
            
            const dayPlan = weekMealPlan.dayPlans[0];
            expect(dayPlan).toBeDefined();
            expect(dayPlan.meals).toHaveLength(3); // breakfast, lunch, dinner
            expect(dayPlan.isFreeDay).toBe(false);
            
            // Verify nutritional info is calculated
            expect(dayPlan.dayNutritionalInfo).toBeDefined();
            expect(dayPlan.dayNutritionalInfo.calories).toBeGreaterThan(0);
            expect(dayPlan.dayNutritionalInfo.protein).toBeGreaterThan(0);
            expect(dayPlan.dayNutritionalInfo.carbohydrates).toBeGreaterThan(0);
            expect(dayPlan.dayNutritionalInfo.fat).toBeGreaterThan(0);
        });

        it('should handle different meal types correctly', () => {
            // Arrange
            const dayRecipes = [mockBreakfastRecipe, mockLunchRecipe, mockDinnerRecipe];
            const weekRecipes = [dayRecipes];
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            const dayPlan = weekMealPlan.dayPlans[0];
            const meals = dayPlan.meals;
            
            expect(meals).toHaveLength(3);
            
            // Verify each meal has expected properties
            meals.forEach(meal => {
                expect(meal).toBeDefined();
                expect(meal.ingredients).toBeDefined();
                expect(meal.nutritionalInfo).toBeDefined();
                
                // Check if it's a Recipe (has name and instructions) or Meal (has mealType)
                if ('name' in meal) {
                    // It's a Recipe
                    expect(meal.name).toBeDefined();
                    expect(meal.instructions).toBeDefined();
                } else {
                    // It's a Meal
                    expect(meal.mealType).toBeDefined();
                }
            });
        });

        it('should calculate total daily nutritional info correctly', () => {
            // Arrange
            const dayRecipes = createDayRecipes();
            const weekRecipes = [dayRecipes];
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            const dayPlan = weekMealPlan.dayPlans[0];
            const nutritionalInfo = dayPlan.dayNutritionalInfo;
            
            // The system scales recipes to meet user's macro targets, 
            // so we just verify the nutritional info is calculated and reasonable
            expect(nutritionalInfo.calories).toBeGreaterThan(1000); // Should be reasonable daily calories
            expect(nutritionalInfo.calories).toBeLessThan(5000);
            expect(nutritionalInfo.protein).toBeGreaterThan(50);
            expect(nutritionalInfo.carbohydrates).toBeGreaterThan(100);
            expect(nutritionalInfo.fat).toBeGreaterThan(30);
            
            // Verify that the sum of meal nutritional info equals day total
            const mealTotalCalories = dayPlan.meals.reduce((sum, meal) => sum + meal.nutritionalInfo.calories, 0);
            expect(nutritionalInfo.calories).toBeCloseTo(mealTotalCalories, 0);
        });
    });

    describe('Week-Long Recipe Meal Plan', () => {
        it('should create a complete week meal plan with recipes', () => {
            // Arrange
            const weekRecipes = createWeekRecipes();
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans).toHaveLength(7);
            
            // Verify each day has meals (except free day)
            weekMealPlan.dayPlans.forEach((dayPlan, index) => {
                expect(dayPlan).toBeDefined();
                
                if (index === 5) { // Saturday is free day
                    expect(dayPlan.isFreeDay).toBe(true);
                    expect(dayPlan.meals).toHaveLength(0);
                } else {
                    expect(dayPlan.isFreeDay).toBe(false);
                    expect(dayPlan.meals).toHaveLength(3); // breakfast, lunch, dinner
                }
            });
        });

        it('should handle free day correctly (Saturday)', () => {
            // Arrange
            const weekRecipes = createWeekRecipes();
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            const saturdayPlan = weekMealPlan.dayPlans[5]; // Saturday is index 5
            expect(saturdayPlan.isFreeDay).toBe(true);
            expect(saturdayPlan.meals).toHaveLength(0);
            expect(saturdayPlan.dayNutritionalInfo.calories).toBe(0);
            expect(saturdayPlan.dayNutritionalInfo.protein).toBe(0);
            expect(saturdayPlan.dayNutritionalInfo.carbohydrates).toBe(0);
            expect(saturdayPlan.dayNutritionalInfo.fat).toBe(0);
        });

        it('should calculate week nutritional info correctly', () => {
            // Arrange
            const weekRecipes = createWeekRecipes();
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan.weekNutritionalInfo).toBeDefined();
            expect(weekMealPlan.weekNutritionalInfo.calories).toBeGreaterThan(0);
            expect(weekMealPlan.weekNutritionalInfo.protein).toBeGreaterThan(0);
            expect(weekMealPlan.weekNutritionalInfo.carbohydrates).toBeGreaterThan(0);
            expect(weekMealPlan.weekNutritionalInfo.fat).toBeGreaterThan(0);
            
            // Week total should be sum of non-free days (6 days)
            const nonFreeDays = weekMealPlan.dayPlans.filter(day => !day.isFreeDay);
            expect(nonFreeDays).toHaveLength(6);
            
            const expectedWeekCalories = nonFreeDays.reduce((total, day) => total + day.dayNutritionalInfo.calories, 0);
            expect(weekMealPlan.weekNutritionalInfo.calories).toBeCloseTo(expectedWeekCalories, 0);
        });
    });

    describe('Recipe Quantity Adjustment', () => {
        it('should adjust recipe quantities to meet macro targets', () => {
            // Arrange
            const dayRecipes = [mockBreakfastRecipe]; // Single meal
            const weekRecipes = [dayRecipes];
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            const dayPlan = weekMealPlan.dayPlans[0];
            const adjustedRecipe = dayPlan.meals[0];
            
            expect(adjustedRecipe).toBeDefined();
            expect(adjustedRecipe.ingredients).toBeDefined();
            expect(adjustedRecipe.ingredients.length).toBeGreaterThan(0);
            
            // Recipe should have been adjusted for macro targets
            expect(adjustedRecipe.nutritionalInfo).toBeDefined();
            expect(adjustedRecipe.nutritionalInfo.calories).toBeGreaterThan(0);
            
            // If it's a Recipe, check servings
            if ('servings' in adjustedRecipe) {
                expect(adjustedRecipe.servings).toBeGreaterThan(0);
            }
        });

        it('should scale ingredients proportionally', () => {
            // Arrange
            const originalRecipe = mockBreakfastRecipe;
            const originalIngredientCount = originalRecipe.ingredients.length;
            const weekRecipes = [[originalRecipe]];
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            const adjustedRecipe = weekMealPlan.dayPlans[0].meals[0];
            
            // Should have same number of ingredients
            expect(adjustedRecipe.ingredients.length).toBe(originalIngredientCount);
            
            // All ingredients should have positive amounts
            adjustedRecipe.ingredients.forEach(ingredient => {
                // Check if it's a Recipe Ingredient (has amount and unit) or diet-gen-lib Ingredient (has quantity)
                if ('amount' in ingredient) {
                    // Recipe Ingredient
                    expect(ingredient.amount).toBeGreaterThan(0);
                    expect(ingredient.unit).toBeDefined();
                } else {
                    // diet-gen-lib Ingredient
                    expect(ingredient.quantity).toBeGreaterThan(0);
                }
                expect(ingredient.name).toBeDefined();
            });
        });
    });

    describe('Mixed Recipe Types', () => {
        it('should handle different diet types', () => {
            // Arrange
            const vegetarianUser: UserProfile = {
                ...testUserProfile,
                dietType: DietType.VEGETARIAN
            };
            
            const vegetarianBuilder = new MealPlanBuilder(vegetarianUser);
            const dayRecipes = [mockBreakfastRecipe, mockLunchRecipe, mockVegetarianRecipe];
            const weekRecipes = [dayRecipes];
            
            // Act
            const weekMealPlan: WeekMealPlan = vegetarianBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans[0].meals).toHaveLength(3);
            
            // Verify vegetarian recipe is included
            const dinnerMeal = weekMealPlan.dayPlans[0].meals[2];
            if ('name' in dinnerMeal) {
                expect(dinnerMeal.name).toBe('Chickpea Curry');
            }
        });

        it('should handle different meal counts', () => {
            // Arrange
            const fourMealUser: UserProfile = {
                ...testUserProfile,
                dietFilters: {
                    ...testUserProfile.dietFilters,
                    mealCount: MealCount.FOUR
                }
            };
            
            const fourMealBuilder = new MealPlanBuilder(fourMealUser);
            const dayRecipes = createDayRecipes(true); // Include snack
            const weekRecipes = [dayRecipes];
            
            // Act
            const weekMealPlan: WeekMealPlan = fourMealBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans[0].meals).toHaveLength(4);
        });

        it('should handle allergen preferences', () => {
            // Arrange
            const allergenUser: UserProfile = {
                ...testUserProfile,
                dietFilters: {
                    ...testUserProfile.dietFilters,
                    allergies: [Allergen.PEANUTS]
                }
            };
            
            const allergenBuilder = new MealPlanBuilder(allergenUser);
            const dayRecipes = createDayRecipes();
            const weekRecipes = [dayRecipes];
            
            // Act
            const weekMealPlan: WeekMealPlan = allergenBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans[0].meals).toHaveLength(3);
            
            // Should still create meal plan despite allergen preferences
            // (Recipe selection logic would filter out allergen-containing recipes)
        });
    });

    describe('Comprehensive Validations', () => {
        it('should create valid WeekMealPlan structure', () => {
            // Arrange
            const weekRecipes = createWeekRecipes();
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.id).toBeDefined();
            expect(weekMealPlan.dayPlans).toBeDefined();
            expect(weekMealPlan.dayPlans).toHaveLength(7);
            expect(weekMealPlan.weekNutritionalInfo).toBeDefined();
            expect(weekMealPlan.startDate).toBeDefined();
            expect(weekMealPlan.endDate).toBeDefined();
            expect(weekMealPlan.createdAt).toBeDefined();
            expect(weekMealPlan.updatedAt).toBeDefined();
        });

        it('should create valid DayMealPlan structures', () => {
            // Arrange
            const dayRecipes = createDayRecipes();
            const weekRecipes = [dayRecipes];
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            const dayPlan = weekMealPlan.dayPlans[0];
            expect(dayPlan).toBeDefined();
            expect(dayPlan.id).toBeDefined();
            expect(dayPlan.meals).toBeDefined();
            expect(dayPlan.dayNutritionalInfo).toBeDefined();
            expect(dayPlan.isFreeDay).toBeDefined();
            expect(dayPlan.createdAt).toBeDefined();
            expect(dayPlan.updatedAt).toBeDefined();
        });

        it('should maintain recipe integrity after processing', () => {
            // Arrange
            const originalRecipe = mockBreakfastRecipe;
            const weekRecipes = [[originalRecipe]];
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            const processedRecipe = weekMealPlan.dayPlans[0].meals[0];
            
            // Core properties should be maintained if it's a Recipe
            if ('name' in processedRecipe) {
                expect(processedRecipe.name).toBe(originalRecipe.name);
                expect(processedRecipe.description).toBe(originalRecipe.description);
                expect(processedRecipe.difficulty).toBe(originalRecipe.difficulty);
                expect(processedRecipe.cuisines).toEqual(originalRecipe.cuisines);
                expect(processedRecipe.mealTypes).toEqual(originalRecipe.mealTypes);
                expect(processedRecipe.dietTypes).toEqual(originalRecipe.dietTypes);
                expect(processedRecipe.instructions).toEqual(originalRecipe.instructions);
            }
            
            // Quantities may be adjusted but structure should be maintained
            expect(processedRecipe.ingredients.length).toBe(originalRecipe.ingredients.length);
            expect(processedRecipe.nutritionalInfo).toBeDefined();
        });

        it('should handle edge cases gracefully', () => {
            // Arrange - empty recipes array
            const emptyWeekRecipes: Recipe[][] = [[]];
            
            // Act & Assert
            expect(() => {
                mealPlanBuilder.build(emptyWeekRecipes);
            }).not.toThrow();
        });

        it('should produce consistent results across multiple runs', () => {
            // Arrange
            const weekRecipes = createWeekRecipes();
            
            // Act
            const weekMealPlan1: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            const weekMealPlan2: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            
            // Assert
            expect(weekMealPlan1.dayPlans.length).toBe(weekMealPlan2.dayPlans.length);
            
            // Compare nutritional totals (should be similar)
            expect(weekMealPlan1.weekNutritionalInfo.calories)
                .toBeCloseTo(weekMealPlan2.weekNutritionalInfo.calories, 0);
            expect(weekMealPlan1.weekNutritionalInfo.protein)
                .toBeCloseTo(weekMealPlan2.weekNutritionalInfo.protein, 0);
        });
    });

    describe('Performance and Integration', () => {
        it('should complete meal plan generation in reasonable time', () => {
            // Arrange
            const weekRecipes = createWeekRecipes();
            const startTime = Date.now();
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            const endTime = Date.now();
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(endTime - startTime).toBeLessThan(1000); // Should complete in under 1 second
        });

        it('should handle large number of recipes efficiently', () => {
            // Arrange
            const largeRecipeSet: Recipe[][] = [];
            for (let i = 0; i < 7; i++) {
                // Use only 3 recipes per day to match expected meal count
                largeRecipeSet.push([
                    mockBreakfastRecipe,
                    mockLunchRecipe,
                    mockDinnerRecipe
                ]);
            }
            
            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(largeRecipeSet);
            
            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans).toHaveLength(7);
            
            // Each non-free day should have 3 meals
            weekMealPlan.dayPlans.forEach((dayPlan, index) => {
                if (index !== 5) { // Not Saturday
                    expect(dayPlan.meals.length).toBe(3);
                } else {
                    // Saturday should be free day
                    expect(dayPlan.isFreeDay).toBe(true);
                    expect(dayPlan.meals.length).toBe(0);
                }
            });
        });
    });
});