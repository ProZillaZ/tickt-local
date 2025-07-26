import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class NutritionalInfo {
	@Prop({ required: true, min: 0, max: 35000 })
	calories: number;

	@Prop({ required: true, min: 0, max: 5600 })
	protein: number;

	@Prop({ required: true, min: 0, max: 8400 })
	carbohydrates: number;

	@Prop({ required: true, min: 0, max: 6300 })
	fat: number;

	@Prop({ required: true, min: 0, max: 490 })
	fiber: number;
}

export const NutritionalInfoSchema = SchemaFactory.createForClass(NutritionalInfo);