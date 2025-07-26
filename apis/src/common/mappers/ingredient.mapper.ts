import { Ingredient as IngredientModel } from '@tickt-ltd/types';
import { IngredientDto } from '@/common/dto';
import { Ingredient as IngredientSchema } from '@/common/schemas';

export class IngredientMapper {
	/**
	 * Maps from IngredientDto to shared Ingredient model
	 */
	static fromDtoToModel(dto: IngredientDto): IngredientModel {
		return new IngredientModel(dto.name, dto.amount, dto.unit);
	}

	/**
	 * Maps from shared Ingredient model to IngredientDto
	 */
	static fromModelToDto(ingredient: IngredientModel): IngredientDto {
		return {
			name: ingredient.name,
			amount: ingredient.amount,
			unit: ingredient.unit,
		};
	}

	/**
	 * Maps from MongoDB schema to shared Ingredient model
	 */
	static fromSchemaToModel(schema: IngredientSchema): IngredientModel {
		return new IngredientModel(schema.name, schema.amount, schema.unit);
	}

	/**
	 * Maps from shared Ingredient model to MongoDB schema
	 */
	static fromModelToSchema(ingredient: IngredientModel): IngredientSchema {
		return {
			name: ingredient.name,
			amount: ingredient.amount,
			unit: ingredient.unit,
		};
	}
}