import { Injectable } from '@nestjs/common';
import { PaginatedResponse } from '../interfaces/api-response.interface';

export interface PaginationMetadata {
	page: number;
	limit: number;
	totalCount: number;
	totalPages: number;
	hasNext: boolean;
	hasPrevious: boolean;
}

export interface PaginationParams {
	page?: number;
	limit?: number;
}

@Injectable()
export class PaginationService {
	private readonly DEFAULT_PAGE = 1;
	private readonly DEFAULT_LIMIT = 10;
	private readonly MAX_LIMIT = 100;

	/**
	 * Validate and normalize pagination parameters
	 */
	validatePaginationParams(params: PaginationParams): { page: number; limit: number; skip: number } {
		const page = Math.max(1, params.page || this.DEFAULT_PAGE);
		const limit = Math.min(this.MAX_LIMIT, Math.max(1, params.limit || this.DEFAULT_LIMIT));
		const skip = (page - 1) * limit;

		return { page, limit, skip };
	}

	/**
	 * Calculate pagination metadata
	 */
	calculateMetadata(page: number, limit: number, totalCount: number): PaginationMetadata {
		const totalPages = Math.ceil(totalCount / limit);

		return {
			page,
			limit,
			totalCount,
			totalPages,
			hasNext: page < totalPages,
			hasPrevious: page > 1,
		};
	}

	/**
	 * Create paginated response
	 */
	createPaginatedResponse<T>(
		data: T[],
		page: number,
		limit: number,
		totalCount: number,
		success: boolean = true
	): PaginatedResponse<T> {
		const meta = this.calculateMetadata(page, limit, totalCount);

		return {
			success,
			data,
			meta,
		};
	}

	/**
	 * Create paginated response with custom metadata
	 */
	createPaginatedResponseWithMetadata<T>(
		data: T[],
		metadata: PaginationMetadata,
		success: boolean = true
	): PaginatedResponse<T> {
		return {
			success,
			data,
			meta: metadata,
		};
	}

	/**
	 * Get pagination info for display
	 */
	getPaginationInfo(meta: PaginationMetadata): string {
		const start = (meta.page - 1) * meta.limit + 1;
		const end = Math.min(meta.page * meta.limit, meta.totalCount);

		return `Showing ${start}-${end} of ${meta.totalCount} items`;
	}

	/**
	 * Calculate offset for database queries
	 */
	calculateOffset(page: number, limit: number): number {
		return (page - 1) * limit;
	}

	/**
	 * Get next page number (or null if no next page)
	 */
	getNextPage(currentPage: number, totalPages: number): number | null {
		return currentPage < totalPages ? currentPage + 1 : null;
	}

	/**
	 * Get previous page number (or null if no previous page)
	 */
	getPreviousPage(currentPage: number): number | null {
		return currentPage > 1 ? currentPage - 1 : null;
	}

	/**
	 * Generate page numbers for pagination UI
	 */
	generatePageNumbers(currentPage: number, totalPages: number, maxDisplayPages: number = 5): number[] {
		if (totalPages <= maxDisplayPages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const halfMax = Math.floor(maxDisplayPages / 2);
		let start = Math.max(1, currentPage - halfMax);
		let end = Math.min(totalPages, start + maxDisplayPages - 1);

		// Adjust start if we're near the end
		if (end - start + 1 < maxDisplayPages) {
			start = Math.max(1, end - maxDisplayPages + 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	}

	/**
	 * Check if pagination is needed
	 */
	isPaginationNeeded(totalCount: number, limit: number): boolean {
		return totalCount > limit;
	}
}