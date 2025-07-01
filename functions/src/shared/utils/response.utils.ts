import * as express from 'express';
import { ApiResponse, PaginatedResponse } from '../types';

export class ResponseUtils {
	static success<T>(response: express.Response, data: T, message?: string): void {
		const result: ApiResponse<T> = {
			success: true,
			data,
			...(message && { message }),
		};
		response.status(200).json(result);
	}

	static created<T>(response: express.Response, data: T, message?: string): void {
		const result: ApiResponse<T> = {
			success: true,
			data,
			message: message || 'Resource created successfully',
		};
		response.status(201).json(result);
	}

	static paginated<T>(
		response: express.Response,
		paginatedData: PaginatedResponse<T>,
	): void {
		response.status(200).json({
			success: true,
			data: paginatedData,
		});
	}

	static noContent(response: express.Response, message?: string): void {
		response.status(204).json({
			success: true,
			message: message || 'Operation completed successfully',
		});
	}

	static badRequest(response: express.Response, message: string, details?: any): void {
		response.status(400).json({
			success: false,
			error: message,
			...(details && { details }),
		});
	}

	static unauthorized(response: express.Response, message?: string): void {
		response.status(401).json({
			success: false,
			error: message || 'Unauthorized',
		});
	}

	static forbidden(response: express.Response, message?: string): void {
		response.status(403).json({
			success: false,
			error: message || 'Forbidden',
		});
	}

	static notFound(response: express.Response, message?: string): void {
		response.status(404).json({
			success: false,
			error: message || 'Resource not found',
		});
	}

	static conflict(response: express.Response, message: string): void {
		response.status(409).json({
			success: false,
			error: message,
		});
	}

	static unprocessableEntity(response: express.Response, message: string, details?: any): void {
		response.status(422).json({
			success: false,
			error: message,
			...(details && { details }),
		});
	}

	static internalError(response: express.Response, message?: string): void {
		response.status(500).json({
			success: false,
			error: message || 'Internal server error',
		});
	}

	static custom<T>(
		response: express.Response,
		statusCode: number,
		data?: T,
		error?: string,
		message?: string,
	): void {
		const result: ApiResponse<T> = {
			success: statusCode < 400,
			...(data && { data }),
			...(error && { error }),
			...(message && { message }),
		};
		response.status(statusCode).json(result);
	}
}
