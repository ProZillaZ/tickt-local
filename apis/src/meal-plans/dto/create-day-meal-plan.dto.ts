import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MealOrRecipeDto } from './meal-or-recipe.dto';
import { NutritionalInfoDto } from '@/common/dto';

export class CreateDayMealPlanDto {
	@ApiProperty({ description: 'List of meals or recipes', type: [MealOrRecipeDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => MealOrRecipeDto)
	meals: MealOrRecipeDto[];

	@ApiProperty({ description: 'Daily nutritional information', type: NutritionalInfoDto })
	@ValidateNested()
	@Type(() => NutritionalInfoDto)
	dayNutritionalInfo: NutritionalInfoDto;

	@ApiProperty({ description: 'Date for this day plan' })
	@IsDateString()
	date: string;

	@ApiPropertyOptional({ description: 'Whether this is a free day', default: false })
	@IsOptional()
	@IsBoolean()
	isFreeDay?: boolean = false;
}
