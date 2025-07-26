import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { Document, Model, FilterQuery, UpdateQuery, Types } from 'mongoose';
import { IBaseRepository, QueryOptions } from './base.repository.interface';
import { PaginatedResponse } from '../interfaces/api-response.interface';

@Injectable()
export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
	protected readonly logger = new Logger(this.constructor.name);

	constructor(protected readonly model: Model<T>) {}

	async create(createDto: any): Promise<T> {
		try {
			const document = new this.model(createDto);
			return await document.save();
		} catch (error) {
			this.logger.error(`Error creating document: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to create document: ${error.message}`);
		}
	}

	async findAll(
		filter: FilterQuery<T> = {},
		options: QueryOptions = {}
	): Promise<PaginatedResponse<T>> {
		const { page = 1, limit = 10, sort = { createdAt: -1 }, populate } = options;
		const skip = (page - 1) * limit;

		try {
			let query = this.model.find(filter).sort(sort).skip(skip).limit(limit);
			
			if (populate) {
				query = query.populate(populate);
			}

			const [documents, totalCount] = await Promise.all([
				query.exec(),
				this.model.countDocuments(filter)
			]);

			const totalPages = Math.ceil(totalCount / limit);

			return {
				success: true,
				data: documents,
				meta: {
					page,
					limit,
					totalCount,
					totalPages,
					hasNext: page < totalPages,
					hasPrevious: page > 1,
				},
			};
		} catch (error) {
			this.logger.error(`Error finding documents: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to retrieve documents: ${error.message}`);
		}
	}

	async find(
		filter: FilterQuery<T> = {},
		options: Omit<QueryOptions, 'page' | 'limit' | 'skip'> = {}
	): Promise<T[]> {
		const { sort = { createdAt: -1 }, populate } = options;

		try {
			let query = this.model.find(filter).sort(sort);
			
			if (populate) {
				query = query.populate(populate);
			}

			return await query.exec();
		} catch (error) {
			this.logger.error(`Error finding documents: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to retrieve documents: ${error.message}`);
		}
	}

	async findById(id: string): Promise<T | null> {
		if (!Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid document ID format');
		}

		try {
			return await this.model.findById(id).exec();
		} catch (error) {
			this.logger.error(`Error finding document by ID: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to retrieve document: ${error.message}`);
		}
	}

	async findOne(filter: FilterQuery<T>): Promise<T | null> {
		try {
			return await this.model.findOne(filter).exec();
		} catch (error) {
			this.logger.error(`Error finding document: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to retrieve document: ${error.message}`);
		}
	}

	async update(id: string, updateDto: UpdateQuery<T>): Promise<T | null> {
		if (!Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid document ID format');
		}

		try {
			return await this.model
				.findByIdAndUpdate(id, updateDto, { 
					new: true, 
					runValidators: true 
				})
				.exec();
		} catch (error) {
			this.logger.error(`Error updating document: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to update document: ${error.message}`);
		}
	}

	async updateMany(
		filter: FilterQuery<T>, 
		updateDto: UpdateQuery<T>
	): Promise<{ matchedCount: number; modifiedCount: number }> {
		try {
			const result = await this.model.updateMany(filter, updateDto, { runValidators: true });
			return {
				matchedCount: result.matchedCount || 0,
				modifiedCount: result.modifiedCount || 0,
			};
		} catch (error) {
			this.logger.error(`Error updating documents: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to update documents: ${error.message}`);
		}
	}

	async delete(id: string): Promise<boolean> {
		if (!Types.ObjectId.isValid(id)) {
			throw new BadRequestException('Invalid document ID format');
		}

		try {
			const result = await this.model.findByIdAndDelete(id).exec();
			return result !== null;
		} catch (error) {
			this.logger.error(`Error deleting document: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to delete document: ${error.message}`);
		}
	}

	async deleteMany(filter: FilterQuery<T>): Promise<{ deletedCount: number }> {
		try {
			const result = await this.model.deleteMany(filter);
			return { deletedCount: result.deletedCount || 0 };
		} catch (error) {
			this.logger.error(`Error deleting documents: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to delete documents: ${error.message}`);
		}
	}

	async count(filter: FilterQuery<T> = {}): Promise<number> {
		try {
			return await this.model.countDocuments(filter);
		} catch (error) {
			this.logger.error(`Error counting documents: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to count documents: ${error.message}`);
		}
	}

	async exists(filter: FilterQuery<T>): Promise<boolean> {
		try {
			const document = await this.model.findOne(filter).select('_id').lean().exec();
			return document !== null;
		} catch (error) {
			this.logger.error(`Error checking document existence: ${error.message}`, error.stack);
			throw new BadRequestException(`Failed to check document existence: ${error.message}`);
		}
	}
}