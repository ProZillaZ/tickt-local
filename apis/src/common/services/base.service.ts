import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Document } from 'mongoose';
import { IBaseRepository, QueryOptions } from '../repositories/base.repository.interface';
import { PaginatedResponse } from '../interfaces/api-response.interface';

@Injectable()
export abstract class BaseService<T extends Document> {
	protected readonly logger = new Logger(this.constructor.name);

	constructor(protected readonly repository: IBaseRepository<T>) {}

	/**
	 * Create a new entity
	 */
	async create(createDto: any): Promise<T> {
		this.logger.log(`Creating new entity`);
		return await this.repository.create(createDto);
	}

	/**
	 * Find all entities with optional filtering and pagination
	 */
	async findAll(filter?: any, options?: QueryOptions): Promise<PaginatedResponse<T>> {
		this.logger.log(`Finding all entities with filter: ${JSON.stringify(filter)}`);
		return await this.repository.findAll(filter, options);
	}

	/**
	 * Find entities without pagination
	 */
	async find(filter?: any, options?: Omit<QueryOptions, 'page' | 'limit' | 'skip'>): Promise<T[]> {
		this.logger.log(`Finding entities with filter: ${JSON.stringify(filter)}`);
		return await this.repository.find(filter, options);
	}

	/**
	 * Find entity by ID
	 */
	async findById(id: string): Promise<T> {
		this.logger.log(`Finding entity by ID: ${id}`);
		const entity = await this.repository.findById(id);
		
		if (!entity) {
			throw new NotFoundException(`Entity with ID ${id} not found`);
		}

		return entity;
	}

	/**
	 * Find one entity by filter
	 */
	async findOne(filter: any): Promise<T | null> {
		this.logger.log(`Finding one entity with filter: ${JSON.stringify(filter)}`);
		return await this.repository.findOne(filter);
	}

	/**
	 * Update entity by ID
	 */
	async update(id: string, updateDto: any): Promise<T> {
		this.logger.log(`Updating entity with ID: ${id}`);
		const updatedEntity = await this.repository.update(id, updateDto);
		
		if (!updatedEntity) {
			throw new NotFoundException(`Entity with ID ${id} not found`);
		}

		return updatedEntity;
	}

	/**
	 * Delete entity by ID
	 */
	async delete(id: string): Promise<void> {
		this.logger.log(`Deleting entity with ID: ${id}`);
		const deleted = await this.repository.delete(id);
		
		if (!deleted) {
			throw new NotFoundException(`Entity with ID ${id} not found`);
		}
	}

	/**
	 * Count entities matching filter
	 */
	async count(filter?: any): Promise<number> {
		this.logger.log(`Counting entities with filter: ${JSON.stringify(filter)}`);
		return await this.repository.count(filter);
	}

	/**
	 * Check if entity exists
	 */
	async exists(filter: any): Promise<boolean> {
		this.logger.log(`Checking if entity exists with filter: ${JSON.stringify(filter)}`);
		return await this.repository.exists(filter);
	}
}