import { ImageProvider, ImageQuality, ImageSize, ImageStyle } from '../enums';

export interface ImageGenerationConfig {
	provider: ImageProvider;
	model?: string;
	quality: ImageQuality;
	size: ImageSize;
	style: ImageStyle;
	apiKey: string;
	maxRetries?: number;
	timeout?: number;
}

export interface RecipeImageGenerationRequest {
	recipeId: string;
	prompt: string;
	config: ImageGenerationConfig;
	storageOptions?: {
		folder?: string;
		fileName?: string;
		metadata?: Record<string, string>;
	};
}
