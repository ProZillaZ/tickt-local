import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class TagDto {
	@ApiProperty({ description: 'Tag name', example: 'vegetarian' })
	@IsString()
	@MinLength(1)
	@MaxLength(50)
	name: string;
}