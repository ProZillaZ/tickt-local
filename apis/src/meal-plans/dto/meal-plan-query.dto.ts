import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString, IsString } from 'class-validator';
import { PaginationDto } from '@/common';

export class MealPlanQueryDto extends PaginationDto {
	@ApiPropertyOptional({ description: 'Filter by start date (greater than or equal)' })
	@IsOptional()
	@IsDateString()
	startDate?: string;

	@ApiPropertyOptional({ description: 'Filter by end date (less than or equal)' })
	@IsOptional()
	@IsDateString()
	endDate?: string;

	@ApiPropertyOptional({ description: 'Filter by name (partial match)' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ description: 'Filter by user ID' })
	@IsOptional()
	@IsString()
	userId?: string;
}
