import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '@/common';
import { Difficulty } from '@tickt-ltd/types/recipe/enums/difficulty.enum';
import { Cuisine } from '@tickt-ltd/types/nutrition/enums/cuisine.enum';
import { DietType } from '@tickt-ltd/types/nutrition/enums/diet-type.enum';
import { MealType } from '@tickt-ltd/types/nutrition/enums/meal-type.enum';

export class RecipeQueryDto extends PaginationDto {
	@ApiPropertyOptional({ description: 'Search by recipe name or description' })
	@IsOptional()
	@IsString()
	search?: string;

	@ApiPropertyOptional({ description: 'Filter by cuisine type', enum: Cuisine })
	@IsOptional()
	@IsEnum(Cuisine)
	cuisine?: Cuisine;

	@ApiPropertyOptional({ description: 'Filter by meal type', enum: MealType })
	@IsOptional()
	@IsEnum(MealType)
	mealType?: MealType;

	@ApiPropertyOptional({ description: 'Filter by diet type', enum: DietType })
	@IsOptional()
	@IsEnum(DietType)
	dietType?: DietType;

	@ApiPropertyOptional({ description: 'Filter by difficulty level', enum: Difficulty })
	@IsOptional()
	@IsEnum(Difficulty)
	difficulty?: Difficulty;

	@ApiPropertyOptional({ description: 'Maximum preparation time in minutes' })
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@Max(1440)
	maxPrepTime?: number;

	@ApiPropertyOptional({ description: 'Maximum cooking time in minutes' })
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@Max(1440)
	maxCookTime?: number;

	@ApiPropertyOptional({ description: 'Maximum total time in minutes' })
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	@Max(2880)
	maxTotalTime?: number;

	@ApiPropertyOptional({ description: 'Maximum servings' })
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(100)
	maxServings?: number;

	@ApiPropertyOptional({ description: 'Minimum servings' })
	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	@Max(100)
	minServings?: number;

	@ApiPropertyOptional({ description: 'Filter by specific ingredient' })
	@IsOptional()
	@IsString()
	ingredient?: string;

	@ApiPropertyOptional({ description: 'Filter by tag name' })
	@IsOptional()
	@IsString()
	tag?: string;

	@ApiPropertyOptional({ description: 'Filter by user ID (recipes created by specific user)' })
	@IsOptional()
	@IsString()
	createdBy?: string;

	@ApiPropertyOptional({ description: 'Sort field', enum: ['name', 'prepTime', 'cookTime', 'totalTime', 'difficulty', 'createdAt'] })
	@IsOptional()
	@IsString()
	sortBy?: 'name' | 'prepTime' | 'cookTime' | 'totalTime' | 'difficulty' | 'createdAt';

	@ApiPropertyOptional({ description: 'Sort order', enum: ['asc', 'desc'] })
	@IsOptional()
	@IsString()
	sortOrder?: 'asc' | 'desc';
}