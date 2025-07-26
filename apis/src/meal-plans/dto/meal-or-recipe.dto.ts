import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateMealDto } from './create-meal.dto';
import { RecipeInputDto } from './recipe-input.dto';

export class MealOrRecipeDto {
	@ApiProperty({
		description: 'Type discriminator - "meal" for meal objects, "recipe" for recipe objects',
		enum: ['meal', 'recipe'],
	})
	@IsString()
	type: 'meal' | 'recipe';

	@ApiProperty({ description: 'Meal data (when type is "meal")', type: CreateMealDto, required: false })
	@IsOptional()
	@ValidateNested()
	@Type(() => CreateMealDto)
	meal?: CreateMealDto;

	@ApiProperty({ description: 'Recipe data (when type is "recipe")', type: RecipeInputDto, required: false })
	@IsOptional()
	@ValidateNested()
	@Type(() => RecipeInputDto)
	recipe?: RecipeInputDto;
}
