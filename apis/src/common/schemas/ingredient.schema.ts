import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
	@Prop({ required: true, minlength: 1, maxlength: 100 })
	name: string;

	@Prop({ required: true, min: 0, max: 10000 })
	amount: number;

	@Prop({ required: true, minlength: 1, maxlength: 20 })
	unit: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);