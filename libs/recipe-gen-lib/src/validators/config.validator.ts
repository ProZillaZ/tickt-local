import {
	RecipeGenConfig,
	LlmProvider,
	RecipeGenerationError
} from '../models';

/**
 * Validation result containing errors and warnings
 */
export interface ConfigValidationResult {
	isValid: boolean;
	errors: string[];
	warnings: string[];
}

/**
 * Comprehensive configuration validator
 */
export class ConfigValidator {


	/**
	 * Validate Recipe Generation configuration
	 */
	static validateRecipeGenerationConfig(config: RecipeGenConfig): ConfigValidationResult {
		const errors: string[] = [];
		const warnings: string[] = [];

		// Required fields
		if (!config.provider) {
			errors.push('provider is required');
		} else {
			// Validate provider enum
			if (!Object.values(LlmProvider).includes(config.provider)) {
				errors.push(`Invalid provider '${config.provider}'. Valid providers: ${Object.values(LlmProvider).join(', ')}`);
			}
		}

		if (!config.apiKey) {
			errors.push('apiKey is required');
		} else {
			// Validate API key format based on provider
			if (config.provider === LlmProvider.ANTHROPIC && !config.apiKey.startsWith('sk-ant-')) {
				warnings.push('API key format does not match Anthropic provider (should start with sk-ant-)');
			}
			if (config.provider === LlmProvider.OPENAI && !config.apiKey.startsWith('sk-')) {
				warnings.push('API key format does not match OpenAI provider (should start with sk-)');
			}
		}

		// Optional field validation
		if (config.model) {
			if (typeof config.model !== 'string' || config.model.trim().length === 0) {
				errors.push('model must be a non-empty string');
			}
		}

		return {
			isValid: errors.length === 0,
			errors,
			warnings
		};
	}

	/**
	 * Validate configuration and throw error if invalid
	 */
	static validateAndThrow(config: RecipeGenConfig, configType: string): void {
		let result: ConfigValidationResult;

		if (configType === 'recipe-generation') {
			result = this.validateRecipeGenerationConfig(config);
		} else {
			throw RecipeGenerationError.validationError(`Unknown configuration type: ${configType}`);
		}

		if (!result.isValid) {
			const errorMessage = `Invalid ${configType} configuration: ${result.errors.join(', ')}`;
			throw RecipeGenerationError.validationError(errorMessage);
		}

		// Log warnings if present
		if (result.warnings.length > 0) {
			console.warn(`Configuration warnings for ${configType}: ${result.warnings.join(', ')}`);
		}
	}
}
