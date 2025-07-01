import { ImageGenerationConfig } from './image-generation-config.interface';
import { ImageGenerationResult } from './image-generation-result.interface';

export interface IImageProvider {
	generateImage(prompt: string, config: ImageGenerationConfig): Promise<ImageGenerationResult>;

	validateConfig(config: ImageGenerationConfig): boolean;

	getProviderName(): string;
}
