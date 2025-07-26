import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, MinLength, MaxLength } from 'class-validator';

export class InstructionDto {
	@ApiProperty({ description: 'Step number in the cooking process', example: 1 })
	@IsNumber()
	@Min(1)
	@Max(100)
	stepNumber: number;

	@ApiProperty({ description: 'Detailed cooking instruction', example: 'Heat olive oil in a large pan over medium heat' })
	@IsString()
	@MinLength(1)
	@MaxLength(1000)
	description: string;
}