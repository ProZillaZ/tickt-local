import { LlmProvider } from '../enums';

export interface RecipeGenConfig {
	provider: LlmProvider;
	apiKey: string;
	model?: string;
	maxTokens?: number;
	temperature?: number;
}
