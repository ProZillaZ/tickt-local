import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger(LoggingInterceptor.name);

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		if (context.getType() === 'http') {
			const request = context.switchToHttp().getRequest<Request>();
			const response = context.switchToHttp().getResponse<Response>();
			const { method, url, ip } = request;
			const userAgent = request.get('user-agent') || '';

			const now = Date.now();

			return next
				.handle()
				.pipe(
					tap(() => {
						const { statusCode } = response;
						const contentLength = response.get('content-length');
						const responseTime = Date.now() - now;

						this.logger.log(
							`${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} +${responseTime}ms`,
						);
					}),
				);
		}

		return next.handle();
	}
}
