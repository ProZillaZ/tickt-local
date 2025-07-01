# Recipe Generation Library

**Simplified & Streamlined** AI-powered recipe generation library for the Tickt ecosystem. This library provides a clean, framework-agnostic solution for generating recipes using Large Language Models (LLMs) like Anthropic Claude and OpenAI GPT.

## Features

- 🤖 **Multiple LLM Providers**: Unified service supporting both Anthropic Claude and OpenAI GPT
- 🍽️ **Diet-Aware**: Intelligent recipe generation based on dietary preferences and restrictions
- 🎯 **Nutritionally Balanced**: Automatic macro and micronutrient calculation
- 🔄 **Built-in Retry Logic**: Exponential backoff and intelligent error handling
- 📦 **Framework Agnostic**: Pure TypeScript, works with any Node.js application
- 🧪 **Type Safe**: Full TypeScript support with comprehensive type definitions
- ⚡ **Minimalist Design**: Clean API with only essential functionality exposed

## Installation

```bash
yarn add @tickt-engineering/recipe-gen-lib
```

Or with npm:
```bash
npm install @tickt-engineering/recipe-gen-lib
```

## Quick Start

```typescript
import { RecipeGenerationService, LlmProvider } from '@tickt-engineering/recipe-gen-lib';
import { DietType, MealType } from '@tickt-engineering/nutrition-types';
import { Difficulty } from '@tickt-engineering/recipe-types';

// Initialize the service with simplified configuration
const recipeService = new RecipeGenerationService({
  provider: LlmProvider.ANTHROPIC, // or LlmProvider.OPENAI
  apiKey: 'your-api-key-here',
  model: 'claude-3-sonnet-20240229' // optional - uses sensible defaults
});

// Generate a recipe with automatic retry logic
const recipe = await recipeService.generateRecipe({
  dietType: DietType.VEGETARIAN,
  mealType: MealType.DINNER,
  difficulty: Difficulty.EASY,
  calorieTarget: 500,
  proteinTarget: 25,
  carbsTarget: 60,
  fatsTarget: 15,
  totalTime: 30,
  servings: 2,
  allergies: ['nuts'],
  preferredCuisines: ['mediterranean'],
  dislikedIngredients: ['mushrooms']
});

console.log(`Generated: ${recipe.name}`);
console.log(`Prep time: ${recipe.prepTime} minutes`);
console.log(`Serves: ${recipe.servings}`);
```

## Configuration

### Environment Variables

```bash
export LLM_PROVIDER="anthropic"  # or "openai"
export LLM_API_KEY="your-api-key-here"
export LLM_MODEL="claude-3-sonnet-20240229"  # optional
```

### Configuration Object

```typescript
interface RecipeGenConfig {
  provider: LlmProvider;
  apiKey: string;
  model?: string; // optional - uses provider defaults
  maxTokens?: number; // optional - uses provider defaults
  temperature?: number; // optional - uses provider defaults (OpenAI only)
}
```

## API Reference

### RecipeGenerationService

The main service class for generating recipes.

#### Constructor

```typescript
new RecipeGenerationService(config: RecipeGenConfig, logger?: LoggerInterface)
```

#### Methods

##### `generateRecipe(input: RecipeGenInputDto): Promise<RecipeDto>`

Generates a single recipe based on the provided input parameters.

### RecipeGenInputDto

Input parameters for recipe generation:

```typescript
interface RecipeGenInputDto {
  dietType: DietType;           // standard, vegan, vegetarian, pescatarian
  mealType: MealType;           // breakfast, lunch, dinner, snack
  difficulty: Difficulty;       // easy, medium, hard, pro
  calorieTarget?: number;       // target calories
  proteinTarget: number;        // target protein in grams
  carbsTarget?: number;         // target carbs in grams
  fatsTarget?: number;          // target fats in grams
  totalTime: number;            // total cooking time in minutes
  servings: number;             // number of servings
  allergies?: string[];         // list of allergies to avoid
  preferredCuisines?: string[]; // preferred cuisine types
  dislikedIngredients?: string[]; // ingredients to avoid
}
```

## Advanced Usage

### Custom Logger

```typescript
const customLogger = {
  log: (message: string, context?: string) => console.log(`[${context}] ${message}`),
  error: (message: string, error?: any, context?: string) => console.error(`[${context}] ${message}`, error),
  warn: (message: string, context?: string) => console.warn(`[${context}] ${message}`)
};

const service = new RecipeGenerationService(config, customLogger);
```

### Using LLM Service Directly

```typescript
import { LlmService, LlmProvider } from '@tickt-engineering/recipe-gen-lib';

// Create LLM service directly using built-in factory method
const llmService = LlmService.create({
  provider: LlmProvider.ANTHROPIC,
  apiKey: 'your-api-key',
  model: 'claude-3-sonnet-20240229'
});

// Use directly with built-in retry logic
const recipe = await llmService.generateRecipe(input);
```

### Custom Prompt Building

```typescript
import { PromptBuilder } from '@tickt-engineering/recipe-gen-lib';

// Build custom prompts
const prompt = PromptBuilder.build({
  dietType: DietType.VEGAN,
  mealType: MealType.LUNCH,
  difficulty: Difficulty.EASY,
  servings: 2,
  calorieTarget: 400,
  proteinTarget: 15,
  totalTime: 30
});

console.log(prompt); // Complete LLM prompt ready for generation
```

### Error Handling

The library includes automatic retry logic with exponential backoff, but you can still handle errors:

```typescript
import { RecipeGenerationError } from '@tickt-engineering/recipe-gen-lib';

try {
  const recipe = await recipeService.generateRecipe(input);
  console.log('Recipe generated successfully:', recipe.name);
} catch (error) {
  if (error instanceof RecipeGenerationError) {
    switch (error.type) {
      case 'invalid_api_key':
        console.error('Invalid API key provided');
        break;
      case 'rate_limit':
        console.error('Rate limit exceeded - automatic retries failed');
        break;
      case 'network_error':
        console.error('Network error - check your connection');
        break;
      default:
        console.error('Recipe generation failed:', error.message);
    }
  } else {
    console.error('Unexpected error:', error.message);
  }
}
```

## Scripts

### Generate Sample Recipes

The library includes a script to generate sample recipes:

```bash
# Set your API key
export LLM_API_KEY="your-api-key-here"

# Generate 5 sample recipes (default)
yarn generate-recipes

# Generate custom number of recipes
export RECIPE_COUNT="10"
yarn generate-recipes
```

This will create JSON files with generated recipes in the `generated-recipes/` directory:
- Individual recipe files: `recipe-1-name.json` (clean recipe content only)
- Combined files: `all-recipes.json` (with metadata) & `recipes-only.json` (clean)

## Supported Diet Types

- **Standard**: Balanced omnivorous diet
- **Vegetarian**: No meat, poultry, or fish
- **Vegan**: No animal products
- **Pescatarian**: Fish and seafood allowed, no other meat

## Supported Meal Types

- **Breakfast**: Morning meals (300-600 calories)
- **Lunch**: Midday meals (400-700 calories)
- **Dinner**: Evening meals (500-900 calories)
- **Snack**: Small portions (100-300 calories)

## Difficulty Levels

- **Easy**: Minimal prep, basic techniques, common ingredients
- **Medium**: Some knife skills, 2-3 cooking methods, moderate timing
- **Hard**: Advanced techniques, precise timing, multiple components
- **Pro**: Professional techniques, complex timing, specialty equipment

## Architecture

The library follows a clean, layered architecture:

- **`RecipeGenerationService`**: High-level service for recipe generation
- **`LlmService`**: Core service handling LLM communication with retry logic
- **`PromptBuilder`**: Generates optimized prompts for diet adherence
- **`RecipeParserService`**: Parses and validates LLM responses
- **Adapters**: Provider-specific implementations (Anthropic, OpenAI)

## Development

### Building

```bash
yarn build
```

### Testing

```bash
yarn test
```

## License

All Rights Reserved - Tickt Engineering

## Support

For issues and questions, please visit our [GitHub Issues](https://github.com/tickt-engineering/tickt/issues) page.