import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateDayMealPlanDto } from './create-day-meal-plan.dto';
import { NutritionalInfoDto } from '@/common/dto';

export class CreateMealPlanDto {
	@ApiProperty({ description: 'Start date of the meal plan' })
	@IsDateString()
	startDate: string;

	@ApiProperty({ description: 'End date of the meal plan' })
	@IsDateString()
	endDate: string;

	@ApiProperty({ description: 'Daily meal plans', type: [CreateDayMealPlanDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreateDayMealPlanDto)
	dayPlans: CreateDayMealPlanDto[];

	@ApiProperty({ description: 'Weekly nutritional information', type: NutritionalInfoDto })
	@ValidateNested()
	@Type(() => NutritionalInfoDto)
	weekNutritionalInfo: NutritionalInfoDto;

	@ApiPropertyOptional({ description: 'Name of the meal plan' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ description: 'Description of the meal plan' })
	@IsOptional()
	@IsString()
	description?: string;
}
