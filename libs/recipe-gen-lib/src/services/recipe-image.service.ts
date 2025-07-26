import { RecipeDto } from '@tickt-ltd/types';
import {
	ImageGenerationService,
	PromptBuilderService,
	ImageProvider,
	ImageQuality,
	ImageSize,
	ImageStyle,
	RecipeStyle,
	RecipeSetting,
	RecipeLighting,
	RecipePlating
} from '@tickt-ltd/image-gen-lib';
import { LoggerInterface, ImageGenerationOptions } from '../models';

export class RecipeImageService {
	private logger?: LoggerInterface;
	private imageService: ImageGenerationService;
	private promptBuilder: PromptBuilderService;

	constructor(logger?: LoggerInterface) {
		this.logger = logger;
		this.imageService = new ImageGenerationService();
		this.promptBuilder = new PromptBuilderService();
	}

	async generateImageForRecipe(
		recipe: RecipeDto,
		options: ImageGenerationOptions
	): Promise<RecipeDto> {
		if (!options.enabled) {
			this.logger?.log('Image generation disabled', 'RecipeImageService');
			return recipe;
		}

		this.logger?.log(`Generating image for recipe: ${recipe.name}`, 'RecipeImageService');

		if (options.generateInBackground) {
			this.generateImageInBackground(recipe, options);
			return recipe;
		}

		try {
			return await this.performImageGeneration(recipe, options);
		} catch (error) {
			this.logger?.error('Image generation failed, returning recipe without image', error, 'RecipeImageService');
			return recipe;
		}
	}

	private async generateImageInBackground(recipe: RecipeDto, options: ImageGenerationOptions): Promise<void> {
		this.performImageGeneration(recipe, options)
			.then(() => {
				this.logger?.log(`Background image generation completed for recipe: ${recipe.name}`, 'RecipeImageService');
			})
			.catch(error => {
				this.logger?.error('Background image generation failed', error, 'RecipeImageService');
			});
	}

	private async performImageGeneration(recipe: RecipeDto, options: ImageGenerationOptions): Promise<RecipeDto> {
		const ingredientNames = recipe.ingredients?.map(ing => ing.name) || [];
		const mainCuisine = recipe.cuisines?.[0] || 'International';

		const prompt = this.promptBuilder.buildRecipeImagePrompt({
			recipeName: recipe.name,
			description: recipe.description,
			cuisine: mainCuisine,
			ingredients: ingredientNames,
			style: RecipeStyle.MODERN,
			setting: RecipeSetting.STUDIO,
			lighting: RecipeLighting.WARM,
			plating: RecipePlating.MODERN,
			additionalDetails: 'high-resolution, photorealistic, hot and fresh, perfectly cooked, crispy textures, creamy sauces, tender meat, vibrant colors, served on dark ceramic plates, no white plates, colorful dinnerware, no text, no words, no labels',
		});

		const generationRequest = {
			recipeId: recipe.id || 'temp-recipe',
			prompt,
			config: {
				provider: ImageProvider.GOOGLE_IMAGEN,
				quality: options.quality || ImageQuality.HD,
				size: options.size || ImageSize.PORTRAIT_1024_1792,
				style: options.style || ImageStyle.NATURAL,
				apiKey: 'not-needed-for-vertex-ai',
			},
			storageOptions: {
				folder: 'recipes',
				metadata: {
					recipeName: recipe.name,
					cuisine: mainCuisine,
					generatedAt: new Date().toISOString(),
				},
			},
		};

		const result = await this.imageService.generateRecipeImage(generationRequest);

		this.logger?.log(`Image generated successfully for recipe: ${recipe.name}`, 'RecipeImageService');

		return {
			...recipe,
			imageUrl: result.storage.downloadUrl,
		};
	}
}
