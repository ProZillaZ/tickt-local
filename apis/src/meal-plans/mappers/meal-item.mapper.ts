import { Recipe, Meal } from '@tickt-ltd/types';
import { MealOrRecipeDto } from '../dto/meal-or-recipe.dto';
import { IngredientMapper, InstructionMapper, TagMapper, NutritionalInfoMapper } from '@/common/mappers';

export class MealItemMapper {
	static map(item: Recipe | Meal): MealOrRecipeDto {
		if (MealItemMapper.isRecipe(item)) {
			return MealItemMapper.mapRecipe(item);
		} else {
			return MealItemMapper.mapMeal(item);
		}
	}

	private static isRecipe(item: Recipe | Meal): item is Recipe {
		return 'name' in item && 'description' in item && 'instructions' in item;
	}

	private static mapRecipe(recipe: Recipe): MealOrRecipeDto {
		return {
			type: 'recipe' as const,
			recipe: {
				name: recipe.name,
				description: recipe.description,
				ingredients: recipe.ingredients.map(ingredient => 
					IngredientMapper.fromModelToDto(ingredient)
				),
				instructions: recipe.instructions.map(instruction => 
					InstructionMapper.fromModelToDto(instruction)
				),
				prepTime: recipe.prepTime,
				cookTime: recipe.cookTime,
				servings: recipe.servings,
				cuisines: recipe.cuisines,
				mealTypes: recipe.mealTypes,
				dietTypes: recipe.dietTypes,
				tags: recipe.tags.map(tag => TagMapper.fromModelToDto(tag)),
				difficulty: recipe.difficulty,
				nutritionalInfo: NutritionalInfoMapper.map(recipe.nutritionalInfo),
				imageUrl: recipe.imageUrl
			}
		};
	}

	private static mapMeal(meal: Meal): MealOrRecipeDto {
		return {
			type: 'meal' as const,
			meal: {
				mealType: MealItemMapper.mapMealTypeFromLib(meal.mealType),
				ingredients: meal.ingredients.map(ingredient => 
					IngredientMapper.fromModelToDto(ingredient)
				),
				nutritionalInfo: NutritionalInfoMapper.map(meal.nutritionalInfo)
			}
		};
	}

	private static mapMealTypeFromLib(mealType: string): string {
		return mealType.toLowerCase();
	}
}