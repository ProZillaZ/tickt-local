import { Logger, ServiceFactory, IRecipeService } from '@tickt-engineering/services';
import { UpdateRecipeDto } from '@tickt-engineering/types';
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
	RecipePlating,
	RecipeImageGenerationRequest,
	RecipeImageResult,
} from '../index';

export interface SimpleRecipe {
	id: string;
	name: string;
	description?: string;
	cuisines?: string[];
	ingredients?: Array<{ name: string; amount: number; unit: string }>;
	imageUrl?: string;
	hasImage?: boolean;
}

export interface BatchGenerationOptions {
	maxConcurrency?: number;
	delayBetweenBatches?: number;
	skipExistingImages?: boolean;
	dryRun?: boolean;
	quality?: ImageQuality;
	size?: ImageSize;
	style?: ImageStyle;
}

export interface BatchGenerationProgress {
	total: number;
	completed: number;
	failed: number;
	inProgress: number;
	estimatedTimeRemaining?: number;
	currentRecipe?: string;
}

export interface BatchGenerationResult {
	totalRecipes: number;
	successCount: number;
	failureCount: number;
	skippedCount: number;
	results: (RecipeImageResult | null)[];
	errors: Array<{ recipeId: string; error: string }>;
	duration: number;
}

export class BatchImageGenerationService {
	private logger: Logger;
	private imageService: ImageGenerationService;
	private promptBuilder: PromptBuilderService;
	private recipeService: IRecipeService;

	constructor() {
		this.logger = new Logger('BatchImageGenerationService');
		this.imageService = new ImageGenerationService();
		this.promptBuilder = new PromptBuilderService();
		this.recipeService = ServiceFactory.getInstance().getRecipeService();
	}

	async generateImagesForAllRecipes(
		options: BatchGenerationOptions = {},
	): Promise<BatchGenerationResult> {
		const startTime = Date.now();
		const {
			maxConcurrency = 3,
			delayBetweenBatches = 1000,
			skipExistingImages = true,
			dryRun = false,
			quality = ImageQuality.HD,
			size = ImageSize.PORTRAIT_1024_1792,
			style = ImageStyle.NATURAL,
		} = options;

		this.logger.info('Starting batch image generation for all recipes', {
			maxConcurrency,
			delayBetweenBatches,
			skipExistingImages,
			dryRun,
			quality,
			size,
			style,
		});

		try {
			const allRecipes = await this.fetchRecipesToProcess(skipExistingImages);

			if (allRecipes.length === 0) {
				this.logger.info('No recipes found to process');
				return {
					totalRecipes: 0,
					successCount: 0,
					failureCount: 0,
					skippedCount: 0,
					results: [],
					errors: [],
					duration: Date.now() - startTime,
				};
			}

			this.logger.info(`Found ${allRecipes.length} recipes to process`);

			if (dryRun) {
				this.logger.info('Dry run mode - no images will be generated');
				return {
					totalRecipes: allRecipes.length,
					successCount: 0,
					failureCount: 0,
					skippedCount: allRecipes.length,
					results: [],
					errors: [],
					duration: Date.now() - startTime,
				};
			}

			// Process recipes in batches
			return await this.processBatches(
				allRecipes,
				{ quality, size, style },
				maxConcurrency,
				delayBetweenBatches,
			);

		} catch (error) {
			this.logger.error('Batch image generation failed', error instanceof Error ? error : new Error(String(error)));
			throw new Error(`Batch image generation failed: ${error}`);
		}
	}

	private async fetchRecipesToProcess(skipExistingImages: boolean): Promise<SimpleRecipe[]> {
		this.logger.info('Fetching recipes to process', { skipExistingImages });

		try {
			// Note: RecipeFilter doesn't support imageUrl filtering, so we'll fetch all and filter manually
			const options = { limit: 10000 };

			const result = await this.recipeService.search(undefined, options);

			let recipes: SimpleRecipe[] = result.items.map(recipe => ({
				id: recipe.id!,
				name: recipe.name,
				description: recipe.description,
				cuisines: recipe.cuisines,
				ingredients: recipe.ingredients?.map(ing => ({
					name: ing.name,
					amount: ing.amount,
					unit: ing.unit
				})) || [],
				imageUrl: recipe.imageUrl,
				hasImage: !!recipe.imageUrl,
			}));

			// Filter out recipes with images if requested
			if (skipExistingImages) {
				recipes = recipes.filter(recipe => !recipe.hasImage);
			}

			this.logger.info(`Fetched ${recipes.length} recipes using shared service`);
			return recipes;
		} catch (error) {
			this.logger.error('Failed to fetch recipes', error instanceof Error ? error : new Error(String(error)));
			throw new Error(`Failed to fetch recipes: ${error}`);
		}
	}

	private async processBatches(
		recipes: SimpleRecipe[],
		imageConfig: { quality: ImageQuality; size: ImageSize; style: ImageStyle },
		maxConcurrency: number,
		delayBetweenBatches: number,
	): Promise<BatchGenerationResult> {
		const startTime = Date.now();
		const results: (RecipeImageResult | null)[] = [];
		const errors: Array<{ recipeId: string; error: string }> = [];
		let successCount = 0;
		let failureCount = 0;

		// Process recipes in concurrent batches
		for (let i = 0; i < recipes.length; i += maxConcurrency) {
			const batch = recipes.slice(i, i + maxConcurrency);
			const batchNumber = Math.floor(i / maxConcurrency) + 1;
			const totalBatches = Math.ceil(recipes.length / maxConcurrency);

			this.logger.info(`Processing batch ${batchNumber}/${totalBatches}`, {
				batchSize: batch.length,
				recipesInBatch: batch.map(r => ({ id: r.id, name: r.name })),
			});

			// Process current batch concurrently
			const batchPromises = batch.map(recipe =>
				this.generateImageForRecipe(recipe, imageConfig)
					.then(result => {
						successCount++;
						return result;
					})
					.catch(error => {
						failureCount++;
						errors.push({
							recipeId: recipe.id,
							error: error instanceof Error ? error.message : String(error),
						});
						this.logger.error('Failed to generate image for recipe', error, {
							recipeId: recipe.id,
							recipeName: recipe.name,
						});
						return null;
					}),
			);

			const batchResults = await Promise.all(batchPromises);
			results.push(...batchResults);

			// Log progress
			const totalProcessed = i + batch.length;
			const progress = (totalProcessed / recipes.length) * 100;
			this.logger.info(`Batch ${batchNumber} completed`, {
				batchSuccesses: batchResults.filter(r => r !== null).length,
				batchFailures: batchResults.filter(r => r === null).length,
				totalProgress: `${totalProcessed}/${recipes.length} (${progress.toFixed(1)}%)`,
				successCount,
				failureCount,
			});

			// Add delay between batches (except for the last batch)
			if (i + maxConcurrency < recipes.length && delayBetweenBatches > 0) {
				this.logger.info(`Waiting ${delayBetweenBatches}ms before next batch`);
				await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
			}
		}

		const duration = Date.now() - startTime;
		const result: BatchGenerationResult = {
			totalRecipes: recipes.length,
			successCount,
			failureCount,
			skippedCount: 0,
			results,
			errors,
			duration,
		};

		this.logger.info('Batch image generation completed', {
			totalRecipes: result.totalRecipes,
			successCount: result.successCount,
			failureCount: result.failureCount,
			duration: `${(duration / 1000).toFixed(2)}s`,
			averageTimePerImage: `${(duration / recipes.length / 1000).toFixed(2)}s`,
		});

		return result;
	}

	private async generateImageForRecipe(
		recipe: SimpleRecipe,
		imageConfig: { quality: ImageQuality; size: ImageSize; style: ImageStyle },
	): Promise<RecipeImageResult> {
		this.logger.info('Generating image for recipe', {
			recipeId: recipe.id,
			recipeName: recipe.name,
		});

		try {
			const ingredientNames = recipe.ingredients?.map(ing => ing.name || String(ing)) || [];
			const mainCuisine = recipe.cuisines?.[0] || 'International';

			const prompt = this.promptBuilder.buildRecipeImagePrompt({
				recipeName: recipe.name,
				description: recipe.description || '',
				cuisine: mainCuisine,
				ingredients: ingredientNames,
				style: RecipeStyle.MODERN,
				setting: RecipeSetting.STUDIO,
				lighting: RecipeLighting.WARM,
				plating: RecipePlating.MODERN,
				additionalDetails: 'high-resolution, photorealistic, hot and fresh, perfectly cooked, crispy textures, creamy sauces, tender meat, vibrant colors, served on dark ceramic plates, no white plates, colorful dinnerware, no text, no words, no labels',
			});

			const request: RecipeImageGenerationRequest = {
				recipeId: recipe.id,
				prompt,
				config: {
					provider: ImageProvider.GOOGLE_IMAGEN,
					quality: imageConfig.quality,
					size: imageConfig.size,
					style: imageConfig.style,
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

			const result = await this.imageService.generateRecipeImage(request);

			await this.updateRecipeWithImage(recipe.id, result);

			this.logger.info('Image generated and recipe updated successfully', {
				recipeId: recipe.id,
				imageId: result.imageId,
				downloadUrl: result.storage.downloadUrl,
			});

			return result;
		} catch (error) {
			this.logger.error('Failed to generate image for recipe', error instanceof Error ? error : new Error(String(error)), {
				recipeId: recipe.id,
				recipeName: recipe.name,
			});
			throw error;
		}
	}

	private async updateRecipeWithImage(recipeId: string, imageResult: RecipeImageResult): Promise<void> {
		try {
		const updateData: UpdateRecipeDto = {
				imageUrl: imageResult.storage.downloadUrl,
				// Note: imageId and imageMetadata might not be part of UpdateRecipeDto
				// Will update what's supported by the DTO
			};

			await this.recipeService.update(recipeId, updateData, 'system');

			this.logger.info('Recipe updated with image information', {
				recipeId,
				imageId: imageResult.imageId,
			});
		} catch (error) {
			this.logger.error('Failed to update recipe with image information', error instanceof Error ? error : new Error(String(error)), {
				recipeId,
				imageId: imageResult.imageId,
			});
			// Don't throw here - the image was successfully generated, just the DB update failed
		}
	}

	async getProgress(): Promise<BatchGenerationProgress> {
		// This could be implemented with a progress tracking mechanism
		// For now, return a basic structure
		return {
			total: 0,
			completed: 0,
			failed: 0,
			inProgress: 0,
		};
	}
}
