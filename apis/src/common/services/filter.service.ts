import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

export interface FilterOptions {
	caseSensitive?: boolean;
	exactMatch?: boolean;
	allowPartialMatch?: boolean;
}

@Injectable()
export class FilterService {
	/**
	 * Build string filter with various matching options
	 */
	buildStringFilter(
		field: string,
		value: string | undefined,
		options: FilterOptions = {}
	): FilterQuery<any> {
		if (!value || value.trim().length === 0) {
			return {};
		}

		const trimmedValue = value.trim();
		const { caseSensitive = false, exactMatch = false, allowPartialMatch = true } = options;

		if (exactMatch) {
			return { [field]: caseSensitive ? trimmedValue : new RegExp(`^${trimmedValue}$`, 'i') };
		}

		if (allowPartialMatch) {
			const regexOptions = caseSensitive ? '' : 'i';
			return { [field]: { $regex: trimmedValue, $options: regexOptions } };
		}

		return { [field]: trimmedValue };
	}

	/**
	 * Build array contains filter (for array fields)
	 */
	buildArrayContainsFilter(field: string, value: any): FilterQuery<any> {
		if (value === undefined || value === null) {
			return {};
		}

		return { [field]: value };
	}

	/**
	 * Build numeric range filter
	 */
	buildNumericRangeFilter(
		field: string,
		min?: number,
		max?: number
	): FilterQuery<any> {
		const filter: any = {};

		if (min !== undefined && max !== undefined) {
			filter[field] = { $gte: min, $lte: max };
		} else if (min !== undefined) {
			filter[field] = { $gte: min };
		} else if (max !== undefined) {
			filter[field] = { $lte: max };
		}

		return filter;
	}

	/**
	 * Build date range filter
	 */
	buildDateRangeFilter(
		field: string,
		startDate?: string | Date,
		endDate?: string | Date
	): FilterQuery<any> {
		const filter: any = {};

		if (startDate && endDate) {
			filter[field] = {
				$gte: new Date(startDate),
				$lte: new Date(endDate)
			};
		} else if (startDate) {
			filter[field] = { $gte: new Date(startDate) };
		} else if (endDate) {
			filter[field] = { $lte: new Date(endDate) };
		}

		return filter;
	}

	/**
	 * Build enum filter
	 */
	buildEnumFilter(field: string, value: string | undefined): FilterQuery<any> {
		if (!value) {
			return {};
		}

		return { [field]: value };
	}

	/**
	 * Build boolean filter
	 */
	buildBooleanFilter(field: string, value: boolean | undefined): FilterQuery<any> {
		if (value === undefined) {
			return {};
		}

		return { [field]: value };
	}

	/**
	 * Build user ID filter (ObjectId)
	 */
	buildUserIdFilter(field: string, userId: string | undefined): FilterQuery<any> {
		if (!userId) {
			return {};
		}

		// Assuming we need to handle ObjectId conversion elsewhere
		return { [field]: userId };
	}

	/**
	 * Build nested field filter (e.g., "tags.name", "ingredients.name")
	 */
	buildNestedFieldFilter(
		nestedField: string,
		value: string | undefined,
		options: FilterOptions = {}
	): FilterQuery<any> {
		if (!value) {
			return {};
		}

		const { caseSensitive = false } = options;
		const regexOptions = caseSensitive ? '' : 'i';

		return { [nestedField]: { $regex: value, $options: regexOptions } };
	}

	/**
	 * Build expression filter for computed values
	 */
	buildExpressionFilter(expression: any): FilterQuery<any> {
		return { $expr: expression };
	}

	/**
	 * Build composite filter from multiple conditions
	 */
	buildCompositeFilter(filters: FilterQuery<any>[]): FilterQuery<any> {
		const validFilters = filters.filter(filter => 
			filter && Object.keys(filter).length > 0
		);

		if (validFilters.length === 0) {
			return {};
		}

		if (validFilters.length === 1) {
			return validFilters[0];
		}

		return { $and: validFilters };
	}

	/**
	 * Build OR filter from multiple conditions
	 */
	buildOrFilter(filters: FilterQuery<any>[]): FilterQuery<any> {
		const validFilters = filters.filter(filter => 
			filter && Object.keys(filter).length > 0
		);

		if (validFilters.length === 0) {
			return {};
		}

		if (validFilters.length === 1) {
			return validFilters[0];
		}

		return { $or: validFilters };
	}

	/**
	 * Clean empty filters from an object
	 */
	cleanEmptyFilters(filterObject: Record<string, any>): Record<string, any> {
		const cleaned: Record<string, any> = {};

		for (const [key, value] of Object.entries(filterObject)) {
			if (value !== undefined && value !== null && value !== '') {
				// Handle arrays
				if (Array.isArray(value) && value.length > 0) {
					cleaned[key] = value;
				}
				// Handle objects
				else if (typeof value === 'object' && !Array.isArray(value)) {
					const cleanedNested = this.cleanEmptyFilters(value);
					if (Object.keys(cleanedNested).length > 0) {
						cleaned[key] = cleanedNested;
					}
				}
				// Handle primitives
				else if (typeof value !== 'object') {
					cleaned[key] = value;
				}
			}
		}

		return cleaned;
	}

	/**
	 * Validate filter values
	 */
	validateFilterValue(value: any, type: 'string' | 'number' | 'boolean' | 'date'): boolean {
		switch (type) {
			case 'string':
				return typeof value === 'string' && value.trim().length > 0;
			case 'number':
				return typeof value === 'number' && !isNaN(value);
			case 'boolean':
				return typeof value === 'boolean';
			case 'date':
				return value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)));
			default:
				return true;
		}
	}
}