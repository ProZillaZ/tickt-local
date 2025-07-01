export enum RecipeGenerationErrorType {
	NETWORK_ERROR = 'NETWORK_ERROR',
	API_RATE_LIMIT = 'API_RATE_LIMIT',
	API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED',
	INVALID_API_KEY = 'INVALID_API_KEY',
	PARSING_ERROR = 'PARSING_ERROR',
	VALIDATION_ERROR = 'VALIDATION_ERROR',
	UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export class RecipeGenerationError extends Error {
	constructor(
		public readonly type: RecipeGenerationErrorType,
		message: string,
		public readonly originalError?: Error,
		public readonly retryable: boolean = false,
	) {
		super(message);
		this.name = 'RecipeGenerationError';
	}

	static networkError(originalError: Error): RecipeGenerationError {
		return new RecipeGenerationError(
			RecipeGenerationErrorType.NETWORK_ERROR,
			`Network error: ${originalError.message}`,
			originalError,
			true,
		);
	}

	static rateLimitError(originalError: Error): RecipeGenerationError {
		return new RecipeGenerationError(
			RecipeGenerationErrorType.API_RATE_LIMIT,
			`API rate limit exceeded: ${originalError.message}`,
			originalError,
			true,
		);
	}

	static invalidApiKeyError(originalError: Error): RecipeGenerationError {
		return new RecipeGenerationError(
			RecipeGenerationErrorType.INVALID_API_KEY,
			`Invalid API key: ${originalError.message}`,
			originalError,
			false,
		);
	}

	static parsingError(originalError: Error, rawResponse?: string): RecipeGenerationError {
		return new RecipeGenerationError(
			RecipeGenerationErrorType.PARSING_ERROR,
			`Failed to parse LLM response: ${originalError.message}${rawResponse ? `. Raw response: ${rawResponse.substring(0, 200)}...` : ''}`,
			originalError,
			false,
		);
	}

	static validationError(message: string): RecipeGenerationError {
		return new RecipeGenerationError(
			RecipeGenerationErrorType.VALIDATION_ERROR,
			`Validation error: ${message}`,
			undefined,
			false,
		);
	}
}
