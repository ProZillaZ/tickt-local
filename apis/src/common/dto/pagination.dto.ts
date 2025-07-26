import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
	@ApiPropertyOptional({ description: 'Page number', minimum: 1, default: 1 })
	@IsOptional()
	@Type(() => Number)
	@IsPositive()
	page?: number = 1;

	@ApiPropertyOptional({ description: 'Number of items per page', minimum: 1, default: 10 })
	@IsOptional()
	@Type(() => Number)
	@IsPositive()
	limit?: number = 10;

	get skip(): number {
		return (this.page - 1) * this.limit;
	}
}
