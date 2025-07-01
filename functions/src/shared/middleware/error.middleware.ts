import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';

export class AppError extends Error {
	public readonly statusCode: number;
	public readonly code?: string;
	public readonly details?: any;
	public readonly isOperational: boolean;

	constructor(
		statusCode: number,
		message: string,
		code?: string,
		details?: any,
		isOperational: boolean = true,
	) {
		super(message);
		this.name = 'AppError';
		this.statusCode = statusCode;
		this.code = code;
		this.details = details;
		this.isOperational = isOperational;

		// Maintains proper stack trace for where error was thrown (Node.js only)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppError);
		}
	}
}

export class ValidationError extends AppError {
	constructor(message: string, details?: any) {
		super(400, message, 'VALIDATION_ERROR', details);
	}
}

export class AuthenticationError extends AppError {
	constructor(message: string = 'Authentication required', code?: string) {
		super(401, message, code || 'AUTH_ERROR');
	}
}

export class AuthorizationError extends AppError {
	constructor(message: string = 'Insufficient permissions', details?: any) {
		super(403, message, 'AUTHORIZATION_ERROR', details);
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string = 'Resource') {
		super(404, `${resource} not found`, 'NOT_FOUND');
	}
}

export class ConflictError extends AppError {
	constructor(message: string, details?: any) {
		super(409, message, 'CONFLICT', details);
	}
}

interface ErrorResponse {
	success: false;
	error: string;
	code?: string;
	details?: any;
	stack?: string;
	timestamp: string;
	path: string;
	method: string;
}

export const errorHandler = (
	error: any,
	request: Request,
	response: express.Response,
): void => {
	const timestamp = new Date().toISOString();
	const { method, url: path } = request;

	// Log error details
	console.error('Error occurred:', {
		error: error.message,
		stack: error.stack,
		code: error.code,
		statusCode: error.statusCode,
		url: path,
		method,
		body: request.body,
		query: request.query,
		headers: {
			'user-agent': request.headers['user-agent'],
			'authorization': request.headers.authorization ? '[REDACTED]' : undefined,
		},
		timestamp,
	});

	// Default error response
	let statusCode = 500;
	let errorMessage = 'Internal server error';
	let errorCode = 'INTERNAL_ERROR';
	let details: any = undefined;

	// Handle known AppError instances
	if (error instanceof AppError) {
		statusCode = error.statusCode;
		errorMessage = error.message;
		errorCode = error.code || 'APP_ERROR';
		details = error.details;
	}
	// Handle Firebase Auth errors
	else if (error.code?.startsWith('auth/')) {
		statusCode = 401;
		errorCode = error.code;

		switch (error.code) {
			case 'auth/id-token-expired':
				errorMessage = 'Authentication token has expired';
				break;
			case 'auth/id-token-revoked':
				errorMessage = 'Authentication token has been revoked';
				break;
			case 'auth/invalid-id-token':
				errorMessage = 'Invalid authentication token';
				break;
			case 'auth/user-disabled':
				statusCode = 403;
				errorMessage = 'User account has been disabled';
				break;
			case 'auth/user-not-found':
				statusCode = 404;
				errorMessage = 'User not found';
				break;
			case 'auth/email-already-exists':
				statusCode = 409;
				errorMessage = 'Email address is already in use';
				break;
			case 'auth/phone-number-already-exists':
				statusCode = 409;
				errorMessage = 'Phone number is already in use';
				break;
			case 'auth/invalid-email':
				statusCode = 400;
				errorMessage = 'Invalid email address';
				break;
			case 'auth/weak-password':
				statusCode = 400;
				errorMessage = 'Password is too weak';
				break;
			default:
				errorMessage = 'Authentication error';
		}
	}
	// Handle Firestore errors
	else if (error.code?.includes('firestore') || error.code?.includes('not-found')) {
		statusCode = 404;
		errorMessage = 'Resource not found';
		errorCode = 'RESOURCE_NOT_FOUND';
	}
	// Handle Firestore permission errors
	else if (error.code === 'permission-denied') {
		statusCode = 403;
		errorMessage = 'Permission denied';
		errorCode = 'PERMISSION_DENIED';
	}
	// Handle validation errors (from Firebase Functions)
	else if (error.code === 'invalid-argument') {
		statusCode = 400;
		errorMessage = 'Invalid request data';
		errorCode = 'INVALID_ARGUMENT';
		details = error.message;
	}
	// Handle rate limiting errors
	else if (error.code === 'resource-exhausted') {
		statusCode = 429;
		errorMessage = 'Too many requests';
		errorCode = 'RATE_LIMITED';
	}
	// Handle timeout errors
	else if (error.code === 'deadline-exceeded') {
		statusCode = 408;
		errorMessage = 'Request timeout';
		errorCode = 'TIMEOUT';
	}
	// Handle network/connection errors
	else if (error.code === 'unavailable') {
		statusCode = 503;
		errorMessage = 'Service temporarily unavailable';
		errorCode = 'SERVICE_UNAVAILABLE';
	}
	// Handle other gRPC/Firebase errors
	else if (error.code?.includes('cancelled')) {
		statusCode = 499;
		errorMessage = 'Request cancelled';
		errorCode = 'REQUEST_CANCELLED';
	}
	// Handle JSON parsing errors
	else if (error instanceof SyntaxError && error.message.includes('JSON')) {
		statusCode = 400;
		errorMessage = 'Invalid JSON in request body';
		errorCode = 'INVALID_JSON';
	}
	// Handle CORS errors
	else if (error.message?.includes('CORS')) {
		statusCode = 403;
		errorMessage = 'CORS policy violation';
		errorCode = 'CORS_ERROR';
	}

	// Prepare error response
	const errorResponse: ErrorResponse = {
		success: false,
		error: errorMessage,
		code: errorCode,
		timestamp,
		path,
		method,
	};

	// Add details if available
	if (details !== undefined) {
		errorResponse.details = details;
	}

	// Add stack trace in development mode
	if (process.env.NODE_ENV === 'development' && error.stack) {
		errorResponse.stack = error.stack;
	}

	// Send error response
	response.status(statusCode).json(errorResponse);
};

export const asyncHandler = <T = Request>(
	fn: (req: T, res: express.Response) => Promise<void>,
) => {
	return async (request: T, response: express.Response): Promise<void> => {
		try {
			await fn(request, response);
		} catch (error) {
			errorHandler(error, request as any, response);
		}
	};
};

export const notFoundHandler = (
	request: Request,
	response: express.Response,
): void => {
	const errorResponse: ErrorResponse = {
		success: false,
		error: `Route ${request.method} ${request.path} not found`,
		code: 'ROUTE_NOT_FOUND',
		timestamp: new Date().toISOString(),
		path: request.path,
		method: request.method,
	};

	response.status(404).json(errorResponse);
};

// Graceful error handling for unhandled promise rejections
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	// Don't exit the process in Cloud Functions
	// process.exit(1);
});

// Graceful error handling for uncaught exceptions
process.on('uncaughtException', (error: Error) => {
	console.error('Uncaught Exception:', error);
	// Don't exit the process in Cloud Functions
	// process.exit(1);
});
