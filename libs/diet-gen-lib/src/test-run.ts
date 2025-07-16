import { UserProfile } from '@tickt-ltd/types';
import { Gender, UnitSystem, ActivityLevel, DietGoal } from '@tickt-ltd/types';
import { DietType } from '@tickt-ltd/types';
import { MealPlanBuilder } from './services/meal-planning/meal-plan.builder';
import fs from 'fs';

async function runLibraryTest() {
	// User Profile Example
	const userProfile: UserProfile = {
		id: 'christosTest',
		email: 'christos@tickt.io',
		age: 32,
		gender: Gender.MALE,
		unitSystem: UnitSystem.METRIC,
		heightCm: 178,
		weightKg: 92,
		activityLevel: ActivityLevel.MODERATELY_ACTIVE,
		goal: DietGoal.WEIGHT_LOSS,
		dietFilters: { mealCount: 4 },
		dietType: DietType.STANDARD,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	// Build the week meal plan using the user's profile
	const weekMealPlan = new MealPlanBuilder(userProfile).build();

	const dataToWrite = JSON.stringify(weekMealPlan, null, 2);
	// console.log('Week Meal Plan:', dataToWrite);

	fs.writeFile('weekly-meal-plan.txt', dataToWrite, (err) => {
		if (err) {
			return console.error('Error writing file:', err);
		}
		console.log('Object has been saved to weekly-meal-plan.txt');
	});

}

// Run the tests
runLibraryTest().catch(err => console.error('Test Run Failed:', err));
