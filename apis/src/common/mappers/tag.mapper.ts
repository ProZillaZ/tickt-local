import { Tag as TagModel } from '@tickt-ltd/types';
import { TagDto } from '@/common/dto';
import { Tag as TagSchema } from '@/common/schemas';

export class TagMapper {
	/**
	 * Maps from TagDto to shared Tag model
	 */
	static fromDtoToModel(dto: TagDto): TagModel {
		return new TagModel(dto.name);
	}

	/**
	 * Maps from shared Tag model to TagDto
	 */
	static fromModelToDto(tag: TagModel): TagDto {
		return {
			name: tag.name,
		};
	}

	/**
	 * Maps from MongoDB schema to shared Tag model
	 */
	static fromSchemaToModel(schema: TagSchema): TagModel {
		return new TagModel(schema.name);
	}

	/**
	 * Maps from shared Tag model to MongoDB schema
	 */
	static fromModelToSchema(tag: TagModel): TagSchema {
		return {
			name: tag.name,
		};
	}
}