# @tickt-engineering/image-gen-lib

A modular, extensible, and reusable library for generating high-quality, photorealistic images of recipes using AI image generation providers. Part of the Tickt Engineering ecosystem.

## Features

- 🖼️ **High-Quality Image Generation**: Generate photorealistic recipe images using AI providers (OpenAI DALL-E, Google Imagen)
- 🔧 **Modular Architecture**: Independently maintainable and testable components
- 🔗 **Extensible Design**: Easy to integrate additional image generation providers
- ♻️ **Reusable**: Designed for use across multiple applications and projects
- 🔥 **Shared Services Integration**: Uses `@tickt-engineering/services` for consistent database operations
- 🚀 **Batch Processing**: Generate images for multiple recipes with concurrency control
- 📱 **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- ✅ **Validation**: Built-in request and configuration validation
- 🎨 **Smart Prompting**: Advanced prompt building for optimal image generation
- 📊 **Progress Tracking**: Real-time batch processing progress and error handling

## Installation

```bash
yarn add @tickt-engineering/image-gen-lib
```

### Dependencies

This library requires the Tickt Engineering shared packages:

```bash
yarn add @tickt-engineering/services @tickt-engineering/types
```

## Recent Updates (v2.x)

### What's New

- ✨ **Shared Services Integration**: Migrated from direct Firestore access to use `@tickt-engineering/services`
- 🚀 **Enhanced Batch Processing**: Improved concurrency control and error handling
- 🔧 **Better Type Safety**: Full integration with `@tickt-engineering/types`
- 📊 **Progress Tracking**: Real-time batch generation progress monitoring
- 🛠️ **Service Factory Pattern**: Proper dependency injection and service management

### Migration from v1.x

If upgrading from v1.x, the `BatchImageGenerationService` now requires proper shared services initialization:

```typescript
// Before (v1.x) - Direct Firestore
import { BatchImageGenerationService } from '@tickt-engineering/image-gen-lib';
const batchService = new BatchImageGenerationService(); // This will now fail

// After (v2.x) - Shared Services
import { BatchImageGenerationService } from '@tickt-engineering/image-gen-lib';
import { initializeFirestoreServices } from '@tickt-engineering/services';

// Initialize shared services first
initializeFirestoreServices(firebaseModules);

// Then create batch service
const batchService = new BatchImageGenerationService(); // Now works properly
```

## Quick Start

### Using OpenAI DALL-E

```typescript
import { 
  ImageGenerationService, 
  PromptBuilderService,
  ImageProvider,
  ImageQuality,
  ImageSize,
  ImageStyle 
} from '@tickt-engineering/image-gen-lib';

// Initialize services
const imageService = new ImageGenerationService();
const promptBuilder = new PromptBuilderService();

// Generate a recipe image with DALL-E
const config = {
  provider: ImageProvider.OPENAI_DALLE,
  quality: ImageQuality.HD,
  size: ImageSize.SQUARE_1024,
  style: ImageStyle.VIVID,
  apiKey: process.env.OPENAI_API_KEY!,
};

const prompt = promptBuilder.buildSimplePrompt(
  'Chocolate Chip Cookies',
  'freshly baked with golden edges'
);

const request = {
  recipeId: 'recipe-123',
  prompt,
  config,
  storageOptions: {
    folder: 'recipes',
    metadata: { type: 'recipe-image' }
  }
};

const result = await imageService.generateRecipeImage(request);
console.log('Image URL:', result.storage.downloadUrl);
```

### Using Google Imagen via GenKit

```typescript
import { 
  ImageGenerationService,
  ImageProvider,
  ImageQuality,
  ImageSize,
  ImageStyle,
  initializeGenKit
} from '@tickt-engineering/image-gen-lib';

// Initialize GenKit (optional - done automatically)
initializeGenKit({
  projectId: 'your-firebase-project-id',
  apiKey: process.env.GOOGLE_AI_API_KEY
});

// Generate a recipe image with Imagen
const config = {
  provider: ImageProvider.GOOGLE_IMAGEN,
  quality: ImageQuality.HD,
  size: ImageSize.SQUARE_1024,
  style: ImageStyle.NATURAL,
  apiKey: process.env.GOOGLE_AI_API_KEY!,
};

const result = await imageService.generateRecipeImage({
  recipeId: 'recipe-456',
  prompt: 'A beautiful pasta carbonara with fresh herbs',
  config
});
```

### Batch Image Generation

Generate images for multiple recipes efficiently with built-in concurrency control:

```typescript
import { 
  BatchImageGenerationService,
  BatchGenerationOptions,
  ImageProvider,
  ImageQuality,
  ImageSize,
  ImageStyle
} from '@tickt-engineering/image-gen-lib';

// Initialize shared services (required for batch processing)
import { ServiceFactory, initializeFirestoreServices } from '@tickt-engineering/services';

// Setup database connection (one-time setup)
const firebase = {
  // Your Firebase modules - see shared/services documentation
};
initializeFirestoreServices(firebase);

// Create batch service
const batchService = new BatchImageGenerationService();

// Configure batch options
const options: BatchGenerationOptions = {
  maxConcurrency: 3,           // Process 3 images at once
  delayBetweenBatches: 1000,   // 1 second delay between batches
  skipExistingImages: true,    // Skip recipes that already have images
  dryRun: false,              // Set true to test without generating
  quality: ImageQuality.HD,
  size: ImageSize.PORTRAIT_1024_1792,
  style: ImageStyle.NATURAL
};

// Generate images for all recipes in database
const result = await batchService.generateImagesForAllRecipes(options);

console.log(`Generated ${result.successCount} images successfully`);
console.log(`Failed: ${result.failureCount}, Duration: ${result.duration}ms`);

// Handle errors
result.errors.forEach(error => {
  console.error(`Recipe ${error.recipeId}: ${error.error}`);
});
```

### Real-time Progress Tracking

```typescript
// Start batch generation in background
const batchPromise = batchService.generateImagesForAllRecipes(options);

// Check progress periodically
const progressInterval = setInterval(async () => {
  const progress = await batchService.getProgress();
  const percentage = (progress.completed / progress.total) * 100;
  console.log(`Progress: ${percentage.toFixed(1)}% (${progress.completed}/${progress.total})`);
  
  if (progress.completed === progress.total) {
    clearInterval(progressInterval);
  }
}, 5000); // Check every 5 seconds

const finalResult = await batchPromise;
```

## Architecture

### Core Components

- **ImageGenerationService**: Main orchestrator for image generation workflows
- **PromptBuilderService**: Intelligent prompt construction for optimal results  
- **BatchImageGenerationService**: Handles large-scale image generation with concurrency control
- **Adapters**: Provider-specific implementations (OpenAI DALL-E, Google Imagen)
- **Validators**: Request and configuration validation
- **Storage Integration**: Uses `@tickt-engineering/services` for Firebase Storage operations

### Shared Services Integration

This library leverages the Tickt Engineering shared services ecosystem:

- **Database Operations**: Uses `@tickt-engineering/services` for recipe data access
- **Type Safety**: Leverages `@tickt-engineering/types` for consistent data models
- **Service Factory Pattern**: Proper dependency injection and service management
- **Consistent Logging**: Unified logging across all Tickt Engineering packages

### Supported Providers

- ✅ **OpenAI DALL-E 3**: High-quality image generation
- ✅ **Google Imagen 3**: Advanced AI image generation via Firebase GenKit
- 🔄 **Extensible**: Easy to add Stability AI, Midjourney, and other providers

### Dependencies

```json
{
  "@tickt-engineering/services": "^2.3.0",
  "@tickt-engineering/types": "^1.0.1"
}
```

## Configuration

### Image Generation Config

```typescript
interface ImageGenerationConfig {
  provider: ImageProvider;
  model?: string;
  quality: ImageQuality;
  size: ImageSize;
  style: ImageStyle;
  apiKey: string;
  maxRetries?: number;
  timeout?: number;
}
```

### Advanced Prompt Options

```typescript
import { RecipeStyle, RecipeSetting, RecipeLighting, RecipePlating } from '@tickt-engineering/image-gen-lib';

const promptOptions = {
  recipeName: 'Beef Wellington',
  description: 'perfectly cooked medium-rare',
  cuisine: 'British',
  ingredients: ['beef tenderloin', 'puff pastry', 'mushroom duxelles'],
  style: RecipeStyle.PROFESSIONAL,
  setting: RecipeSetting.RESTAURANT,
  lighting: RecipeLighting.NATURAL,
  plating: RecipePlating.ELEGANT,
  additionalDetails: 'garnished with microgreens'
};

const prompt = promptBuilder.buildRecipeImagePrompt(promptOptions);
```

## Storage Structure

Images are automatically stored in Firebase Storage with the following structure:

```
recipes/
├── {recipeId}/
│   ├── {imageId}.png
│   └── metadata
```

## Error Handling

The library includes comprehensive error handling and validation:

```typescript
import { ImageConfigValidator } from '@tickt-engineering/image-gen-lib';

// Validate configuration
const errors = ImageConfigValidator.validateImageGenerationConfig(config);
if (errors.length > 0) {
  console.error('Configuration errors:', errors);
}

// Validate request
const isValid = ImageConfigValidator.isValidRecipeImageGenerationRequest(request);
```

## Extending with Custom Providers

```typescript
import { IImageProvider, ImageGenerationConfig, ImageGenerationResult } from '@tickt-engineering/image-gen-lib';

class CustomProvider implements IImageProvider {
  async generateImage(prompt: string, config: ImageGenerationConfig): Promise<ImageGenerationResult> {
    // Your implementation
  }
  
  validateConfig(config: ImageGenerationConfig): boolean {
    // Your validation logic
  }
  
  getProviderName(): string {
    return 'custom-provider';
  }
}

// Add to service
const imageService = new ImageGenerationService();
imageService.addProvider(ImageProvider.CUSTOM, new CustomProvider());
```

## Testing the Library

### Quick Start Test

1. **Setup environment variables:**
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API keys
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
FIREBASE_PROJECT_ID=your_firebase_project_id
```

2. **Install dependencies:**
```bash
cd libs/image-gen-lib
yarn install
```

3. **Run a quick test:**
```bash
# Quick test with one provider (uses whichever API key is available)
yarn test:quick

# Full test with both providers and batch generation
yarn test:generation
```

### Manual Testing

Create a simple test file:

```typescript
// test-my-images.ts
import { ImageGenerationService, ImageProvider, ImageQuality, ImageSize, ImageStyle } from '@tickt-engineering/image-gen-lib';

async function generateMyImage() {
    const service = new ImageGenerationService();
    
    const result = await service.generateRecipeImage({
        recipeId: 'my-test-recipe',
        prompt: 'A delicious chocolate cake with strawberries',
        config: {
            provider: ImageProvider.OPENAI_DALLE, // or ImageProvider.GOOGLE_IMAGEN
            quality: ImageQuality.HD,
            size: ImageSize.SQUARE_1024,
            style: ImageStyle.VIVID,
            apiKey: process.env.OPENAI_API_KEY! // or GOOGLE_AI_API_KEY
        }
    });
    
    console.log('Image URL:', result.storage.downloadUrl);
    return result;
}

generateMyImage().catch(console.error);
```

Run with: `npx ts-node test-my-images.ts`

### Expected Output

When successful, you'll see:
- ✅ Detailed generation logs
- 🔗 **Firebase Storage download URL** (click to view your image!)
- 📁 Storage path in format: `recipes/{recipeId}/{imageId}.png`
- 🎯 Provider information and metadata

### Viewing Your Generated Images

1. **Direct URL**: Copy the `downloadUrl` from the output and paste in your browser
2. **Firebase Console**: Go to Firebase Storage → `recipes/` folder
3. **Storage Path**: Images are organized as `recipes/{recipeId}/{imageId}.png`

## Development

```bash
# Install dependencies
yarn install

# Build the library
yarn build

# Run unit tests
yarn test

# Run tests with coverage
yarn test:coverage

# Test actual image generation
yarn test:generation

# Quick image generation test
yarn test:quick

# Lint code
yarn lint
```

### Troubleshooting

**"RecipeService implementation not registered" errors:**
- Initialize shared services before using `BatchImageGenerationService`
- Call `initializeFirestoreServices(firebaseModules)` first
- Ensure proper Firebase modules are passed to initialization

**"No API key" errors:**
- Ensure `.env` file has correct API keys
- Check environment variables: `echo $OPENAI_API_KEY`

**Firebase errors:**
- Verify `FIREBASE_PROJECT_ID` is set
- Ensure Firebase Storage is enabled in your project
- Check Firebase permissions for your service account

**GenKit initialization errors:**
- Verify Google AI API key is valid
- Ensure Firebase project supports GenKit (newer projects work best)

**Shared services errors:**
- Verify `@tickt-engineering/services` and `@tickt-engineering/types` are installed
- Check that shared services are properly initialized before batch operations
- Ensure database adapters have proper Firebase configuration

## Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_REGION=us-central1
```

## License

All Rights Reserved - Tickt Engineering