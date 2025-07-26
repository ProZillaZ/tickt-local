import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, ValidateNested, IsObject, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { MealPlanGenerationOptionsDto } from './meal-plan-generation-options.dto';
import { UserProfile } from '@tickt-ltd/types';

export class GenerateMealPlanDto {
	@ApiProperty({ 
		description: 'User profile containing dietary preferences, goals, and constraints',
		example: {
			id: 'user123',
			email: 'user@example.com',
			age: 30,
			gender: 'female',
			heightCm: 165,
			weightKg: 60,
			activityLevel: 'moderately-active',
			goal: 'maintenance',
			dietType: 'vegetarian',
			unitSystem: 'metric',
			dietFilters: {
				pace: 'moderate',
				mealCount: 3,
				foodMeasurement: 'weight',
				favoriteCuisines: ['italian', 'mediterranean'],
				allergies: ['gluten', 'nuts']
			}
		}
	})
	@IsObject()
	userProfile: UserProfile;

	@ApiProperty({ 
		description: 'Start date for the meal plan',
		example: '2024-01-01'
	})
	@IsDateString()
	startDate: string;

	@ApiProperty({ 
		description: 'End date for the meal plan',
		example: '2024-01-07'
	})
	@IsDateString()
	endDate: string;

	@ApiPropertyOptional({ 
		description: 'Generation options and preferences',
		type: MealPlanGenerationOptionsDto
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => MealPlanGenerationOptionsDto)
	options?: MealPlanGenerationOptionsDto;

	@ApiPropertyOptional({ 
		description: 'Optional name for the generated meal plan'
	})
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ 
		description: 'Optional description for the generated meal plan'
	})
	@IsOptional()
	@IsString()
	description?: string;
}