import {
	ValidationPipe as NestValidationPipe,
	BadRequestException,
	ValidationError,
} from '@nestjs/common';

export class ValidationPipe extends NestValidationPipe {
	constructor() {
		super({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			exceptionFactory: (validationErrors: ValidationError[] = []) => {
				const errors = this.extractErrorMessages(validationErrors);
				return new BadRequestException({
					success: false,
					message: 'Validation failed',
					error: errors,
				});
			},
		});
	}

	private extractErrorMessages(validationErrors: ValidationError[]): string[] {
		const errors = [];

		for (const error of validationErrors) {
			if (error.constraints) {
				errors.push(...Object.values(error.constraints));
			}

			if (error.children && error.children.length > 0) {
				errors.push(...this.extractErrorMessages(error.children));
			}
		}

		return errors;
	}
}
