import { SchemaFactory, Schema } from '@nestjs/mongoose';
import { Ingredient, IngredientSchema } from './ingredient.schema';
import { Instruction, InstructionSchema } from './instruction.schema';
import { Tag, TagSchema } from './tag.schema';
import { NutritionalInfo, NutritionalInfoSchema } from './nutritional-info.schema';

/**
 * Centralized schema factory for creating and configuring schemas
 */
export class CommonSchemaFactory {
	/**
	 * Creates a schema with common indexes and configurations
	 */
	static createWithCommonConfig<T>(schemaClass: any): any {
		const schema = SchemaFactory.createForClass(schemaClass);
		
		// Add common indexes
		schema.index({ createdAt: -1 });
		schema.index({ updatedAt: -1 });
		
		// Set common options
		schema.set('timestamps', true);
		schema.set('toJSON', {
			transform: (doc, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		});

		return schema;
	}

	/**
	 * Get pre-configured common schemas
	 */
	static getCommonSchemas() {
		return {
			ingredient: IngredientSchema,
			instruction: InstructionSchema,
			tag: TagSchema,
			nutritionalInfo: NutritionalInfoSchema,
		};
	}
}

export {
	Ingredient,
	IngredientSchema,
	Instruction,
	InstructionSchema,
	Tag,
	TagSchema,
	NutritionalInfo,
	NutritionalInfoSchema,
};