export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
	meta: {
		page: number;
		limit: number;
		totalCount: number;
		totalPages: number;
		hasNext: boolean;
		hasPrevious: boolean;
	};
}
