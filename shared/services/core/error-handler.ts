import { ILogger } from '../interfaces';

export class AppError extends Error {
	public readonly code: string;
	public readonly statusCode?: number;
	public readonly isOperational: boolean;
	public readonly context?: string;

	constructor(
		message: string,
		code: string = 'GENERIC_ERROR',
		statusCode?: number,
		isOperational: boolean = true,
		context?: string,
	) {
		super(message);
		this.name = 'AppError';
		this.code = code;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.context = context;

		Error.captureStackTrace(this, this.constructor);
	}
}

export class ValidationError extends AppError {
	constructor(message: string, field?: string, context?: string) {
		super(message, 'VALIDATION_ERROR', 400, true, context);
		this.name = 'ValidationError';
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string, id?: string, context?: string) {
		const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
		super(message, 'NOT_FOUND', 404, true, context);
		this.name = 'NotFoundError';
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = 'Unauthorized access', context?: string) {
		super(message, 'UNAUTHORIZED', 401, true, context);
		this.name = 'UnauthorizedError';
	}
}

export class ConflictError extends AppError {
	constructor(message: string, context?: string) {
		super(message, 'CONFLICT', 409, true, context);
		this.name = 'ConflictError';
	}
}

export class NetworkError extends AppError {
	constructor(message: string = 'Network error occurred', context?: string) {
		super(message, 'NETWORK_ERROR', 503, true, context);
		this.name = 'NetworkError';
	}
}

export class ErrorHandler {
	constructor(private logger: ILogger) {
	}

	handleError(error: Error, context?: string): AppError {
		const contextMessage = context ? `[${context}] ` : '';

		if (error instanceof AppError) {
			this.logger.error(`${contextMessage}${error.message}`, error);
			return error;
		}

		// Handle Firebase/Firestore specific errors
		if (error.message.includes('permission-denied')) {
			const appError = new UnauthorizedError('Permission denied', context);
			this.logger.error(`${contextMessage}${appError.message}`, error);
			return appError;
		}

		if (error.message.includes('not-found')) {
			const appError = new NotFoundError('Resource', undefined, context);
			this.logger.error(`${contextMessage}${appError.message}`, error);
			return appError;
		}

		if (error.message.includes('already-exists')) {
			const appError = new ConflictError('Resource already exists', context);
			this.logger.error(`${contextMessage}${appError.message}`, error);
			return appError;
		}

		if (error.message.includes('network') || error.message.includes('offline')) {
			const appError = new NetworkError('Network connection failed', context);
			this.logger.error(`${contextMessage}${appError.message}`, error);
			return appError;
		}

		if (error.message.includes('invalid-argument')) {
			const appError = new ValidationError('Invalid request data', undefined, context);
			this.logger.error(`${contextMessage}${appError.message}`, error);
			return appError;
		}

		// Generic error
		const appError = new AppError(
			`${contextMessage}An unexpected error occurred: ${error.message}`,
			'UNKNOWN_ERROR',
			500,
			false,
			context,
		);
		this.logger.error(`${contextMessage}Unexpected error`, error);
		return appError;
	}

	isOperationalError(error: Error): boolean {
		if (error instanceof AppError) {
			return error.isOperational;
		}
		return false;
	}
}
