export interface LlmClient {
	generateText(prompt: string, options?: LlmGenOptions): Promise<string>;
}

export interface LlmGenOptions {
	model?: string;
	maxTokens?: number;
	temperature?: number;
}
