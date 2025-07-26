import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Instruction {
	@Prop({ required: true, min: 1, max: 100 })
	stepNumber: number;

	@Prop({ required: true, minlength: 1, maxlength: 1000 })
	description: string;
}

export const InstructionSchema = SchemaFactory.createForClass(Instruction);