import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsArray, IsNumber, IsOptional, ValidateNested, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { IngredientDto, InstructionDto, TagDto, NutritionalInfoDto } from '@/common/dto';
import { Cuisine, DietType, MealType } from '@tickt-ltd/types';
import { Difficulty } from '@tickt-ltd/types';

export class RecipeInputDto {
	@ApiPropertyOptional({ description: 'Recipe ID (for existing recipes)' })
	@IsOptional()
	@IsString()
	id?: string;

	@ApiProperty({ description: 'Recipe name' })
	@IsString()
	name: string;

	@ApiProperty({ description: 'Recipe description' })
	@IsString()
	description: string;

	@ApiProperty({ description: 'List of ingredients', type: [IngredientDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => IngredientDto)
	ingredients: IngredientDto[];

	@ApiProperty({ description: 'Cooking instructions', type: [InstructionDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => InstructionDto)
	instructions: InstructionDto[];

	@ApiProperty({ description: 'Preparation time in minutes' })
	@IsNumber()
	@Min(0)
	@Max(1440)
	prepTime: number;

	@ApiProperty({ description: 'Cooking time in minutes' })
	@IsNumber()
	@Min(0)
	@Max(1440)
	cookTime: number;

	@ApiProperty({ description: 'Number of servings' })
	@IsNumber()
	@Min(1)
	@Max(100)
	servings: number;

	@ApiProperty({ description: 'Cuisine types', enum: Cuisine, isArray: true })
	@IsArray()
	@IsEnum(Cuisine, { each: true })
	cuisines: Cuisine[];

	@ApiProperty({ description: 'Meal types', enum: MealType, isArray: true })
	@IsArray()
	@IsEnum(MealType, { each: true })
	mealTypes: MealType[];

	@ApiProperty({ description: 'Diet types', enum: DietType, isArray: true })
	@IsArray()
	@IsEnum(DietType, { each: true })
	dietTypes: DietType[];

	@ApiProperty({ description: 'Recipe tags', type: [TagDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => TagDto)
	tags: TagDto[];

	@ApiProperty({ description: 'Recipe difficulty', enum: Difficulty })
	@IsEnum(Difficulty)
	difficulty: Difficulty;

	@ApiProperty({ description: 'Nutritional information', type: NutritionalInfoDto })
	@ValidateNested()
	@Type(() => NutritionalInfoDto)
	nutritionalInfo: NutritionalInfoDto;

	@ApiPropertyOptional({ description: 'Recipe image URL' })
	@IsOptional()
	@IsString()
	imageUrl?: string;
}
