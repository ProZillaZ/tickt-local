import { Instruction as InstructionModel } from '@tickt-ltd/types';
import { InstructionDto } from '@/common/dto';
import { Instruction as InstructionSchema } from '@/common/schemas';

export class InstructionMapper {
	/**
	 * Maps from InstructionDto to shared Instruction model
	 */
	static fromDtoToModel(dto: InstructionDto): InstructionModel {
		return new InstructionModel(dto.stepNumber, dto.description);
	}

	/**
	 * Maps from shared Instruction model to InstructionDto
	 */
	static fromModelToDto(instruction: InstructionModel): InstructionDto {
		return {
			stepNumber: instruction.stepNumber,
			description: instruction.description,
		};
	}

	/**
	 * Maps from MongoDB schema to shared Instruction model
	 */
	static fromSchemaToModel(schema: InstructionSchema): InstructionModel {
		return new InstructionModel(schema.stepNumber, schema.description);
	}

	/**
	 * Maps from shared Instruction model to MongoDB schema
	 */
	static fromModelToSchema(instruction: InstructionModel): InstructionSchema {
		return {
			stepNumber: instruction.stepNumber,
			description: instruction.description,
		};
	}
}