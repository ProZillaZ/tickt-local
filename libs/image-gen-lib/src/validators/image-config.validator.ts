import {
	ImageGenerationConfig,
	RecipeImageGenerationRequest,
	ImageProvider,
	ImageQuality,
	ImageSize,
	ImageStyle,
} from '../models';

export class ImageConfigValidator {
	static validateImageGenerationConfig(config: ImageGenerationConfig): string[] {
		const errors: string[] = [];

		if (!config.provider) {
			errors.push('Provider is required');
		} else if (!Object.values(ImageProvider).includes(config.provider)) {
			errors.push(`Invalid provider: ${config.provider}`);
		}

		// API key validation - not required for Google Imagen (uses Vertex AI)
		if (config.provider === ImageProvider.OPENAI_DALLE && !config.apiKey) {
			errors.push('API key is required for OpenAI DALL-E provider');
		}

		if (config.provider === ImageProvider.GOOGLE_IMAGEN) {
			const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;
			if (!projectId) {
				errors.push('FIREBASE_PROJECT_ID or GOOGLE_CLOUD_PROJECT environment variable is required for Google Imagen');
			}
		}

		if (!config.quality) {
			errors.push('Quality setting is required');
		} else if (!Object.values(ImageQuality).includes(config.quality)) {
			errors.push(`Invalid quality: ${config.quality}`);
		}

		if (!config.size) {
			errors.push('Size setting is required');
		} else if (!Object.values(ImageSize).includes(config.size)) {
			errors.push(`Invalid size: ${config.size}`);
		}

		if (!config.style) {
			errors.push('Style setting is required');
		} else if (!Object.values(ImageStyle).includes(config.style)) {
			errors.push(`Invalid style: ${config.style}`);
		}

		if (config.maxRetries !== undefined && config.maxRetries < 0) {
			errors.push('Max retries must be non-negative');
		}

		if (config.timeout !== undefined && config.timeout <= 0) {
			errors.push('Timeout must be positive');
		}

		return errors;
	}

	static validateRecipeImageGenerationRequest(request: RecipeImageGenerationRequest): string[] {
		const errors: string[] = [];

		if (!request.recipeId || request.recipeId.trim().length === 0) {
			errors.push('Recipe ID is required');
		}

		if (!request.prompt || request.prompt.trim().length === 0) {
			errors.push('Prompt is required');
		} else if (request.prompt.length > 4000) {
			errors.push('Prompt is too long (max 4000 characters)');
		} else if (request.prompt.length < 10) {
			errors.push('Prompt is too short (min 10 characters)');
		}

		if (!request.config) {
			errors.push('Configuration is required');
		} else {
			errors.push(...this.validateImageGenerationConfig(request.config));
		}

		if (request.storageOptions) {
			if (request.storageOptions.fileName && !/^[\w\-\.]+$/.test(request.storageOptions.fileName)) {
				errors.push('Invalid file name format');
			}

			if (request.storageOptions.folder && request.storageOptions.folder.includes('..')) {
				errors.push('Invalid folder path - cannot contain ".."');
			}
		}

		return errors;
	}

	static isValidImageGenerationConfig(config: ImageGenerationConfig): boolean {
		return this.validateImageGenerationConfig(config).length === 0;
	}
}
