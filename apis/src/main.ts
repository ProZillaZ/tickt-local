import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, HttpExceptionFilter } from '@/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	app.useGlobalPipes(new ValidationPipe());

	app.useGlobalFilters(new HttpExceptionFilter());

	const apiPrefix = configService.get<string>('app.apiPrefix');
	app.setGlobalPrefix(apiPrefix);

	app.enableCors({
		origin: true,
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	});

	// Swagger documentation
	if (configService.get<boolean>('app.swaggerEnabled')) {
		const config = new DocumentBuilder()
			.setTitle('mealtickt API')
			.setDescription('REST API for mealtickt with MongoDB')
			.setVersion('1.0')
			.addTag('meal-plans', 'Meal plan management endpoints')
			.addBearerAuth()
			.build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api/docs', app, document, {
			swaggerOptions: {
				persistAuthorization: true,
			},
		});

		console.log(`📚 Swagger documentation available at: http://localhost:${configService.get('app.port')}/api/docs`);
	}

	// Start server
	const port = configService.get<number>('app.port');
	await app.listen(port);

	console.log(`🚀 Application is running on: http://localhost:${port}/${apiPrefix}`);
	console.log(`🌍 Environment: ${configService.get('app.environment')}`);
	console.log(`📊 Database: ${configService.get('database.name')}`);
}

bootstrap();
