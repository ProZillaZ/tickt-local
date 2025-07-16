import { Ingredient } from './ingredient.model';
import { Instruction } from './instruction.model';
import { Tag } from './tag.model';
import { NutritionalInfo } from './nutritional-info.model';
import { Difficulty } from '../enums';
import { Cuisine, DietType, MealType } from '../../nutrition';

export class Recipe {
	id: string;
	name: string;
	description: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
	prepTime: number;
	cookTime: number;
	servings: number;
	cuisines: Cuisine[];
	mealTypes: MealType[];
	dietTypes: DietType[];
	tags: Tag[];
	difficulty: Difficulty;
	nutritionalInfo: NutritionalInfo;
	imageUrl?: string;
	createdBy?: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(
		name: string,
		description: string,
		ingredients: Ingredient[],
		instructions: Instruction[],
		prepTime: number,
		cookTime: number,
		servings: number,
		cuisines: Cuisine[],
		mealTypes: MealType[],
		dietTypes: DietType[],
		tags: Tag[],
		difficulty: Difficulty,
		nutritionalInfo: NutritionalInfo,
		imageUrl?: string,
		id?: string,
	) {
		if (!name) {
			throw new Error('Recipe name is required');
		}

		const trimmedName = name.trim();

		if (trimmedName.length === 0) {
			throw new Error('Recipe name cannot be empty');
		}

		if (trimmedName.length > 200) {
			throw new Error('Recipe name cannot exceed 200 characters');
		}

		if (!description) {
			throw new Error('Recipe description is required');
		}

		const trimmedDescription = description.trim();

		if (trimmedDescription.length === 0) {
			throw new Error('Recipe description cannot be empty');
		}

		if (trimmedDescription.length > 2000) {
			throw new Error('Recipe description cannot exceed 2000 characters');
		}

		if (!Array.isArray(ingredients) || ingredients.length === 0) {
			throw new Error('Recipe must have at least one ingredient');
		}

		if (ingredients.length > 100) {
			throw new Error('Recipe cannot have more than 100 ingredients');
		}

		if (!Array.isArray(instructions) || instructions.length === 0) {
			throw new Error('Recipe must have at least one instruction');
		}

		if (instructions.length > 50) {
			throw new Error('Recipe cannot have more than 50 instructions');
		}

		if (!Number.isInteger(prepTime) || prepTime < 0 || prepTime > 1440) {
			throw new Error('Prep time must be an integer between 0 and 1440 minutes (24 hours)');
		}

		if (!Number.isInteger(cookTime) || cookTime < 0 || cookTime > 1440) {
			throw new Error('Cook time must be an integer between 0 and 1440 minutes (24 hours)');
		}

		if (!Number.isInteger(servings) || servings < 1 || servings > 100) {
			throw new Error('Servings must be an integer between 1 and 100');
		}

		if (!Array.isArray(cuisines)) {
			throw new Error('Cuisines must be an array');
		}

		if (!Array.isArray(mealTypes) || mealTypes.length === 0) {
			throw new Error('Recipe must have at least one meal type');
		}

		if (!Array.isArray(dietTypes)) {
			throw new Error('Diet types must be an array');
		}

		if (!Array.isArray(tags)) {
			throw new Error('Tags must be an array');
		}

		if (!Object.values(Difficulty).includes(difficulty)) {
			throw new Error('Invalid difficulty level');
		}

		if (!nutritionalInfo) {
			throw new Error('Nutritional information is required');
		}

		if (imageUrl !== undefined) {
			if (imageUrl.trim().length > 2000) {
				throw new Error('Image URL cannot exceed 2000 characters');
			}
		}

		this.id = id || '';
		this.name = trimmedName;
		this.description = trimmedDescription;
		this.ingredients = ingredients;
		this.instructions = instructions;
		this.prepTime = prepTime;
		this.cookTime = cookTime;
		this.servings = servings;
		this.cuisines = cuisines;
		this.mealTypes = mealTypes;
		this.dietTypes = dietTypes;
		this.tags = tags;
		this.difficulty = difficulty;
		this.nutritionalInfo = nutritionalInfo;
		this.imageUrl = imageUrl?.trim() || undefined;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	getTotalTime(): number {
		return this.prepTime + this.cookTime;
	}

	hasTag(tagName: string): boolean {
		return this.tags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase());
	}

	hasDietType(dietType: DietType): boolean {
		return this.dietTypes.includes(dietType);
	}

	hasCuisine(cuisine: Cuisine): boolean {
		return this.cuisines.includes(cuisine);
	}

	setMetadata(metadata: {
		createdBy?: string;
		createdAt?: Date;
		updatedAt?: Date;
		id?: string;
	}): void {
		if (metadata.createdBy !== undefined) {
			this.createdBy = metadata.createdBy;
		}
		if (metadata.createdAt !== undefined) {
			this.createdAt = metadata.createdAt;
		}
		if (metadata.updatedAt !== undefined) {
			this.updatedAt = metadata.updatedAt;
		}
		if (metadata.id !== undefined) {
			this.id = metadata.id;
		}
	}

	touch(): void {
		this.updatedAt = new Date();
	}
}
