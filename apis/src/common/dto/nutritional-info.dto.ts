import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class NutritionalInfoDto {
	@ApiProperty({ description: 'Calories', minimum: 0, maximum: 35000 })
	@IsNumber()
	@Min(0)
	@Max(35000)
	calories: number;

	@ApiProperty({ description: 'Protein in grams', minimum: 0, maximum: 5600 })
	@IsNumber()
	@Min(0)
	@Max(5600)
	protein: number;

	@ApiProperty({ description: 'Carbohydrates in grams', minimum: 0, maximum: 8400 })
	@IsNumber()
	@Min(0)
	@Max(8400)
	carbohydrates: number;

	@ApiProperty({ description: 'Fat in grams', minimum: 0, maximum: 6300 })
	@IsNumber()
	@Min(0)
	@Max(6300)
	fat: number;

	@ApiProperty({ description: 'Fiber in grams', minimum: 0, maximum: 490 })
	@IsNumber()
	@Min(0)
	@Max(490)
	fiber: number;
}