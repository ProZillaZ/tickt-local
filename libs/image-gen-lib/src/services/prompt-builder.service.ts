import { Logger } from '@tickt-ltd/services';
import { RecipeStyle, RecipeSetting, RecipeLighting, RecipePlating } from '../models';

export interface RecipePromptOptions {
	recipeName: string;
	description?: string;
	cuisine?: string;
	ingredients?: string[];
	style?: RecipeStyle;
	setting?: RecipeSetting;
	lighting?: RecipeLighting;
	plating?: RecipePlating;
	additionalDetails?: string;
}

export class PromptBuilderService {
	private logger: Logger;

	constructor() {
		this.logger = new Logger('PromptBuilderService');
	}

	buildRecipeImagePrompt(options: RecipePromptOptions): string {
		this.logger.debug('Building recipe image prompt', { recipeName: options.recipeName });

		const basePrompt = this.buildBasePrompt(options);
		const stylePrompt = this.buildStylePrompt(options);
		const technicalPrompt = this.buildTechnicalPrompt();

		const fullPrompt = `${basePrompt} ${stylePrompt} ${technicalPrompt}`.trim();

		this.logger.info('Recipe image prompt built', {
			recipeName: options.recipeName,
			promptLength: fullPrompt.length,
		});

		return fullPrompt;
	}

	private buildBasePrompt(options: RecipePromptOptions): string {
		let prompt = `A photorealistic, high-quality image of ${options.recipeName}`;

		if (options.description) {
			prompt += `, ${options.description}`;
		}

		if (options.cuisine) {
			prompt += `, ${options.cuisine} cuisine style`;
		}

		if (options.ingredients && options.ingredients.length > 0) {
			const allIngredients = options.ingredients.join(', ');
			prompt += `, featuring ${allIngredients}`;
		}

		return prompt;
	}

	private buildStylePrompt(options: RecipePromptOptions): string {
		const style = options.style || RecipeStyle.PROFESSIONAL;
		const setting = options.setting || RecipeSetting.STUDIO;
		const lighting = options.lighting || RecipeLighting.NATURAL;
		const plating = options.plating || RecipePlating.ELEGANT;

		let stylePrompt = '';

		switch (style) {
			case RecipeStyle.PROFESSIONAL:
				stylePrompt += 'professionally photographed food styling';
				break;
			case RecipeStyle.RUSTIC:
				stylePrompt += 'rustic, homestyle presentation';
				break;
			case RecipeStyle.MODERN:
				stylePrompt += 'modern, minimalist food styling';
				break;
			case RecipeStyle.TRADITIONAL:
				stylePrompt += 'traditional, authentic presentation';
				break;
		}

		switch (setting) {
			case RecipeSetting.STUDIO:
				stylePrompt += ', clean studio background';
				break;
			case RecipeSetting.KITCHEN:
				stylePrompt += ', cozy kitchen setting';
				break;
			case RecipeSetting.RESTAURANT:
				stylePrompt += ', upscale restaurant presentation';
				break;
			case RecipeSetting.OUTDOOR:
				stylePrompt += ', outdoor dining atmosphere';
				break;
		}

		switch (lighting) {
			case RecipeLighting.NATURAL:
				stylePrompt += ', natural window lighting';
				break;
			case RecipeLighting.STUDIO:
				stylePrompt += ', professional studio lighting';
				break;
			case RecipeLighting.WARM:
				stylePrompt += ', warm ambient lighting';
				break;
			case RecipeLighting.BRIGHT:
				stylePrompt += ', bright, even lighting';
				break;
		}

		switch (plating) {
			case RecipePlating.ELEGANT:
				stylePrompt += ', elegantly plated';
				break;
			case RecipePlating.CASUAL:
				stylePrompt += ', casual serving style';
				break;
			case RecipePlating.RUSTIC:
				stylePrompt += ', rustic plating';
				break;
			case RecipePlating.MODERN:
				stylePrompt += ', modern minimalist plating';
				break;
		}

		if (options.additionalDetails) {
			stylePrompt += `, ${options.additionalDetails}`;
		}

		return stylePrompt;
	}

	private buildTechnicalPrompt(): string {
		return 'fresh garnishes, natural textures, vibrant colors, perfectly cooked, Instagram-worthy, food magazine quality, shot with a professional camera, shallow depth of field, appetizing colors, high resolution, food photography, commercial quality, mouth-watering presentation';
	}

	buildSimplePrompt(recipeName: string, description?: string): string {
		const options: RecipePromptOptions = {
			recipeName,
			description,
			style: RecipeStyle.PROFESSIONAL,
			setting: RecipeSetting.STUDIO,
			lighting: RecipeLighting.NATURAL,
			plating: RecipePlating.ELEGANT,
		};

		return this.buildRecipeImagePrompt(options);
	}
}
