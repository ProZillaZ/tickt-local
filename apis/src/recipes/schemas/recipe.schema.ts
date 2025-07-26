import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ingredient, IngredientSchema, Instruction, InstructionSchema, Tag, TagSchema, NutritionalInfo, NutritionalInfoSchema } from '@/common/schemas';
import { Difficulty } from '@tickt-ltd/types/recipe/enums/difficulty.enum';
import { Cuisine } from '@tickt-ltd/types/nutrition/enums/cuisine.enum';
import { DietType } from '@tickt-ltd/types/nutrition/enums/diet-type.enum';
import { MealType } from '@tickt-ltd/types/nutrition/enums/meal-type.enum';

export type RecipeDocument = Recipe & Document;

@Schema({ timestamps: true })
export class Recipe {
	@Prop({ required: true, minlength: 1, maxlength: 200, trim: true })
	name: string;

	@Prop({ required: true, minlength: 1, maxlength: 2000, trim: true })
	description: string;

	@Prop({ type: [IngredientSchema], required: true, validate: { validator: (v: any[]) => v.length > 0 && v.length <= 100 } })
	ingredients: Ingredient[];

	@Prop({ type: [InstructionSchema], required: true, validate: { validator: (v: any[]) => v.length > 0 && v.length <= 50 } })
	instructions: Instruction[];

	@Prop({ required: true, min: 0, max: 1440 })
	prepTime: number;

	@Prop({ required: true, min: 0, max: 1440 })
	cookTime: number;

	@Prop({ required: true, min: 1, max: 100 })
	servings: number;

	@Prop({ type: [String], enum: Object.values(Cuisine), default: [] })
	cuisines: Cuisine[];

	@Prop({ type: [String], enum: Object.values(MealType), required: true, validate: { validator: (v: string[]) => v.length > 0 } })
	mealTypes: MealType[];

	@Prop({ type: [String], enum: Object.values(DietType), default: [] })
	dietTypes: DietType[];

	@Prop({ type: [TagSchema], default: [] })
	tags: Tag[];

	@Prop({ required: true, enum: Object.values(Difficulty) })
	difficulty: Difficulty;

	@Prop({ type: NutritionalInfoSchema, required: true })
	nutritionalInfo: NutritionalInfo;

	@Prop({ maxlength: 2000, trim: true })
	imageUrl?: string;

	@Prop({ required: false })
	createdBy?: string;

	@Prop({ unique: true, sparse: true, maxlength: 100 })
	firebaseId?: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);

// Indices
RecipeSchema.index({ name: 'text', description: 'text' });
RecipeSchema.index({ cuisines: 1 });
RecipeSchema.index({ mealTypes: 1 });
RecipeSchema.index({ dietTypes: 1 });
RecipeSchema.index({ difficulty: 1 });
RecipeSchema.index({ createdBy: 1 });
RecipeSchema.index({ createdAt: -1 });
RecipeSchema.index({ firebaseId: 1 });
