import { 
    ImageGenerationConfig, 
    RecipeImageGenerationRequest,
    ImageProvider,
    ImageQuality,
    ImageSize,
    ImageStyle 
} from '../../src/models';

export const mockImageGenerationConfig: ImageGenerationConfig = {
    provider: ImageProvider.OPENAI_DALLE,
    model: 'dall-e-3',
    quality: ImageQuality.STANDARD,
    size: ImageSize.SQUARE_1024,
    style: ImageStyle.VIVID,
    apiKey: 'test-api-key',
    maxRetries: 3,
    timeout: 30000,
};

export const mockGoogleImagenConfig: ImageGenerationConfig = {
    provider: ImageProvider.GOOGLE_IMAGEN,
    model: 'imagen-3.0',
    quality: ImageQuality.HD,
    size: ImageSize.SQUARE_1024,
    style: ImageStyle.NATURAL,
    apiKey: 'test-google-api-key',
    maxRetries: 3,
    timeout: 30000,
};

export const mockRecipeImageGenerationRequest: RecipeImageGenerationRequest = {
    recipeId: 'test-recipe-123',
    prompt: 'A delicious chocolate cake with frosting',
    config: mockImageGenerationConfig,
    storageOptions: {
        folder: 'recipes',
        fileName: 'test-image.png',
        metadata: {
            recipeId: 'test-recipe-123',
            generatedBy: 'test'
        }
    }
};

export const mockGoogleImagenRequest: RecipeImageGenerationRequest = {
    recipeId: 'test-recipe-456',
    prompt: 'A beautiful pasta carbonara with fresh herbs',
    config: mockGoogleImagenConfig,
    storageOptions: {
        folder: 'recipes',
        fileName: 'test-imagen.png',
        metadata: {
            recipeId: 'test-recipe-456',
            generatedBy: 'test-imagen'
        }
    }
};