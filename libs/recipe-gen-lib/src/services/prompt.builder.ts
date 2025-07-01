import { RecipeGenInputDto } from '@tickt-engineering/types';
import { RecipeGenConfig } from '../config';

/**
 * Simplified prompt builder using template substitution
 */
export class PromptBuilder {
	static build(input: RecipeGenInputDto): string {
		const seed = Math.floor(Math.random() * 1000000);
		const mealContext = RecipeGenConfig.meals.types[input.mealType] || '';
		const difficultyContext = RecipeGenConfig.meals.difficulties[input.difficulty] || '';
		const dietGuidelines = RecipeGenConfig.diets.guidelines[input.dietType] || '';
		const restrictions = RecipeGenConfig.diets.restrictions[input.dietType] || [];

		// Build constraints sections
		const allergiesSection = input.allergies?.length 
			? `\n• Allergies: ${input.allergies.join(', ')} (Ensure ZERO cross-contamination risk)` 
			: '';
		
		const excludedSection = input.dislikedIngredients?.length 
			? `\n• Excluded ingredients: ${input.dislikedIngredients.join(', ')} (Do not use these or similar ingredients)` 
			: '';
		
		const restrictionsSection = restrictions.length 
			? `\n• Restricted ingredients: ${restrictions.join(', ')}` 
			: '';

		const nutritionSection = this.buildNutritionTargets(input);
		const cuisinesText = input.cuisines?.length ? input.cuisines.join(', ') : 'Any - be creative with global flavors';

		return `${RecipeGenConfig.prompts.systemRole}

UNIQUE RECIPE SEED: ${seed}
Use this seed to ensure each recipe is unique. Even with identical requirements, create distinctly different dishes by varying cooking methods, flavor profiles, and key ingredients.

CORE REQUIREMENTS:
• Meal type: ${input.mealType} ${mealContext}
• Difficulty: ${input.difficulty} ${difficultyContext}
• Servings: ${input.servings} (ensure all ingredients scale properly)
• Time limit: ${input.totalTime || 'flexible'} minutes total (prep + cook must not exceed this)
• Cuisine preference: ${cuisinesText}

Dietary Restrictions (MANDATORY - NO EXCEPTIONS):
• Diet type: ${input.dietType}${dietGuidelines}${allergiesSection}${excludedSection}${restrictionsSection}

${nutritionSection}

JSON OUTPUT FORMAT:
${RecipeGenConfig.prompts.jsonTemplate
	.replace('{servings}', input.servings.toString())
	.replace('{mealType}', input.mealType)
	.replace('{dietType}', input.dietType)
	.replace('{difficulty}', input.difficulty)}

${RecipeGenConfig.prompts.finalMessage}`;
	}

	private static buildNutritionTargets(input: RecipeGenInputDto): string {
		const targets = [];
		if (input.calorieTarget) targets.push(`Calories: ${input.calorieTarget}`);
		if (input.proteinTarget) targets.push(`Protein: ${input.proteinTarget}g`);
		if (input.carbsTarget) targets.push(`Carbohydrates: ${input.carbsTarget}g`);
		if (input.fatsTarget) targets.push(`Fats: ${input.fatsTarget}g`);

		return targets.length 
			? `Nutritional Targets (Aim for ±5% accuracy):\n• ${targets.join('\n• ')}`
			: 'Nutritional Targets: Not specified';
	}
}
