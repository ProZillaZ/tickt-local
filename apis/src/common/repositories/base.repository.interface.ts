import { Document, FilterQuery, UpdateQuery } from 'mongoose';
import { PaginatedResponse } from '../interfaces/api-response.interface';

export interface PaginationOptions {
	page?: number;
	limit?: number;
	skip?: number;
}

export interface SortOptions {
	[key: string]: 1 | -1;
}

export interface QueryOptions extends PaginationOptions {
	sort?: SortOptions;
	populate?: string | string[];
}

export interface IBaseRepository<T extends Document> {
	/**
	 * Create a new document
	 */
	create(createDto: any): Promise<T>;

	/**
	 * Find all documents with optional filtering and pagination
	 */
	findAll(filter?: FilterQuery<T>, options?: QueryOptions): Promise<PaginatedResponse<T>>;

	/**
	 * Find documents without pagination
	 */
	find(filter?: FilterQuery<T>, options?: Omit<QueryOptions, 'page' | 'limit' | 'skip'>): Promise<T[]>;

	/**
	 * Find a single document by ID
	 */
	findById(id: string): Promise<T | null>;

	/**
	 * Find a single document by filter
	 */
	findOne(filter: FilterQuery<T>): Promise<T | null>;

	/**
	 * Update a document by ID
	 */
	update(id: string, updateDto: UpdateQuery<T>): Promise<T | null>;

	/**
	 * Update multiple documents
	 */
	updateMany(filter: FilterQuery<T>, updateDto: UpdateQuery<T>): Promise<{ matchedCount: number; modifiedCount: number }>;

	/**
	 * Delete a document by ID
	 */
	delete(id: string): Promise<boolean>;

	/**
	 * Delete multiple documents
	 */
	deleteMany(filter: FilterQuery<T>): Promise<{ deletedCount: number }>;

	/**
	 * Count documents matching filter
	 */
	count(filter?: FilterQuery<T>): Promise<number>;

	/**
	 * Check if document exists
	 */
	exists(filter: FilterQuery<T>): Promise<boolean>;
}