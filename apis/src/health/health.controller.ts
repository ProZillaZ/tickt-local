import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@ApiTags('health')
@Controller('health')
export class HealthController {
	constructor(
		private readonly configService: ConfigService,
		@InjectConnection() private readonly connection: Connection,
	) {
	}

	@Get()
	@ApiOperation({ summary: 'Health check endpoint' })
	@ApiResponse({ status: 200, description: 'Application health status' })
	async getHealth() {
		const dbStatus = this.connection.readyState === 1 ? 'connected' : 'disconnected';

		return {
			success: true,
			timestamp: new Date().toISOString(),
			service: 'mealtickt API',
			version: '1.0.0',
			environment: this.configService.get<string>('app.environment'),
			database: {
				status: dbStatus,
				name: this.configService.get<string>('database.name'),
			},
			uptime: Math.floor(process.uptime()),
		};
	}

	@Get('ready')
	@ApiOperation({ summary: 'Readiness check endpoint' })
	@ApiResponse({ status: 200, description: 'Application readiness status' })
	async getReadiness() {
		const isReady = this.connection.readyState === 1;

		return {
			success: isReady,
			ready: isReady,
			timestamp: new Date().toISOString(),
		};
	}

	@Get('live')
	@ApiOperation({ summary: 'Liveness check endpoint' })
	@ApiResponse({ status: 200, description: 'Application liveness status' })
	async getLiveness() {
		return {
			success: true,
			alive: true,
			timestamp: new Date().toISOString(),
		};
	}
}
