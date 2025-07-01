import OpenAI from 'openai';
import { Logger } from '@tickt-engineering/services';
import {
	IImageProvider,
	ImageGenerationConfig,
	ImageGenerationResult,
	ImageProvider,
	ImageQuality,
	ImageSize,
	ImageStyle,
} from '../models';

export class OpenAIDalleAdapter implements IImageProvider {
	private client: OpenAI;
	private logger: Logger;

	constructor(apiKey?: string) {
		this.client = new OpenAI({
			apiKey: apiKey || process.env.OPENAI_API_KEY,
		});
		this.logger = new Logger('OpenAIDalleAdapter');
	}

	async generateImage(prompt: string, config: ImageGenerationConfig): Promise<ImageGenerationResult> {
		this.logger.info('Generating image with OpenAI DALL-E', {
			prompt: prompt.substring(0, 100),
			config: { ...config, apiKey: '[REDACTED]' },
		});

		if (!this.validateConfig(config)) {
			throw new Error('Invalid configuration for OpenAI DALL-E provider');
		}

		try {
			const response = await this.client.images.generate({
				model: config.model || 'dall-e-3',
				prompt,
				quality: config.quality,
				size: config.size,
				style: config.style,
				n: 1,
			});

			const image = response.data?.[0];
			if (!image?.url) {
				throw new Error('No image URL returned from OpenAI DALL-E');
			}

			const result: ImageGenerationResult = {
				imageUrl: image.url,
				revisedPrompt: image.revised_prompt,
				provider: this.getProviderName(),
				model: config.model || 'dall-e-3',
				metadata: {
					quality: config.quality,
					size: config.size,
					style: config.style,
				},
				generatedAt: new Date(),
			};

			this.logger.info('Image generated successfully', {
				imageUrl: result.imageUrl,
				revisedPrompt: result.revisedPrompt,
			});

			return result;
		} catch (error) {
			this.logger.error('Failed to generate image with OpenAI DALL-E', error instanceof Error ? error : new Error(String(error)));
			throw new Error(`OpenAI DALL-E image generation failed: ${error}`);
		}
	}

	validateConfig(config: ImageGenerationConfig): boolean {
		if (config.provider !== ImageProvider.OPENAI_DALLE) {
			return false;
		}

		if (!config.apiKey) {
			this.logger.error('OpenAI API key is required');
			return false;
		}

		const validQualities = Object.values(ImageQuality);
		if (!validQualities.includes(config.quality)) {
			this.logger.error(`Invalid quality setting for OpenAI DALL-E: ${config.quality}`);
			return false;
		}

		const validSizes = Object.values(ImageSize);
		if (!validSizes.includes(config.size)) {
			this.logger.error(`Invalid size setting for OpenAI DALL-E: ${config.size}`);
			return false;
		}

		const validStyles = Object.values(ImageStyle);
		if (!validStyles.includes(config.style)) {
			this.logger.error(`Invalid style setting for OpenAI DALL-E: ${config.style}`);
			return false;
		}

		return true;
	}

	getProviderName(): string {
		return ImageProvider.OPENAI_DALLE;
	}
}
