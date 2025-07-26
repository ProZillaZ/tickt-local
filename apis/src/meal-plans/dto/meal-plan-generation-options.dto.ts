import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsBoolean } from 'class-validator';

export class MealPlanGenerationOptionsDto {
	@ApiPropertyOptional({
		description: 'Whether to include recipes in the generated meal plan',
		default: true
	})
	@IsOptional()
	@IsBoolean()
	includeRecipes?: boolean = true;
}
