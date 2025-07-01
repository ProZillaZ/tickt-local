import { Anthropic } from '@anthropic-ai/sdk';
import { LlmClient, LlmGenOptions, RecipeGenerationError, RecipeGenerationErrorType } from '../models';

export class AnthropicClientAdapter implements LlmClient {
	private client: Anthropic;

	constructor(apiKey: string) {
		this.client = new Anthropic({ apiKey });
	}

	async generateText(prompt: string, options?: LlmGenOptions): Promise<string> {
		try {
			const response = await this.client.messages.create({
				model: options?.model || 'claude-3-sonnet-20240229',
				max_tokens: options?.maxTokens || 2000,
				messages: [{ role: 'user', content: prompt }],
			});

			if (response.content && response.content.length > 0) {
				const contentItem = response.content[0];
				if (contentItem.type === 'text' && contentItem.text) {
					return contentItem.text;
				}
			}

			throw new Error('Unexpected response format from Anthropic API');
		} catch (error: any) {
			throw this.mapError(error);
		}
	}

	private mapError(error: any): RecipeGenerationError {
		if (error.status) {
			switch (error.status) {
				case 401:
					return RecipeGenerationError.invalidApiKeyError(error);
				case 429:
					return RecipeGenerationError.rateLimitError(error);
				case 500:
				case 502:
				case 503:
				case 504:
					return RecipeGenerationError.networkError(error);
				default:
					return new RecipeGenerationError(RecipeGenerationErrorType.UNKNOWN_ERROR, `Anthropic API error: ${error.message}`, error, false);
			}
		}

		if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
			return RecipeGenerationError.networkError(error);
		}

		return new RecipeGenerationError(RecipeGenerationErrorType.UNKNOWN_ERROR, `Unexpected Anthropic error: ${error.message}`, error, false);
	}
}
