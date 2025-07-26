import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';

export interface RangeFilter {
	min?: number;
	max?: number;
}

export interface DateRangeFilter {
	startDate?: string | Date;
	endDate?: string | Date;
}

export interface TextSearchFilter {
	search?: string;
	fields?: string[];
}

export interface ArrayFilter {
	values: any[];
	operator?: '$in' | '$all';
}

@Injectable()
export class QueryBuilderService {
	/**
	 * Build text search filter
	 */
	buildTextSearch(searchFilter: TextSearchFilter): FilterQuery<any> {
		if (!searchFilter.search) {
			return {};
		}

		if (searchFilter.fields && searchFilter.fields.length > 0) {
			// Multi-field regex search
			const regexPattern = { $regex: searchFilter.search, $options: 'i' };
			return {
				$or: searchFilter.fields.map(field => ({ [field]: regexPattern }))
			};
		}

		// Full-text search
		return { $text: { $search: searchFilter.search } };
	}

	/**
	 * Build range filter (for numeric fields)
	 */
	buildRangeFilter(field: string, range: RangeFilter): FilterQuery<any> {
		const filter: any = {};

		if (range.min !== undefined && range.max !== undefined) {
			filter[field] = { $gte: range.min, $lte: range.max };
		} else if (range.min !== undefined) {
			filter[field] = { $gte: range.min };
		} else if (range.max !== undefined) {
			filter[field] = { $lte: range.max };
		}

		return filter;
	}

	/**
	 * Build date range filter
	 */
	buildDateRangeFilter(field: string, dateRange: DateRangeFilter): FilterQuery<any> {
		const filter: any = {};

		if (dateRange.startDate && dateRange.endDate) {
			filter[field] = {
				$gte: new Date(dateRange.startDate),
				$lte: new Date(dateRange.endDate)
			};
		} else if (dateRange.startDate) {
			filter[field] = { $gte: new Date(dateRange.startDate) };
		} else if (dateRange.endDate) {
			filter[field] = { $lte: new Date(dateRange.endDate) };
		}

		return filter;
	}

	/**
	 * Build array filter (for array fields)
	 */
	buildArrayFilter(field: string, arrayFilter: ArrayFilter): FilterQuery<any> {
		if (!arrayFilter.values || arrayFilter.values.length === 0) {
			return {};
		}

		const operator = arrayFilter.operator || '$in';
		return { [field]: { [operator]: arrayFilter.values } };
	}

	/**
	 * Build regex filter for partial string matching
	 */
	buildRegexFilter(field: string, value: string, caseSensitive: boolean = false): FilterQuery<any> {
		if (!value) {
			return {};
		}

		const options = caseSensitive ? '' : 'i';
		return { [field]: { $regex: value, $options: options } };
	}

	/**
	 * Build nested field filter (e.g., 'user.name', 'tags.name')
	 */
	buildNestedFieldFilter(nestedField: string, value: any, operator: string = '$eq'): FilterQuery<any> {
		if (value === undefined || value === null) {
			return {};
		}

		if (operator === '$regex') {
			return { [nestedField]: { $regex: value, $options: 'i' } };
		}

		return { [nestedField]: { [operator]: value } };
	}

	/**
	 * Build sort options
	 */
	buildSortOptions(sortBy?: string, sortOrder?: 'asc' | 'desc'): { [key: string]: 1 | -1 } {
		if (!sortBy) {
			return { createdAt: -1 };
		}

		const order = sortOrder === 'desc' ? -1 : 1;
		return { [sortBy]: order };
	}

	/**
	 * Combine multiple filters with AND logic
	 */
	combineFilters(filters: FilterQuery<any>[]): FilterQuery<any> {
		const nonEmptyFilters = filters.filter(filter => Object.keys(filter).length > 0);

		if (nonEmptyFilters.length === 0) {
			return {};
		}

		if (nonEmptyFilters.length === 1) {
			return nonEmptyFilters[0];
		}

		return { $and: nonEmptyFilters };
	}

	/**
	 * Combine multiple filters with OR logic
	 */
	combineFiltersWithOr(filters: FilterQuery<any>[]): FilterQuery<any> {
		const nonEmptyFilters = filters.filter(filter => Object.keys(filter).length > 0);

		if (nonEmptyFilters.length === 0) {
			return {};
		}

		if (nonEmptyFilters.length === 1) {
			return nonEmptyFilters[0];
		}

		return { $or: nonEmptyFilters };
	}

	/**
	 * Build aggregation pipeline for computed fields
	 */
	buildComputedFieldPipeline(computedFields: { [key: string]: any }): any[] {
		const pipeline: any[] = [];

		if (Object.keys(computedFields).length > 0) {
			pipeline.push({
				$addFields: computedFields
			});
		}

		return pipeline;
	}

	/**
	 * Build pagination pipeline
	 */
	buildPaginationPipeline(page: number, limit: number): any[] {
		const skip = (page - 1) * limit;
		return [
			{ $skip: skip },
			{ $limit: limit }
		];
	}
}