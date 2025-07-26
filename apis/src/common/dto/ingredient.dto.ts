import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, MinLength, MaxLength } from 'class-validator';

export class IngredientDto {
	@ApiProperty({ description: 'Ingredient name', example: 'olive oil' })
	@IsString()
	@MinLength(1)
	@MaxLength(100)
	name: string;

	@ApiProperty({ description: 'Amount/quantity of ingredient', example: 2 })
	@IsNumber()
	@Min(0)
	@Max(10000)
	amount: number;

	@ApiProperty({ description: 'Unit of measurement', example: 'tbsp' })
	@IsString()
	@MinLength(1)
	@MaxLength(20)
	unit: string;
}