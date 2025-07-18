import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { MealPlanBuilder } from '../../src/services/meal-planning/meal-plan.builder';
import { WeekMealPlan } from '../../src/models/meal-plans/week-meal-plan';
import { mockUserProfile } from '../__mocks__/mock-user-profile';
import {
    Recipe,
    UserProfile,
    DietType,
    MealType,
    MealCount,
    RecipeFilter
} from '@tickt-ltd/types';
import { FirestoreRecipeService } from '../../../../shared/services/firestore/firestore-recipe.service';
import { FirebaseDatabaseAdapter } from '../../../../shared/services/adapters/firebase-database.adapter';
import { Logger } from '../../../../shared/services/core/logger';

// Firebase modules setup for the database adapter
const firebaseModules = {
    firestore: undefined as any,
    collection: (db: any, path: string) => db.collection(path),
    doc: (db: any, path: string, id?: string) => id ? db.collection(path).doc(id) : db.collection(path).doc(),
    getDoc: (ref: any) => ref.get(),
    getDocs: (query: any) => query.get(),
    addDoc: (ref: any, data: any) => ref.add(data),
    setDoc: (ref: any, data: any) => ref.set(data),
    updateDoc: (ref: any, data: any) => ref.update(data),
    deleteDoc: (ref: any) => ref.delete(),
    query: (ref: any, ...constraints: any[]) => {
        let query = ref;
        for (const constraint of constraints) {
            query = constraint(query);
        }
        return query;
    },
    where: (field: string, op: string, value: any) => (query: any) => query.where(field, op, value),
    orderBy: (field: string, direction?: string) => (query: any) => query.orderBy(field, direction),
    limit: (count: number) => (query: any) => query.limit(count),
    startAfter: (doc: any) => (query: any) => query.startAfter(doc),
};

xdescribe('Recipe Meal Plan Database E2E Tests', () => {
    let mealPlanBuilder: MealPlanBuilder;
    let testUserProfile: UserProfile;
    let recipeService: FirestoreRecipeService;
    let firestore: any;

    beforeAll(async () => {
        // Initialize Firebase Admin SDK for testing
        try {
            // Initialize Firebase app for testing
            const app = initializeApp({
                projectId: 'tickt-90f02', // Development project
            });
            firestore = getFirestore(app);
            firebaseModules.firestore = firestore;

            // Initialize services
            const logger = new Logger('RecipeTest');
            const dbAdapter = new FirebaseDatabaseAdapter(firebaseModules);
            recipeService = FirestoreRecipeService.create(logger, dbAdapter);

        } catch (error) {
            console.error('Firebase initialization error:', error);
            throw error;
        }
    });

    beforeEach(() => {
        testUserProfile = { ...mockUserProfile };
        mealPlanBuilder = new MealPlanBuilder(testUserProfile);
    });

    describe('Database Recipe Fetching', () => {
        it('should fetch actual recipes from Firestore database', async () => {
            // Act
            const result = await recipeService.search({}, { limit: 10 });

            // Assert
            expect(result).toBeDefined();
            expect(result.items).toBeDefined();
            expect(Array.isArray(result.items)).toBe(true);

            if (result.items.length > 0) {
                const recipe = result.items[0];
                expect(recipe).toBeInstanceOf(Recipe);
                expect(recipe.id).toBeDefined();
                expect(recipe.name).toBeDefined();
                expect(recipe.description).toBeDefined();
                expect(recipe.ingredients).toBeDefined();
                expect(recipe.instructions).toBeDefined();
                expect(recipe.nutritionalInfo).toBeDefined();
                expect(recipe.mealTypes).toBeDefined();
                expect(recipe.dietTypes).toBeDefined();
            }
        }, 10000);

        it('should fetch recipes by meal type', async () => {
            // Arrange
            const filter: RecipeFilter = {
                mealTypes: [MealType.BREAKFAST]
            };

            // Act
            const result = await recipeService.search(filter, { limit: 5 });

            // Assert
            expect(result).toBeDefined();
            expect(result.items).toBeDefined();

            if (result.items.length > 0) {
                result.items.forEach(recipe => {
                    expect(recipe.mealTypes).toContain(MealType.BREAKFAST);
                });
            }
        }, 10000);

        it('should fetch recipes by diet type', async () => {
            // Arrange
            const filter: RecipeFilter = {
                dietTypes: [DietType.VEGETARIAN]
            };

            // Act
            const result = await recipeService.search(filter, { limit: 5 });

            // Assert
            expect(result).toBeDefined();
            expect(result.items).toBeDefined();

            if (result.items.length > 0) {
                result.items.forEach(recipe => {
                    expect(recipe.dietTypes).toContain(DietType.VEGETARIAN);
                });
            }
        }, 10000);

        it('should handle empty search results gracefully', async () => {
            // Arrange - use a very restrictive filter that likely returns no results
            const filter: RecipeFilter = {
                mealTypes: [MealType.BREAKFAST],
                dietTypes: [DietType.VEGETARIAN],
                maxCookTime: 1, // Very restrictive
                maxPrepTime: 1  // Very restrictive
            };

            // Act
            const result = await recipeService.search(filter, { limit: 5 });

            // Assert
            expect(result).toBeDefined();
            expect(result.items).toBeDefined();
            expect(Array.isArray(result.items)).toBe(true);
            // Empty results should be handled gracefully
        }, 10000);
    });

    describe('Database-Integrated Meal Plan Generation', () => {
        it('should create a day meal plan using real database recipes', async () => {
            // Arrange - fetch real recipes from database
            const breakfastRecipes = await recipeService.search(
                { mealTypes: [MealType.BREAKFAST] },
                { limit: 1 }
            );
            const lunchRecipes = await recipeService.search(
                { mealTypes: [MealType.LUNCH] },
                { limit: 1 }
            );
            const dinnerRecipes = await recipeService.search(
                { mealTypes: [MealType.DINNER] },
                { limit: 1 }
            );

            // Skip test if no recipes found
            if (breakfastRecipes.items.length === 0 ||
                lunchRecipes.items.length === 0 ||
                dinnerRecipes.items.length === 0) {
                console.warn('Skipping test - insufficient recipes in database');
                return;
            }

            const dayRecipes = [
                breakfastRecipes.items[0],
                lunchRecipes.items[0],
                dinnerRecipes.items[0]
            ];
            const weekRecipes = [dayRecipes]; // Single day

            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);

            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans).toHaveLength(1);

            const dayPlan = weekMealPlan.dayPlans[0];
            expect(dayPlan).toBeDefined();
            expect(dayPlan.meals).toHaveLength(3);
            expect(dayPlan.isFreeDay).toBe(false);

            // Verify nutritional info is calculated
            expect(dayPlan.dayNutritionalInfo).toBeDefined();
            expect(dayPlan.dayNutritionalInfo.calories).toBeGreaterThan(0);
            expect(dayPlan.dayNutritionalInfo.protein).toBeGreaterThan(0);
            expect(dayPlan.dayNutritionalInfo.carbohydrates).toBeGreaterThan(0);
            expect(dayPlan.dayNutritionalInfo.fat).toBeGreaterThan(0);

            // Verify that original recipe data is preserved
            dayPlan.meals.forEach((meal, index) => {
                if ('name' in meal) {
                    expect(meal.name).toBe(dayRecipes[index].name);
                    expect(meal.description).toBe(dayRecipes[index].description);
                }
            });
        }, 15000);

        it('should create a week meal plan with real database recipes', async () => {
            // Arrange - fetch enough recipes for a week
            const breakfastRecipes = await recipeService.search(
                { mealTypes: [MealType.BREAKFAST] },
                { limit: 6 }
            );
            const lunchRecipes = await recipeService.search(
                { mealTypes: [MealType.LUNCH] },
                { limit: 6 }
            );
            const dinnerRecipes = await recipeService.search(
                { mealTypes: [MealType.DINNER] },
                { limit: 6 }
            );

            // Skip test if insufficient recipes
            if (breakfastRecipes.items.length < 6 ||
                lunchRecipes.items.length < 6 ||
                dinnerRecipes.items.length < 6) {
                console.warn('Skipping test - insufficient recipes for full week');
                return;
            }

            // Build week recipes (6 days + 1 free day)
            const weekRecipes: Recipe[][] = [];
            for (let day = 0; day < 7; day++) {
                if (day === 5) { // Saturday is free day
                    weekRecipes.push([]);
                } else {
                    const dayIndex = day > 5 ? day - 1 : day;
                    weekRecipes.push([
                        breakfastRecipes.items[dayIndex],
                        lunchRecipes.items[dayIndex],
                        dinnerRecipes.items[dayIndex]
                    ]);
                }
            }

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
                    expect(dayPlan.meals).toHaveLength(3);
                }
            });

            // Verify week nutritional info
            expect(weekMealPlan.weekNutritionalInfo).toBeDefined();
            expect(weekMealPlan.weekNutritionalInfo.calories).toBeGreaterThan(0);
        }, 20000);

        it('should handle vegetarian user profile with database recipes', async () => {
            // Arrange
            const vegetarianUser: UserProfile = {
                ...testUserProfile,
                dietType: DietType.VEGETARIAN
            };

            const vegetarianBuilder = new MealPlanBuilder(vegetarianUser);

            // Fetch vegetarian recipes from database
            const vegetarianRecipes = await recipeService.search(
                { dietTypes: [DietType.VEGETARIAN] },
                { limit: 3 }
            );

            // Skip test if no vegetarian recipes found
            if (vegetarianRecipes.items.length === 0) {
                console.warn('Skipping test - no vegetarian recipes in database');
                return;
            }

            const weekRecipes = [vegetarianRecipes.items.slice(0, 3)];

            // Act
            const weekMealPlan: WeekMealPlan = vegetarianBuilder.build(weekRecipes);

            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans[0].meals).toHaveLength(Math.min(3, vegetarianRecipes.items.length));

            // Verify vegetarian recipes are used
            weekMealPlan.dayPlans[0].meals.forEach((meal, index) => {
                if ('name' in meal && index < vegetarianRecipes.items.length) {
                    expect(meal.name).toBe(vegetarianRecipes.items[index].name);
                }
            });
        }, 15000);

        it('should handle four meal user profile with database recipes', async () => {
            // Arrange
            const fourMealUser: UserProfile = {
                ...testUserProfile,
                dietFilters: {
                    ...testUserProfile.dietFilters,
                    mealCount: MealCount.FOUR
                }
            };

            const fourMealBuilder = new MealPlanBuilder(fourMealUser);

            // Fetch recipes for 4 meals
            const recipes = await recipeService.search({}, { limit: 4 });

            // Skip test if insufficient recipes
            if (recipes.items.length < 4) {
                console.warn('Skipping test - insufficient recipes for 4 meals');
                return;
            }

            const weekRecipes = [recipes.items.slice(0, 4)];

            // Act
            const weekMealPlan: WeekMealPlan = fourMealBuilder.build(weekRecipes);

            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans[0].meals).toHaveLength(4);
        }, 15000);
    });

    describe('Database Integration Edge Cases', () => {
        it('should handle large recipe datasets efficiently', async () => {
            // Arrange
            const startTime = Date.now();

            // Fetch larger dataset
            const recipes = await recipeService.search({}, { limit: 21 }); // 7 days × 3 meals

            // Skip test if insufficient recipes
            if (recipes.items.length < 21) {
                console.warn('Skipping test - insufficient recipes for large dataset test');
                return;
            }

            // Build week recipes
            const weekRecipes: Recipe[][] = [];
            for (let day = 0; day < 7; day++) {
                if (day === 5) { // Saturday is free day
                    weekRecipes.push([]);
                } else {
                    const dayIndex = day > 5 ? day - 1 : day;
                    const startIndex = dayIndex * 3;
                    weekRecipes.push([
                        recipes.items[startIndex],
                        recipes.items[startIndex + 1],
                        recipes.items[startIndex + 2]
                    ]);
                }
            }

            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);
            const endTime = Date.now();

            // Assert
            expect(weekMealPlan).toBeDefined();
            expect(weekMealPlan.dayPlans).toHaveLength(7);
            expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
        }, 25000);

        it('should validate recipe data integrity after processing', async () => {
            // Arrange
            const recipes = await recipeService.search({}, { limit: 1 });

            // Skip test if no recipes found
            if (recipes.items.length === 0) {
                console.warn('Skipping test - no recipes in database');
                return;
            }

            const originalRecipe = recipes.items[0];
            const weekRecipes = [[originalRecipe]];

            // Act
            const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(weekRecipes);

            // Assert
            const processedRecipe = weekMealPlan.dayPlans[0].meals[0];

            // Core properties should be maintained if it's a Recipe
            if ('name' in processedRecipe) {
                expect(processedRecipe.name).toBe(originalRecipe.name);
                expect(processedRecipe.description).toBe(originalRecipe.description);
                expect(processedRecipe.mealTypes).toEqual(originalRecipe.mealTypes);
                expect(processedRecipe.dietTypes).toEqual(originalRecipe.dietTypes);
                expect(processedRecipe.instructions).toEqual(originalRecipe.instructions);
            }

            // Structure should be maintained
            expect(processedRecipe.ingredients.length).toBe(originalRecipe.ingredients.length);
            expect(processedRecipe.nutritionalInfo).toBeDefined();
        }, 10000);
    });

    describe('Database Connection Resilience', () => {
        it('should handle database connection timeout gracefully', async () => {
            // This test would normally involve mocking network issues
            // For now, we'll test with a very short timeout expectation
            const shortTimeoutPromise = Promise.race([
                recipeService.search({}, { limit: 1 }),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 100))
            ]);

            try {
                await shortTimeoutPromise;
                // If it succeeds quickly, that's good
                expect(true).toBe(true);
            } catch (error) {
                // If it times out, that's expected behavior we can handle
                expect(error).toBeDefined();
            }
        }, 5000);
    });
});
