import { DietType, MealType, Difficulty } from '@tickt-engineering/types';

/**
 * Unified configuration for recipe generation
 * Consolidates diet guidelines, meal context, and prompt templates
 */
export const RecipeGenConfig = {
	// LLM Provider defaults
	providers: {
		anthropic: {
			model: 'claude-3-sonnet-20240229',
			maxTokens: 2000,
		},
		openai: {
			model: 'gpt-4',
			temperature: 0.7,
			maxTokens: 2000,
		},
	},

	// Retry configuration
	retry: {
		maxAttempts: 3,
		baseDelay: 1000, // milliseconds
		maxDelay: 10000,
		exponentialBase: 2,
	},

	// Diet-specific guidelines and restrictions
	diets: {
		guidelines: {
			[DietType.VEGAN]: `
* Use only plant-based ingredients
* Ensure adequate B12, iron, and omega-3 sources
* Include complete proteins or complementary protein combinations`,

			[DietType.VEGETARIAN]: `
* No meat, poultry, or fish
* Eggs and dairy are allowed
* Focus on varied protein sources`,

			[DietType.PESCATARIAN]: `
* Fish and seafood allowed, but no other meat
* Emphasize sustainable seafood choices
* Include plant-based proteins too`,

			[DietType.STANDARD]: `
* All foods allowed - focus on whole, minimally processed options
* Balance plant and animal proteins
* Emphasize vegetables and whole grains`,
		},

		restrictions: {
			[DietType.VEGAN]: [
				'meat', 'chicken', 'beef', 'pork', 'fish', 'salmon', 'tuna',
				'dairy', 'milk', 'cheese', 'butter', 'egg', 'honey',
			],
			[DietType.VEGETARIAN]: [
				'meat', 'chicken', 'beef', 'pork', 'fish', 'salmon', 'tuna',
			],
			[DietType.PESCATARIAN]: [
				'meat', 'chicken', 'beef', 'pork',
			],
			[DietType.STANDARD]: [],
		},

	},

	// Meal and difficulty context
	meals: {
		types: {
			[MealType.BREAKFAST]: '(energizing, prep-ahead friendly, keeps you full until lunch)',
			[MealType.LUNCH]: '(portable, reheats well, prevents afternoon crashes)',
			[MealType.DINNER]: '(family-friendly, satisfying end to the day, not too heavy)',
			[MealType.SNACK]: '(curbs cravings, portion-controlled, genuinely satisfying)',
		},

		difficulties: {
			[Difficulty.EASY]: '(minimal prep, basic techniques, common ingredients)',
			[Difficulty.MEDIUM]: '(some knife skills, 2-3 cooking methods, moderate timing)',
			[Difficulty.HARD]: '(advanced techniques, precise timing, multiple components)',
			[Difficulty.PRO]: '(professional techniques, complex timing, specialty equipment)',
		},
	},

	// Simplified prompt template
	prompts: {
		systemRole: 'You are an expert nutritionist and chef specializing in SUSTAINABLE DIET ADHERENCE. Your recipes must help people stick to their diets long-term by being practical, satisfying, and genuinely enjoyable. Remember: the best diet is the one people can actually follow.',

		jsonTemplate: `Return ONLY a valid JSON object with lowercase enum values:

{
  "name": "Appetizing Recipe Name",
  "description": "Mouthwatering description in 2-3 sentences",
  "ingredients": [
    { "name": "ingredient (with substitution note if helpful)", "amount": number, "unit": "standard unit" }
  ],
  "instructions": [
    { "stepNumber": 1, "description": "Clear action with timing and visual cues" }
  ],
  "prepTime": realistic_number,
  "cookTime": realistic_number,
  "servings": {servings},
  "mealTypes": ["{mealType}"],
  "dietTypes": ["{dietType}"],
  "tags": [
    { "name": "Relevant Tag 1" },
    { "name": "Relevant Tag 2" },
    { "name": "Relevant Tag 3" }
  ],
  "difficulty": "{difficulty}",
  "nutritionalInfo": {
    "calories": exact_number,
    "protein": exact_number,
    "carbohydrates": exact_number,
    "fat": exact_number,
    "fiber": minimum_5_or_higher
  }
}`,

		finalMessage: 'Remember: Create a recipe that someone will look forward to eating, make repeatedly, and recommend to friends - not just tolerate because it\'s "healthy." The goal is SUSTAINABLE DIET ADHERENCE through genuine enjoyment.',
	},
};
