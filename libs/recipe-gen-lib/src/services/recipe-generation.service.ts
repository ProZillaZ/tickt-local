import { RecipeDto, RecipeGenInputDto } from '@tickt-engineering/types';
import { LoggerInterface, RecipeGenConfig } from '../models';
import { LlmService } from './llm-service';
import { ConfigValidator } from '../validators/config.validator';

export class RecipeGenerationService {
	private llmService: LlmService;
	private logger?: LoggerInterface;

	constructor(
		config: RecipeGenConfig,
		logger?: LoggerInterface,
	) {
		// Validate configuration before initialization
		ConfigValidator.validateAndThrow(config, 'recipe-generation');

		this.logger = logger;
		this.llmService = LlmService.create(config, logger);
	}


	async generateRecipe(input: RecipeGenInputDto): Promise<RecipeDto> {
		this.logger?.log('Starting recipe generation', 'RecipeGenerationService');

		try {
			const recipe = await this.llmService.generateRecipe(input);
			this.logger?.log('Recipe generation completed successfully', 'RecipeGenerationService');
			return recipe;
		} catch (error) {
			this.logger?.error('Failed to generate recipe', error, 'RecipeGenerationService');
			throw error;
		}
	}

}
