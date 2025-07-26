#!/usr/bin/env ts-node

/**
 * Standalone recipe generation script using the SIMPLIFIED recipe-gen-lib
 * Demonstrates the streamlined API with unified configuration and built-in retry logic
 */

import { RecipeGenerationService, LlmProvider } from '../src';
import { RecipeGenInputDto, Difficulty } from '@tickt-ltd/types';
import { DietType, MealType, Cuisine } from '@tickt-ltd/types';
import * as fs from 'fs';
import * as path from 'path';

// Extract enum values as arrays
const dietTypes = Object.values(DietType);
const mealTypes = Object.values(MealType);

// Helper function to get appropriate calorie ranges for meal types
function getCalorieRangeForMealType(mealType: MealType): { min: number; max: number } {
	const ranges: Record<string, { min: number; max: number }> = {
		'breakfast': { min: 300, max: 600 },
		'brunch': { min: 400, max: 800 },
		'lunch': { min: 400, max: 700 },
		'dinner': { min: 500, max: 900 },
		'snack': { min: 100, max: 300 },
		'dessert': { min: 150, max: 400 },
	};

	const mealTypeKey = mealType.toLowerCase();
	return ranges[mealTypeKey] || { min: 300, max: 700 };
}

// Generate diet-appropriate macros from the start
function generateDietAppropriateMacros(calories: number, dietType: DietType): {
	protein: number;
	carbs: number;
	fats: number
} {
	const dietTypeKey = dietType.toLowerCase();
	let proteinPercent: number;
	let fatPercent: number;
	let carbPercent: number;

	switch (dietTypeKey) {
		case 'vegan':
		case 'vegetarian':
			// Plant-based: 45-65% carbs, 10-20% protein, 20-35% fat
			carbPercent = 0.45 + Math.random() * 0.20; // 45-65%
			proteinPercent = 0.10 + Math.random() * 0.10; // 10-20%
			fatPercent = 1 - carbPercent - proteinPercent; // 15-45%
			break;

		case 'pescatarian':
			// Pescatarian: Similar to balanced but with fish protein
			proteinPercent = 0.20 + Math.random() * 0.15; // 20-35%
			fatPercent = 0.25 + Math.random() * 0.15; // 25-40%
			carbPercent = 1 - proteinPercent - fatPercent; // 25-55%
			break;

		case 'standard':
		default:
			// Balanced diet: 40-60% carbs, 15-35% protein, 20-35% fat
			carbPercent = 0.40 + Math.random() * 0.20; // 40-60%
			proteinPercent = 0.15 + Math.random() * 0.20; // 15-35%
			fatPercent = 1 - carbPercent - proteinPercent; // 20-45%
			break;
	}

	// Ensure percentages add up to 100% (handle rounding)
	const total = proteinPercent + fatPercent + carbPercent;
	proteinPercent /= total;
	fatPercent /= total;
	carbPercent /= total;

	// Calculate grams from percentages
	return {
		protein: Math.round((calories * proteinPercent) / 4),
		carbs: Math.round((calories * carbPercent) / 4),
		fats: Math.round((calories * fatPercent) / 9),
	};
}

// Generic function to select random items from an array
function selectRandomItems<T>(items: T[], count: number): T[] {
	const selected: T[] = [];
	const available = [...items];

	for (let i = 0; i < count && available.length > 0; i++) {
		const index = Math.floor(Math.random() * available.length);
		selected.push(available[index]);
		available.splice(index, 1);
	}

	return selected;
}

// Generate inputs optimized for diet adherence
function generateDietAdherenceOptimized(): RecipeGenInputDto {
	const mealType = mealTypes[Math.floor(Math.random() * mealTypes.length)] as MealType;
	const dietType = dietTypes[Math.floor(Math.random() * dietTypes.length)] as DietType;

	// Adherence-friendly parameters
	const difficulty = Math.random() > 0.7 ? Difficulty.MEDIUM : Difficulty.EASY; // Mostly easy
	const servings = 1;
	const totalTime = difficulty === Difficulty.EASY ?
		Math.floor(Math.random() * 15 + 15) : // 15-30 min for easy
		Math.floor(Math.random() * 20 + 30); // 30-50 min for medium

	// Get appropriate calories and macros
	const calorieRange = getCalorieRangeForMealType(mealType);
	const calorieTarget = Math.floor(Math.random() * (calorieRange.max - calorieRange.min) + calorieRange.min);
	const macros = generateDietAppropriateMacros(calorieTarget, dietType);

	// Common preferences for adherence
	const adherenceCuisineEnums = [Cuisine.MEDITERRANEAN, Cuisine.ASIAN, Cuisine.MEXICAN, Cuisine.ITALIAN, Cuisine.AMERICAN];
	const selectedCuisineEnums = selectRandomItems(adherenceCuisineEnums, 2);
	const selectedCuisineStrings = selectedCuisineEnums.map(cuisine => cuisine.toString());

	return {
		dietType,
		mealType,
		difficulty,
		calorieTarget,
		proteinTarget: macros.protein,
		carbsTarget: macros.carbs,
		fatsTarget: macros.fats,
		totalTime,
		servings,
		allergies: [],
		preferredCuisines: selectedCuisineStrings,
		cuisines: selectedCuisineEnums,
		dislikedIngredients: [],
	};
}

// Hardcoded test scenarios for different diet types
function generateRecipeInputHardcoded(): RecipeGenInputDto {
	// Randomly select between different diet scenarios
	const scenarios = [
		// Standard high-protein breakfast
		{
			dietType: DietType.STANDARD,
			mealType: MealType.BREAKFAST,
			difficulty: Difficulty.EASY,
			calorieTarget: 450,
			proteinTarget: 25,  // ~22%
			carbsTarget: 45,    // ~40%
			fatsTarget: 15,     // ~30%
			totalTime: 20,
			servings: 1,
			allergies: [],
			preferredCuisines: ['american'],
			cuisines: [Cuisine.AMERICAN],
			dislikedIngredients: [],
		},
		// Pescatarian dinner
		{
			dietType: DietType.PESCATARIAN,
			mealType: MealType.DINNER,
			difficulty: Difficulty.MEDIUM,
			calorieTarget: 650,
			proteinTarget: 45,  // ~28%
			carbsTarget: 65,    // ~40%
			fatsTarget: 25,     // ~35%
			totalTime: 40,
			servings: 1,
			allergies: [],
			preferredCuisines: ['mediterranean'],
			cuisines: [Cuisine.MEDITERRANEAN],
			dislikedIngredients: [],
		},
		// Vegan lunch - higher carb is appropriate
		{
			dietType: DietType.VEGAN,
			mealType: MealType.LUNCH,
			difficulty: Difficulty.EASY,
			calorieTarget: 550,
			proteinTarget: 20,  // ~15%
			carbsTarget: 75,    // ~55% - appropriate for vegan
			fatsTarget: 18,     // ~30%
			totalTime: 30,
			servings: 1,
			allergies: [],
			preferredCuisines: ['asian', 'middle_eastern'],
			cuisines: [Cuisine.ASIAN, Cuisine.MIDDLE_EASTERN],
			dislikedIngredients: [],
		},
		// Standard balanced meal
		{
			dietType: DietType.STANDARD,
			mealType: MealType.LUNCH,
			difficulty: Difficulty.EASY,
			calorieTarget: 600,
			proteinTarget: 35,  // ~23%
			carbsTarget: 60,    // ~40%
			fatsTarget: 20,     // ~30%
			totalTime: 25,
			servings: 1,
			allergies: [],
			preferredCuisines: ['mediterranean'],
			cuisines: [Cuisine.MEDITERRANEAN],
			dislikedIngredients: [],
		},
	];

	return scenarios[Math.floor(Math.random() * scenarios.length)];
}

// Simple logger implementation
const logger = {
	log: (message: string, context?: string) => console.log(`[${context || 'LOG'}] ${message}`),
	error: (message: string, error?: any, context?: string) => console.error(`[${context || 'ERROR'}] ${message}`, error),
	warn: (message: string, context?: string) => console.warn(`[${context || 'WARN'}] ${message}`),
};

async function generateRecipes() {
	// Configuration from environment variables or defaults
	const providerEnv = process.env.LLM_PROVIDER?.toLowerCase();
	let provider: LlmProvider;

	if (providerEnv === 'openai') {
		provider = LlmProvider.OPENAI;
	} else {
		provider = LlmProvider.ANTHROPIC; // default
	}

	// Simplified configuration - uses intelligent defaults
	const config = {
		provider,
		apiKey: process.env.LLM_API_KEY || '',
		model: process.env.LLM_MODEL, // Optional - will use provider defaults
		maxTokens: process.env.LLM_MAX_TOKENS ? parseInt(process.env.LLM_MAX_TOKENS) : undefined,
		temperature: process.env.LLM_TEMPERATURE ? parseFloat(process.env.LLM_TEMPERATURE) : undefined,
	};

	if (!config.apiKey) {
		console.error('❌ LLM_API_KEY environment variable is required');
		console.log('Set it like: export LLM_API_KEY="your-api-key-here"');
		process.exit(1);
	}

	// Option 1: Using RecipeGenerationService (high-level wrapper with batch support)
	const recipeGenerationService = new RecipeGenerationService(config, logger);

	// Option 2: Using LlmService directly (lower-level access, same functionality)
	// const llmService = LlmService.create(config, logger);
	// const recipe = await llmService.generateRecipe(input);

	const totalRecipes = parseInt(process.env.RECIPE_COUNT || '5');
	const outputDir = path.join(__dirname, '..', 'generated-recipes');

	// Ensure output directory exists
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	logger.log(`Starting to generate ${totalRecipes} recipes using ${config.provider}...`, 'RecipeGenerator');

	const recipes = [];

	for (let i = 0; i < totalRecipes; i++) {
		try {
			// Mix different generation strategies for variety
			let input: RecipeGenInputDto;
			const strategy = i % 2;

			if (strategy === 0) {
				// Specific diet scenarios from hardcoded
				input = generateRecipeInputHardcoded();
			} else {
				// Random but adherence-optimized
				input = generateDietAdherenceOptimized();
			}

			// Calculate macro percentages for logging
			const totalCalories = (input.proteinTarget * 4) + ((input.carbsTarget || 0) * 4) + ((input.fatsTarget || 0) * 9);
			const proteinPercent = Math.round((input.proteinTarget * 4 / totalCalories) * 100);
			const carbPercent = Math.round(((input.carbsTarget || 0) * 4 / totalCalories) * 100);
			const fatPercent = Math.round(((input.fatsTarget || 0) * 9 / totalCalories) * 100);

			logger.log(`\nGenerating recipe ${i + 1}/${totalRecipes}:`, 'RecipeGenerator');
			logger.log(`- Diet: ${input.dietType}, Meal: ${input.mealType}`, 'RecipeGenerator');
			logger.log(`- Difficulty: ${input.difficulty}, Time: ${input.totalTime}min, Servings: ${input.servings}`, 'RecipeGenerator');
			logger.log(`- Macros: ${input.calorieTarget}cal (P:${proteinPercent}% C:${carbPercent}% F:${fatPercent}%)`, 'RecipeGenerator');
			logger.log(`- Cuisines: ${input.preferredCuisines?.join(', ') || 'Any'}`, 'RecipeGenerator');

			const generatedRecipe = await recipeGenerationService.generateRecipe(input);

			// Store full data for the combined file
			recipes.push({
				input,
				recipe: generatedRecipe,
				generatedAt: new Date().toISOString(),
			});

			logger.log(`✓ Created: ${generatedRecipe.name}`, 'RecipeGenerator');

			// Save individual recipe file (recipe content only)
			const filename = `${generatedRecipe.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
			fs.writeFileSync(
				path.join(outputDir, filename),
				JSON.stringify(generatedRecipe, null, 2),
			);

		} catch (error: any) {
			logger.error(`Failed to create recipe ${i + 1}/${totalRecipes}: ${error.message}`, error, 'RecipeGenerator');
		}
	}

	// Save all recipes to a single file (with metadata for analysis)
	const allRecipesFile = path.join(outputDir, 'all-recipes.json');
	fs.writeFileSync(allRecipesFile, JSON.stringify(recipes, null, 2));

	// Save clean recipes only file
	const cleanRecipesFile = path.join(outputDir, 'recipes-only.json');
	const cleanRecipes = recipes.map(r => r.recipe);
	fs.writeFileSync(cleanRecipesFile, JSON.stringify(cleanRecipes, null, 2));

	logger.log(`\n✅ Recipe generation completed!`, 'RecipeGenerator');
	logger.log(`📁 Generated ${recipes.length} recipes saved to: ${outputDir}`, 'RecipeGenerator');
	logger.log(`📄 Individual files: recipe-1-*.json (clean recipe content only)`, 'RecipeGenerator');
	logger.log(`📄 Combined files: all-recipes.json (with metadata) & recipes-only.json (clean)`, 'RecipeGenerator');
}

// Run the script
if (require.main === module) {
	generateRecipes().catch((error) => {
		logger.error('Fatal error in recipe generation:', error, 'RecipeGenerator');
		process.exit(1);
	});
}
