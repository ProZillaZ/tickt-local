import { ImageQuality, ImageSize, ImageStyle } from '@tickt-engineering/image-gen-lib';

export interface ImageGenerationOptions {
	enabled: boolean;
	generateInBackground?: boolean;
	quality?: ImageQuality;
	size?: ImageSize;
	style?: ImageStyle;
}