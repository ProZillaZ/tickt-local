export interface ImageGenerationResult {
	imageUrl: string;
	revisedPrompt?: string;
	provider: string;
	model?: string;
	metadata?: Record<string, any>;
	generatedAt: Date;
}

export interface StorageUploadResult {
	downloadUrl: string;
	fileName: string;
	fullPath: string;
	bucket: string;
	size: number;
	contentType: string;
	uploadedAt: Date;
	metadata?: Record<string, string>;
}

export interface RecipeImageResult {
	recipeId: string;
	imageId: string;
	generation: ImageGenerationResult;
	storage: StorageUploadResult;
}
