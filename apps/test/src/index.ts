import axios from 'axios';
import { CaloriesService } from './calories.service';
import { MacrosService } from './macros.service';
import { UserProfile } from './user/user-profile';
import { Gender } from './user/gender.enum';
import { UnitSystem } from './user/unit-system.enum';
import { ActivityLevel } from './user/activity-level.enum';
import { DietGoal } from './user/diet-goal.enum';
import { DietType } from './user/diet-type.enum';
import * as fs from 'fs';

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

interface Recipe {
	id: string;
	name: string;
	description: string;
	mealTypes: string[];
	dietTypes: string[];
	servings: number;
	ingredients: any[];
	instructions: any[];
	nutritionalInfo: {
		calories: number;
		protein: number;
		carbohydrates: number;
		fat: number;
		fiber: number;
	};
}

interface RecipeResponse {
	recipes: Recipe[];
	total: number;
	page: number;
	totalPages: number;
}

interface MacroTarget {
	calories: number;
	proteinCalories: number;
	carbCalories: number;
	fatCalories: number;
}

function scaleRecipe(recipe: Recipe, targetMacros: MacroTarget): Recipe {
	const nutrition = recipe.nutritionalInfo;
	// Calculate scaling factor based on calories
	const scalingFactor = targetMacros.calories / nutrition.calories;
	// TODO: Have a separate scale factor for each macro.

	const scaledRecipe = { ...recipe };

	// Scale and round ingredients
	scaledRecipe.ingredients = recipe.ingredients.map(ingredient => ({
		...ingredient,
		amount: Math.round(ingredient.amount * scalingFactor)
	}));

	// Scale and round nutritional info
	scaledRecipe.nutritionalInfo = {
		calories: Math.round(nutrition.calories * scalingFactor),
		protein: Math.round(nutrition.protein * scalingFactor),
		carbohydrates: Math.round(nutrition.carbohydrates * scalingFactor),
		fat: Math.round(nutrition.fat * scalingFactor),
		fiber: Math.round(nutrition.fiber * scalingFactor)
	};

	// Adjust servings
	scaledRecipe.servings = Math.round(recipe.servings * scalingFactor);

	return scaledRecipe;
}

function calcKcalsPerMacroPerMeal() {
	const caloricIntakeService = new CaloriesService();
	const macronutrientService = new MacrosService();

	const { gender, weightKg, heightCm, age, activityLevel, goal: dietGoal, dietFilters } = userProfile;

	const bmr = caloricIntakeService.calculateBmr(gender, weightKg, heightCm, age);
	const tdee = caloricIntakeService.adjustBmrForActivityLevel(bmr, activityLevel);
	const dailyCalories = caloricIntakeService.adjustCaloriesForDietGoal(tdee, dietGoal);
	const dailyCaloriesPerMeal = dailyCalories / 7;
	const dailyMacroAllocation = macronutrientService.calculateMacroCalories(dailyCalories);
	const macroKcalsPerMeal = macronutrientService.scale(dailyMacroAllocation, dietFilters.mealCount);

	return { calories: dailyCaloriesPerMeal, ...macroKcalsPerMeal };
}

async function fetchRecipesByDietAndMealType(
	dietType: string,
	mealType: string,
	limit: number = 7,
	baseUrl = 'http://localhost:3000',
): Promise<Recipe[]> {
	try {
		const response = await axios.get<RecipeResponse>(`${baseUrl}/recipes/search/full-advanced`, {
			params: {
				dietTypes: dietType,
				mealTypes: mealType,
				limit,
			},
		});

		return response.data.recipes;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to fetch recipes: ${error.response?.data?.message || error.message}`);
		}
		throw error;
	}
}

function writeToFile(weekMealPlan) {
	const dataToWrite = JSON.stringify(weekMealPlan, null, 2);

	fs.writeFile('gen-meal-plan.txt', dataToWrite, (err) => {
		if (err) {
			return console.error('Error writing file:', err);
		}
		console.log('Object has been saved to gen-meal-plan.txt');
	});
}

async function main() {
	try {
		const targetMacrosPerMeal = calcKcalsPerMacroPerMeal();

		const breakfasts = await fetchRecipesByDietAndMealType('omnivore', 'breakfast');
		const lunches = await fetchRecipesByDietAndMealType('omnivore', 'lunch');
		const dinners = await fetchRecipesByDietAndMealType('omnivore', 'dinner');
		const snacks = await fetchRecipesByDietAndMealType('omnivore', 'snack');

		// Scale each recipe to match the per-meal macros
		const scaledBreakfasts = breakfasts.map(recipe => scaleRecipe(recipe, targetMacrosPerMeal));
		const scaledLunches = lunches.map(recipe => scaleRecipe(recipe, targetMacrosPerMeal));
		const scaledDinners = dinners.map(recipe => scaleRecipe(recipe, targetMacrosPerMeal));
		const scaledSnacks = snacks.map(recipe => scaleRecipe(recipe, targetMacrosPerMeal));

		const mealPlan = {
			breakfasts: scaledBreakfasts,
			lunches: scaledLunches,
			dinners: scaledDinners,
			snacks: scaledSnacks,
		};

		writeToFile(mealPlan);
		// console.dir(mealPlan, { depth: null });
	} catch (error) {
		console.error('Error:', error);
	}
}

main().catch(err => console.error('Test Run Failed:', err));