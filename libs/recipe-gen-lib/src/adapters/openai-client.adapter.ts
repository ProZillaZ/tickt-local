import { OpenAI } from 'openai';
import { LlmClient, LlmGenOptions, RecipeGenerationError, RecipeGenerationErrorType } from '../models';

export class OpenAIClientAdapter implements LlmClient {
	private client: OpenAI;

	constructor(apiKey: string) {
		this.client = new OpenAI({ apiKey });
	}

	async generateText(prompt: string, options?: LlmGenOptions): Promise<string> {
		try {
			const response = await this.client.chat.completions.create({
				model: options?.model || 'gpt-4',
				messages: [{ role: 'user', content: prompt }],
				temperature: options?.temperature || 0.7,
				max_tokens: options?.maxTokens || 2000,
			});

			const content = response.choices[0]?.message?.content;
			if (!content) {
				throw new Error('Empty response from OpenAI API');
			}

			return content;
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
					return new RecipeGenerationError(RecipeGenerationErrorType.UNKNOWN_ERROR, `OpenAI API error: ${error.message}`, error, false);
			}
		}

		if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
			return RecipeGenerationError.networkError(error);
		}

		return new RecipeGenerationError(RecipeGenerationErrorType.UNKNOWN_ERROR, `Unexpected OpenAI error: ${error.message}`, error, false);
	}
}
