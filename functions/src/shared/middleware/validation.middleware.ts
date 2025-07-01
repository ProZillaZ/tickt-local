import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';

export type ValidationSchema = {
	[key: string]: {
		required?: boolean;
		type?: 'string' | 'number' | 'boolean' | 'array' | 'object';
		minLength?: number;
		maxLength?: number;
		min?: number;
		max?: number;
		pattern?: RegExp;
	};
};

export const validateBody = <T extends { body: any } = Request>(schema: ValidationSchema) => {
	return async (
		request: T,
		response: express.Response,
		next: (req: T, res: express.Response) => Promise<void>,
	): Promise<void> => {
		try {
			const body = request.body;
			const errors: string[] = [];

			for (const [field, rules] of Object.entries(schema)) {
				const value = body[field];

				// Check required fields
				if (rules.required && (value === undefined || value === null)) {
					errors.push(`Field '${field}' is required`);
					continue;
				}

				// Skip validation if field is not provided and not required
				if (value === undefined || value === null) {
					continue;
				}

				// Type validation
				if (rules.type) {
					const actualType = Array.isArray(value) ? 'array' : typeof value;
					if (actualType !== rules.type) {
						errors.push(`Field '${field}' must be of type ${rules.type}`);
						continue;
					}
				}

				// String validations
				if (typeof value === 'string') {
					if (rules.minLength && value.length < rules.minLength) {
						errors.push(`Field '${field}' must be at least ${rules.minLength} characters`);
					}
					if (rules.maxLength && value.length > rules.maxLength) {
						errors.push(`Field '${field}' must be at most ${rules.maxLength} characters`);
					}
					if (rules.pattern && !rules.pattern.test(value)) {
						errors.push(`Field '${field}' format is invalid`);
					}
				}

				// Number validations
				if (typeof value === 'number') {
					if (rules.min && value < rules.min) {
						errors.push(`Field '${field}' must be at least ${rules.min}`);
					}
					if (rules.max && value > rules.max) {
						errors.push(`Field '${field}' must be at most ${rules.max}`);
					}
				}

				// Array validations
				if (Array.isArray(value)) {
					if (rules.minLength && value.length < rules.minLength) {
						errors.push(`Field '${field}' must have at least ${rules.minLength} items`);
					}
					if (rules.maxLength && value.length > rules.maxLength) {
						errors.push(`Field '${field}' must have at most ${rules.maxLength} items`);
					}
				}
			}

			if (errors.length > 0) {
				response.status(400).json({
					success: false,
					error: 'Validation failed',
					details: errors,
				});
				return;
			}

			await next(request, response);
		} catch (error) {
			console.error('Validation error:', error);
			response.status(500).json({
				success: false,
				error: 'Internal validation error',
			});
		}
	};
};

export const validateQuery = <T extends { query: any } = Request>(schema: ValidationSchema) => {
	return async (
		request: T,
		response: express.Response,
		next: (req: T, res: express.Response) => Promise<void>,
	): Promise<void> => {
		try {
			const query = request.query;
			const errors: string[] = [];

			for (const [field, rules] of Object.entries(schema)) {
				const value = query[field];

				if (rules.required && !value) {
					errors.push(`Query parameter '${field}' is required`);
					continue;
				}

				if (!value) continue;

				// Convert string query params to appropriate types
				let convertedValue: any = value;
				if (rules.type === 'number') {
					convertedValue = Number(value);
					if (isNaN(convertedValue)) {
						errors.push(`Query parameter '${field}' must be a number`);
						continue;
					}
				}

				// Apply same validations as body
				if (rules.min && convertedValue < rules.min) {
					errors.push(`Query parameter '${field}' must be at least ${rules.min}`);
				}
				if (rules.max && convertedValue > rules.max) {
					errors.push(`Query parameter '${field}' must be at most ${rules.max}`);
				}
				if (rules.pattern && !rules.pattern.test(String(value))) {
					errors.push(`Query parameter '${field}' format is invalid`);
				}
			}

			if (errors.length > 0) {
				response.status(400).json({
					success: false,
					error: 'Query validation failed',
					details: errors,
				});
				return;
			}

			await next(request, response);
		} catch (error) {
			console.error('Query validation error:', error);
			response.status(500).json({
				success: false,
				error: 'Internal validation error',
			});
		}
	};
};
