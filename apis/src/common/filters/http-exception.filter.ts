import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let status: number;
		let message: string | object;

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const exceptionResponse = exception.getResponse();
			message = typeof exceptionResponse === 'string'
				? exceptionResponse
				: exceptionResponse;
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			message = 'Internal server error';
		}

		const errorResponse = {
			success: false,
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			method: request.method,
			message,
		};

		response.status(status).json(errorResponse);
	}
}
