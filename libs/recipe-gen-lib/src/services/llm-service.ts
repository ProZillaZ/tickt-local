import { RecipeDto, RecipeGenInputDto } from '@tickt-ltd/types';
import { LoggerInterface, LlmClient, RecipeGenerationError, RecipeGenConfig, LlmProvider } from '../models';
import { PromptBuilder } from './prompt.builder';
import { RecipeParserService } from './recipe-parser.service';
import { InputValidator } from '../validators/input.validator';
import { RecipeGenConfig as Config } from '../config';
import { AnthropicClientAdapter } from '../adapters/anthropic-client.adapter';
import { OpenAIClientAdapter } from '../adapters/openai-client.adapter';

export class LlmService {
	private readonly client: LlmClient;
	private readonly config: RecipeGenConfig;
	private readonly parserService: RecipeParserService;
	private readonly logger: LoggerInterface;

	constructor(
		client: LlmClient,
		config: RecipeGenConfig,
		logger?: LoggerInterface,
	) {
		this.client = client;
		this.config = config;
		this.logger = logger || this.createDefaultLogger();
		this.parserService = new RecipeParserService(this.logger);
	}

	/**
	 * Factory method to create LlmService with appropriate adapter
	 */
	static create(config: RecipeGenConfig, logger?: LoggerInterface): LlmService {
		const client = this.createClient(config);
		const enhancedConfig = this.enhanceConfig(config);
		return new LlmService(client, enhancedConfig, logger);
	}

	private static createClient(config: RecipeGenConfig): LlmClient {
		switch (config.provider) {
			case LlmProvider.ANTHROPIC:
				return new AnthropicClientAdapter(config.apiKey);
			case LlmProvider.OPENAI:
				return new OpenAIClientAdapter(config.apiKey);
			default:
				throw new Error(`Unsupported LLM provider: ${config.provider}`);
		}
	}

	private static enhanceConfig(config: RecipeGenConfig): RecipeGenConfig {
		const providerDefaults = config.provider === LlmProvider.ANTHROPIC
			? Config.providers.anthropic
			: Config.providers.openai;

		return {
			...config,
			model: config.model || providerDefaults.model,
			maxTokens: config.maxTokens || providerDefaults.maxTokens,
			temperature: config.temperature || (providerDefaults as any).temperature,
		};
	}

	async generateRecipe(input: RecipeGenInputDto): Promise<RecipeDto> {
		// Validate input
		InputValidator.validateAndThrow(input);

		const retryConfig = Config.retry;
		let lastError: Error | undefined;

		this.logger.log(`Starting recipe generation with ${retryConfig.maxAttempts} max attempts`, 'LLMService');

		for (let attempt = 1; attempt <= retryConfig.maxAttempts; attempt++) {
			try {
				this.logger.log(`Attempt ${attempt}/${retryConfig.maxAttempts}`, 'LLMService');

				// Generate prompt
				const prompt = PromptBuilder.build(input);

				// Call LLM
				const rawResponse = await this.client.generateText(prompt, {
					model: this.config.model,
					maxTokens: this.config.maxTokens,
					temperature: this.config.temperature,
				});

				// Parse and validate response
				const recipe = await this.parserService.parseRecipe(rawResponse);

				this.logger.log('Recipe generation completed successfully', 'LLMService');
				return recipe;

			} catch (error) {
				lastError = error as Error;
				this.logger.warn(`Attempt ${attempt} failed: ${lastError.message}`, 'LLMService');

				// Don't retry certain types of errors
				if (error instanceof RecipeGenerationError && !this.isRetryableError(error)) {
					this.logger.error(`Non-retryable error: ${error.message}`, error, 'LLMService');
					throw error;
				}

				// If this was the last attempt, throw the error
				if (attempt === retryConfig.maxAttempts) {
					break;
				}

				// Wait before retrying with exponential backoff
				const delay = Math.min(
					retryConfig.baseDelay * Math.pow(retryConfig.exponentialBase, attempt - 1),
					retryConfig.maxDelay,
				);

				this.logger.log(`Waiting ${delay}ms before retry...`, 'LLMService');
				await this.delay(delay);
			}
		}

		// All attempts failed
		const finalError = lastError instanceof RecipeGenerationError
			? lastError
			: RecipeGenerationError.parsingError(lastError || new Error('Unknown error'));

		this.logger.error(`All ${retryConfig.maxAttempts} attempts failed: ${finalError.message}`, finalError, 'LLMService');
		throw finalError;
	}

	private isRetryableError(error: RecipeGenerationError): boolean {
		// Don't retry validation errors or configuration errors
		return !['validation', 'configuration'].includes(error.type);
	}

	private async delay(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	private createDefaultLogger(): LoggerInterface {
		return {
			log: (message: string, context?: string) => console.log(`[${context || 'LOG'}] ${message}`),
			error: (message: string, error?: any, context?: string) => console.error(`[${context || 'ERROR'}] ${message}`, error),
			warn: (message: string, context?: string) => console.warn(`[${context || 'WARN'}] ${message}`),
		};
	}
}
