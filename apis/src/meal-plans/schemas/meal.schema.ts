import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { NutritionalInfo, NutritionalInfoSchema } from '@/common/schemas';

@Schema({ timestamps: true })
export class Meal {
	@Prop({ required: true })
	mealType: string;

	@Prop({ type: [{ type: MongooseSchema.Types.Mixed }], default: [] })
	ingredients: any[];

	@Prop({ type: NutritionalInfoSchema, required: true })
	nutritionalInfo: NutritionalInfo;
}

export const MealSchema = SchemaFactory.createForClass(Meal);
