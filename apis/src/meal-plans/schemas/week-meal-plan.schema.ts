import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { DayMealPlan, DayMealPlanSchema } from './day-meal-plan.schema';
import { NutritionalInfo, NutritionalInfoSchema } from '@/common/schemas';

@Schema({ timestamps: true })
export class WeekMealPlan extends Document {
	@Prop({ type: [DayMealPlanSchema], required: true })
	dayPlans: DayMealPlan[];

	@Prop({ type: NutritionalInfoSchema, required: true })
	weekNutritionalInfo: NutritionalInfo;

	@Prop({ required: true })
	startDate: Date;

	@Prop({ required: true })
	endDate: Date;

	@Prop()
	name?: string;

	@Prop()
	description?: string;

	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
	userId?: MongooseSchema.Types.ObjectId;
}

export const WeekMealPlanSchema = SchemaFactory.createForClass(WeekMealPlan);
