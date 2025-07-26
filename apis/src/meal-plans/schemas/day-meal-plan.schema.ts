import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { Meal } from './meal.schema';
import { NutritionalInfo, NutritionalInfoSchema } from '@/common/schemas';
import { Recipe } from '@shared/types/recipe';

@Schema({ timestamps: true })
export class DayMealPlan {
	@Prop({ type: [{ type: MongooseSchema.Types.Mixed }], default: [] })
	meals: (Meal | Recipe)[];

	@Prop({ type: NutritionalInfoSchema, required: true })
	dayNutritionalInfo: NutritionalInfo;

	@Prop({ required: true })
	date: Date;

	@Prop({ default: false })
	isFreeDay: boolean;
}

export const DayMealPlanSchema = SchemaFactory.createForClass(DayMealPlan);
