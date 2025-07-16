import { GoogleGenAI } from '@google/genai';
import { Logger } from '@tickt-ltd/services';
import {
	IImageProvider,
	ImageGenerationConfig,
	ImageGenerationResult,
	ImageProvider,
	ImageQuality,
	ImageSize,
	ImageStyle,
} from '../models';

export class GoogleImagenAdapter implements IImageProvider {
	private logger: Logger;
	// @ts-ignore
	private client: GoogleGenAI;

	constructor() {
		this.logger = new Logger('GoogleImagenAdapter');
		this.initializeClient();
	}

	private initializeClient(): void {
		const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;
		const location = process.env.FIREBASE_REGION || process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

		if (!projectId) {
			throw new Error('FIREBASE_PROJECT_ID or GOOGLE_CLOUD_PROJECT environment variable is required');
		}

		this.client = new GoogleGenAI({
			vertexai: true,
			project: projectId,
			location: location,
			apiVersion: 'v1',
		});

		this.logger.info('Google Imagen 4 client initialized', { projectId, location });
	}

	async generateImage(prompt: string, config: ImageGenerationConfig): Promise<ImageGenerationResult> {
		this.logger.info('Generating image with Google Imagen 4', {
			prompt: prompt.substring(0, 100),
			config: { ...config, apiKey: '[REDACTED]' },
		});

		if (!this.validateConfig(config)) {
			throw new Error('Invalid configuration for Google Imagen provider');
		}

		try {
			// Map our config to Imagen 4 parameters
			const aspectRatio = this.mapSizeToAspectRatio(config.size);
			const guidanceScale = this.mapQualityToGuidanceScale(config.quality, config.style);

			this.logger.debug('Generating with Imagen 4 parameters', {
				aspectRatio,
				guidanceScale,
				model: 'imagen-4.0-generate-preview-05-20',
			});

			// Generate the image using the new SDK
			const response = await this.client.models.generateImages({
				model: 'imagen-4.0-generate-preview-05-20',
				prompt: prompt,
				config: {
					numberOfImages: 1,
					aspectRatio: aspectRatio,
					guidanceScale: guidanceScale,
					outputMimeType: 'image/png',
					includeRaiReason: true,
					// Remove seed parameter as it conflicts with watermark
					// Add quality and style-specific negative prompts
					...(this.getQualityNegativePrompt(config.quality, config.style) && {
						negativePrompt: this.getQualityNegativePrompt(config.quality, config.style),
					}),
				},
			});

			if (!response.generatedImages || response.generatedImages.length === 0) {
				throw new Error('No images generated - possible content filtering or safety check');
			}

			const generatedImage = response.generatedImages[0];

			if (!generatedImage.image?.imageBytes) {
				throw new Error('No image data in response');
			}

			// Convert base64 to data URL
			const imageUrl = `data:image/png;base64,${generatedImage.image.imageBytes}`;

			const result: ImageGenerationResult = {
				imageUrl,
				revisedPrompt: prompt, // Imagen 4 doesn't typically revise prompts
				provider: this.getProviderName(),
				model: 'imagen-4.0-generate-preview-05-20',
				metadata: {
					quality: config.quality,
					size: config.size,
					style: config.style,
					aspectRatio,
					guidanceScale,
				},
				generatedAt: new Date(),
			};

			this.logger.info('Image generated successfully with Google Imagen 4', {
				imageUrl: 'data:image/png;base64,[BASE64_DATA]',
				metadata: result.metadata,
			});

			return result;
		} catch (error) {
			this.logger.error('Failed to generate image with Google Imagen 4', error instanceof Error ? error : new Error(String(error)));

			if (error instanceof Error) {
				if (error.message.includes('PERMISSION_DENIED')) {
					throw new Error('Permission denied. Please check your Google Cloud IAM roles and ensure Vertex AI API is enabled.');
				} else if (error.message.includes('UNAUTHENTICATED')) {
					throw new Error('Authentication failed. Please check your Google Cloud credentials.');
				} else if (error.message.includes('RESOURCE_EXHAUSTED')) {
					throw new Error('Quota exceeded. Please try again later or check your Vertex AI quotas.');
				}
			}

			throw new Error(`Google Imagen 4 image generation failed: ${error}`);
		}
	}

	validateConfig(config: ImageGenerationConfig): boolean {
		if (config.provider !== ImageProvider.GOOGLE_IMAGEN) {
			return false;
		}

		// For Vertex AI, we don't need an API key in config, but we need Firebase/Google Cloud project
		const projectId = process.env.FIREBASE_PROJECT_ID || process.env.GOOGLE_CLOUD_PROJECT;
		if (!projectId) {
			this.logger.error('FIREBASE_PROJECT_ID or GOOGLE_CLOUD_PROJECT environment variable is required');
			return false;
		}

		const validQualities = Object.values(ImageQuality);
		if (!validQualities.includes(config.quality)) {
			this.logger.error(`Invalid quality setting for Google Imagen: ${config.quality}`);
			return false;
		}

		const validSizes = Object.values(ImageSize);
		if (!validSizes.includes(config.size)) {
			this.logger.error(`Invalid size setting for Google Imagen: ${config.size}`);
			return false;
		}

		const validStyles = Object.values(ImageStyle);
		if (!validStyles.includes(config.style)) {
			this.logger.error(`Invalid style setting for Google Imagen: ${config.style}`);
			return false;
		}

		return true;
	}

	getProviderName(): string {
		return ImageProvider.GOOGLE_IMAGEN;
	}

	private mapSizeToAspectRatio(size: ImageSize): '1:1' | '9:16' | '16:9' | '3:4' | '4:3' {
		switch (size) {
			case ImageSize.SQUARE_1024:
				return '1:1';
			case ImageSize.LANDSCAPE_1792_1024:
				return '16:9';
			case ImageSize.PORTRAIT_1024_1792:
				return '9:16';
			default:
				return '1:1';
		}
	}

	private mapQualityToGuidanceScale(quality: ImageQuality, style: ImageStyle): number {
		// Base guidance scale on quality
		let baseScale = quality === ImageQuality.HD ? 10 : 7;

		// Adjust based on style
		switch (style) {
			case ImageStyle.VIVID:
				return baseScale + 2; // Higher guidance for more vivid, stylized results
			case ImageStyle.NATURAL:
				return baseScale - 1; // Lower guidance for more natural results
			default:
				return baseScale;
		}
	}

	private getQualityNegativePrompt(quality: ImageQuality, style: ImageStyle): string | undefined {
		const negativeTerms: string[] = [];

		// Always exclude low quality artifacts
		negativeTerms.push('blurry', 'low quality', 'pixelated', 'distorted');

		// For HD quality, be more strict
		if (quality === ImageQuality.HD) {
			negativeTerms.push('noise', 'grain', 'artifacts', 'compression');
		}

		// For natural style, exclude artificial elements
		if (style === ImageStyle.NATURAL) {
			negativeTerms.push('artificial', 'synthetic', 'cartoon', 'illustration');
		}

		return negativeTerms.length > 0 ? negativeTerms.join(', ') : undefined;
	}
}
