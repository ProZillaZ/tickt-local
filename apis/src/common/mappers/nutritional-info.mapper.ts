import { NutritionalInfo as NutritionalInfoModel } from '@tickt-ltd/types';
import { NutritionalInfoDto } from '@/common/dto';
import { NutritionalInfo as NutritionalInfoSchema } from '@/common/schemas';

export class NutritionalInfoMapper {
	/**
	 * Maps from NutritionalInfoDto to shared NutritionalInfo model
	 */
	static fromDtoToModel(dto: NutritionalInfoDto): NutritionalInfoModel {
		return new NutritionalInfoModel(
			dto.calories,
			dto.protein,
			dto.carbohydrates,
			dto.fat,
			dto.fiber
		);
	}

	/**
	 * Maps from shared NutritionalInfo model to NutritionalInfoDto
	 */
	static fromModelToDto(nutritionalInfo: NutritionalInfoModel): NutritionalInfoDto {
		return {
			calories: nutritionalInfo.calories,
			protein: nutritionalInfo.protein,
			carbohydrates: nutritionalInfo.carbohydrates,
			fat: nutritionalInfo.fat,
			fiber: nutritionalInfo.fiber,
		};
	}

	/**
	 * Maps from MongoDB schema to shared NutritionalInfo model
	 */
	static fromSchemaToModel(schema: NutritionalInfoSchema): NutritionalInfoModel {
		return new NutritionalInfoModel(
			schema.calories,
			schema.protein,
			schema.carbohydrates,
			schema.fat,
			schema.fiber
		);
	}

	/**
	 * Maps from shared NutritionalInfo model to MongoDB schema
	 */
	static fromModelToSchema(nutritionalInfo: NutritionalInfoModel): NutritionalInfoSchema {
		return {
			calories: nutritionalInfo.calories,
			protein: nutritionalInfo.protein,
			carbohydrates: nutritionalInfo.carbohydrates,
			fat: nutritionalInfo.fat,
			fiber: nutritionalInfo.fiber,
		};
	}

	/**
	 * Maps from any source to NutritionalInfoDto (backward compatibility)
	 */
	static map(source: any): NutritionalInfoDto {
		return {
			calories: source.calories,
			protein: source.protein,
			carbohydrates: source.carbohydrates,
			fat: source.fat,
			fiber: source.fiber
		};
	}
}