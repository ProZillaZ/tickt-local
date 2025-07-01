import { Difficulty } from '../enums';
import { IngredientDto } from './ingredient.dto';
import { InstructionDto } from './instruction.dto';
import { TagDto } from './tag.dto';
import { RecipeNutritionalInfoDto } from './nutritional-info.dto';
import { Cuisine, DietType, MealType } from '../../nutrition';

export interface CreateRecipeDto {
	name: string;
	description: string;
	ingredients: IngredientDto[];
	instructions: InstructionDto[];
	prepTime: number;
	cookTime: number;
	servings: number;
	cuisines: Cuisine[];
	mealTypes: MealType[];
	dietTypes: DietType[];
	tags: TagDto[];
	difficulty: Difficulty;
	nutritionalInfo: RecipeNutritionalInfoDto;
	imageUrl?: string;
}
