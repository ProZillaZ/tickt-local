import { RecipeDto, RecipeGenInputDto } from '@tickt-engineering/types';
import { LoggerInterface, RecipeGenConfig, ImageGenerationOptions } from '../models';
import { RecipeGenerationService } from './recipe-generation.service';
import { RecipeImageService } from './recipe-image.service';
import { ConfigValidator } from '../validators/config.validator';

export interface RecipeWithImageConfig {
	recipeGeneration: RecipeGenConfig;
	imageGeneration: ImageGenerationOptions;
}

export class RecipeWithImageService {
	private recipeService: RecipeGenerationService;
	private imageService: RecipeImageService;
	private logger?: LoggerInterface;

	constructor(
		config: RecipeWithImageConfig,
		logger?: LoggerInterface,
	) {
		this.logger = logger;
		
		// Validate recipe generation config
		ConfigValidator.validateAndThrow(config.recipeGeneration, 'recipe-generation');
		
		// Initialize services
		this.recipeService = new RecipeGenerationService(config.recipeGeneration, logger);
		this.imageService = new RecipeImageService(logger);
	}

	async generateRecipeWithImage(input: RecipeGenInputDto): Promise<RecipeDto> {
		this.logger?.log('Starting recipe generation with image', 'RecipeWithImageService');

		try {
			// Generate the recipe first
			const recipe = await this.recipeService.generateRecipe(input);
			this.logger?.log('Recipe generation completed, starting image generation', 'RecipeWithImageService');

			// Then generate the image
			const recipeWithImage = await this.imageService.generateImageForRecipe(
				recipe, 
				{ enabled: true, generateInBackground: false }
			);

			this.logger?.log('Recipe and image generation completed successfully', 'RecipeWithImageService');
			return recipeWithImage;
		} catch (error) {
			this.logger?.error('Failed to generate recipe with image', error, 'RecipeWithImageService');
			throw error;
		}
	}

	async generateRecipeWithBackgroundImage(input: RecipeGenInputDto): Promise<RecipeDto> {
		this.logger?.log('Starting recipe generation with background image', 'RecipeWithImageService');

		try {
			// Generate the recipe first
			const recipe = await this.recipeService.generateRecipe(input);
			this.logger?.log('Recipe generation completed, starting background image generation', 'RecipeWithImageService');

			// Generate image in background
			const recipeWithImage = await this.imageService.generateImageForRecipe(
				recipe, 
				{ enabled: true, generateInBackground: true }
			);

			this.logger?.log('Recipe generation completed, image generation started in background', 'RecipeWithImageService');
			return recipeWithImage;
		} catch (error) {
			this.logger?.error('Failed to generate recipe with background image', error, 'RecipeWithImageService');
			throw error;
		}
	}

	async generateRecipeWithCustomImageOptions(
		input: RecipeGenInputDto, 
		imageOptions: ImageGenerationOptions
	): Promise<RecipeDto> {
		this.logger?.log('Starting recipe generation with custom image options', 'RecipeWithImageService');

		try {
			// Generate the recipe first
			const recipe = await this.recipeService.generateRecipe(input);
			
			if (!imageOptions.enabled) {
				this.logger?.log('Image generation disabled, returning recipe only', 'RecipeWithImageService');
				return recipe;
			}

			this.logger?.log('Recipe generation completed, starting custom image generation', 'RecipeWithImageService');

			// Generate image with custom options
			const recipeWithImage = await this.imageService.generateImageForRecipe(recipe, imageOptions);

			this.logger?.log('Recipe and custom image generation completed successfully', 'RecipeWithImageService');
			return recipeWithImage;
		} catch (error) {
			this.logger?.error('Failed to generate recipe with custom image options', error, 'RecipeWithImageService');
			throw error;
		}
	}
}