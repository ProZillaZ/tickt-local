import { Recipe as RecipeModel, Ingredient as IngredientModel, Instruction as InstructionModel, Tag as TagModel, NutritionalInfo as NutritionalInfoModel } from '@tickt-ltd/types';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';
import { RecipeDocument } from '../schemas/recipe.schema';

export class RecipeMapper {
	/**
	 * Maps from the shared Recipe model to CreateRecipeDto
	 */
	static fromModelToCreateDto(recipe: RecipeModel): CreateRecipeDto {
		return {
			name: recipe.name,
			description: recipe.description,
			ingredients: recipe.ingredients.map(ingredient => ({
				name: ingredient.name,
				amount: ingredient.amount,
				unit: ingredient.unit,
			})),
			instructions: recipe.instructions.map(instruction => ({
				stepNumber: instruction.stepNumber,
				description: instruction.description,
			})),
			prepTime: recipe.prepTime,
			cookTime: recipe.cookTime,
			servings: recipe.servings,
			cuisines: recipe.cuisines,
			mealTypes: recipe.mealTypes,
			dietTypes: recipe.dietTypes,
			tags: recipe.tags.map(tag => ({
				name: tag.name,
			})),
			difficulty: recipe.difficulty,
			nutritionalInfo: {
				calories: recipe.nutritionalInfo.calories,
				protein: recipe.nutritionalInfo.protein,
				carbohydrates: recipe.nutritionalInfo.carbohydrates,
				fat: recipe.nutritionalInfo.fat,
				fiber: recipe.nutritionalInfo.fiber,
			},
			imageUrl: recipe.imageUrl,
			createdBy: recipe.createdBy,
		};
	}

	/**
	 * Maps from CreateRecipeDto to the shared Recipe model
	 */
	static fromCreateDtoToModel(dto: CreateRecipeDto): RecipeModel {
		return new RecipeModel(
			dto.name,
			dto.description,
			dto.ingredients.map(ingredient => 
				new IngredientModel(ingredient.name, ingredient.amount, ingredient.unit)
			),
			dto.instructions.map(instruction => 
				new InstructionModel(instruction.stepNumber, instruction.description)
			),
			dto.prepTime,
			dto.cookTime,
			dto.servings,
			dto.cuisines || [],
			dto.mealTypes,
			dto.dietTypes || [],
			dto.tags?.map(tag => new TagModel(tag.name)) || [],
			dto.difficulty,
			new NutritionalInfoModel(
				dto.nutritionalInfo.calories,
				dto.nutritionalInfo.protein,
				dto.nutritionalInfo.carbohydrates,
				dto.nutritionalInfo.fat,
				dto.nutritionalInfo.fiber
			),
			dto.imageUrl,
		);
	}

	/**
	 * Maps from MongoDB document to the shared Recipe model
	 */
	static fromDocumentToModel(document: RecipeDocument): RecipeModel {
		const recipe = new RecipeModel(
			document.name,
			document.description,
			document.ingredients.map(ingredient => 
				new IngredientModel(ingredient.name, ingredient.amount, ingredient.unit)
			),
			document.instructions.map(instruction => 
				new InstructionModel(instruction.stepNumber, instruction.description)
			),
			document.prepTime,
			document.cookTime,
			document.servings,
			document.cuisines,
			document.mealTypes,
			document.dietTypes,
			document.tags.map(tag => new TagModel(tag.name)),
			document.difficulty,
			new NutritionalInfoModel(
				document.nutritionalInfo.calories,
				document.nutritionalInfo.protein,
				document.nutritionalInfo.carbohydrates,
				document.nutritionalInfo.fat,
				document.nutritionalInfo.fiber
			),
			document.imageUrl,
			(document as any)._id?.toString(),
		);

		// Set metadata from document
		recipe.setMetadata({
			id: (document as any)._id?.toString(),
			createdBy: document.createdBy,
			createdAt: (document as any).createdAt,
			updatedAt: (document as any).updatedAt,
		});

		return recipe;
	}

	/**
	 * Maps from UpdateRecipeDto to partial Recipe model for updates
	 */
	static fromUpdateDtoToPartialModel(dto: UpdateRecipeDto): Partial<RecipeModel> {
		const partialRecipe: any = {};

		if (dto.name !== undefined) partialRecipe.name = dto.name;
		if (dto.description !== undefined) partialRecipe.description = dto.description;
		if (dto.ingredients !== undefined) {
			partialRecipe.ingredients = dto.ingredients.map(ingredient => 
				new IngredientModel(ingredient.name, ingredient.amount, ingredient.unit)
			);
		}
		if (dto.instructions !== undefined) {
			partialRecipe.instructions = dto.instructions.map(instruction => 
				new InstructionModel(instruction.stepNumber, instruction.description)
			);
		}
		if (dto.prepTime !== undefined) partialRecipe.prepTime = dto.prepTime;
		if (dto.cookTime !== undefined) partialRecipe.cookTime = dto.cookTime;
		if (dto.servings !== undefined) partialRecipe.servings = dto.servings;
		if (dto.cuisines !== undefined) partialRecipe.cuisines = dto.cuisines;
		if (dto.mealTypes !== undefined) partialRecipe.mealTypes = dto.mealTypes;
		if (dto.dietTypes !== undefined) partialRecipe.dietTypes = dto.dietTypes;
		if (dto.tags !== undefined) {
			partialRecipe.tags = dto.tags.map(tag => new TagModel(tag.name));
		}
		if (dto.difficulty !== undefined) partialRecipe.difficulty = dto.difficulty;
		if (dto.nutritionalInfo !== undefined) {
			partialRecipe.nutritionalInfo = new NutritionalInfoModel(
				dto.nutritionalInfo.calories,
				dto.nutritionalInfo.protein,
				dto.nutritionalInfo.carbohydrates,
				dto.nutritionalInfo.fat,
				dto.nutritionalInfo.fiber
			);
		}
		if (dto.imageUrl !== undefined) partialRecipe.imageUrl = dto.imageUrl;
		if (dto.createdBy !== undefined) partialRecipe.createdBy = dto.createdBy;

		return partialRecipe;
	}
}