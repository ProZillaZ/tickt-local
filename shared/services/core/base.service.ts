import { ILogger, DatabaseConfig, DEFAULT_DATABASE_CONFIG } from '../interfaces';
import { ErrorHandler } from './error-handler';

/**
 * Base class for all API services providing common functionality
 */
export abstract class BaseService {
	protected errorHandler: ErrorHandler;
	protected config: DatabaseConfig;

	protected constructor(
		protected logger: ILogger,
		config?: Partial<DatabaseConfig>,
	) {
		this.errorHandler = new ErrorHandler(logger);
		this.config = { ...DEFAULT_DATABASE_CONFIG, ...config };
	}

	/**
	 * Convert Firestore timestamp to JavaScript Date
	 */
	protected convertTimestamp(timestamp: any): Date | undefined {
		if (!timestamp) return undefined;
		if (timestamp.toDate) return timestamp.toDate();
		if (timestamp instanceof Date) return timestamp;
		if (typeof timestamp === 'string') return new Date(timestamp);
		return undefined;
	}

	protected validateRequiredFields(data: any, fields: string[], context?: string): void {
		const missingFields = fields.filter(field =>
			data[field] === undefined || data[field] === null || data[field] === '',
		);

		if (missingFields.length > 0) {
			throw this.errorHandler.handleError(
				new Error(`Missing required fields: ${missingFields.join(', ')}`),
				context,
			);
		}
	}

	protected sanitizeString(value: string): string {
		return value.trim().toLowerCase();
	}

	protected createPaginationResult<T>(
		items: T[],
		requestedLimit: number,
		lastDoc?: any,
		total?: number,
	) {
		return {
			items,
			hasMore: items.length === requestedLimit,
			lastDoc,
			total,
			page: undefined,
			limit: requestedLimit,
			pages: total ? Math.ceil(total / requestedLimit) : undefined,
		};
	}

	protected logOperation(operation: string, params?: any): void {
		this.logger.debug(`Starting ${operation}`, params);
	}

	protected logSuccess(operation: string, result?: any): void {
		this.logger.info(`Successfully completed ${operation}`, result);
	}
}
