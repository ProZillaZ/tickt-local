import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NutritionalInfoDto } from '@/common/dto';

export class CreateMealDto {
	@ApiProperty({ description: 'Type of meal (breakfast, lunch, dinner, snack)' })
	@IsString()
	mealType: string;

	@ApiProperty({ description: 'List of ingredients', type: 'array', items: { type: 'object' } })
	@IsArray()
	ingredients: any[];

	@ApiProperty({ description: 'Nutritional information', type: NutritionalInfoDto })
	@ValidateNested()
	@Type(() => NutritionalInfoDto)
	nutritionalInfo: NutritionalInfoDto;
}
