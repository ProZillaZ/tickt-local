import { Logger, FirebaseStorageService, IStorageService } from '@tickt-ltd/services';
import { v4 as uuidv4 } from 'uuid';
import {
	IImageProvider,
	RecipeImageGenerationRequest,
	RecipeImageResult,
	ImageProvider,
} from '../models';
import { OpenAIDalleAdapter } from '../adapters';
import { GoogleImagenAdapter } from '../adapters';

export class ImageGenerationService {
	private providers: Map<ImageProvider, IImageProvider>;
	private storageService: IStorageService;
	private logger: Logger;

	constructor(storageService?: IStorageService) {
		this.logger = new Logger('ImageGenerationService');
		this.storageService = storageService || new FirebaseStorageService();
		this.providers = new Map();
	}

	private initializeProvider(providerType: ImageProvider): IImageProvider {
		if (this.providers.has(providerType)) {
			return this.providers.get(providerType)!;
		}

		let provider: IImageProvider;
		switch (providerType) {
			case ImageProvider.OPENAI_DALLE:
				provider = new OpenAIDalleAdapter();
				break;
			case ImageProvider.GOOGLE_IMAGEN:
				provider = new GoogleImagenAdapter();
				break;
			default:
				throw new Error(`Unknown provider: ${providerType}`);
		}

		this.providers.set(providerType, provider);
		this.logger.info('Provider initialized', { provider: providerType });
		return provider;
	}

	async generateRecipeImage(request: RecipeImageGenerationRequest): Promise<RecipeImageResult> {
		const imageId = uuidv4();

		this.logger.info('Starting recipe image generation', {
			recipeId: request.recipeId,
			imageId,
			provider: request.config.provider,
			prompt: request.prompt.substring(0, 100),
		});

		try {
			const provider = this.getProvider(request.config.provider);

			const generationResult = await provider.generateImage(
				request.prompt,
				request.config,
			);

			const storageResult = await this.storageService.uploadFromUrl(
				generationResult.imageUrl,
				request.recipeId,
				imageId,
				request.storageOptions,
			);

			const result: RecipeImageResult = {
				recipeId: request.recipeId,
				imageId,
				generation: generationResult,
				storage: storageResult,
			};

			this.logger.info('Recipe image generation completed successfully', {
				recipeId: request.recipeId,
				imageId,
				downloadUrl: storageResult.downloadUrl,
			});

			return result;
		} catch (error) {
			this.logger.error('Recipe image generation failed', error instanceof Error ? error : new Error(String(error)), {
				recipeId: request.recipeId,
				imageId,
				provider: request.config.provider,
			});
			throw new Error(`Recipe image generation failed: ${error}`);
		}
	}

	private getProvider(providerType: ImageProvider): IImageProvider {
		return this.initializeProvider(providerType);
	}
}
