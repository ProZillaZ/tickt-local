import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MealPlansModule } from '@/meal-plans';
import { RecipesModule } from '@/recipes';
import { HealthModule } from './health/health.module';
import { LoggingInterceptor } from '@/common';
import { appConfig, databaseConfig } from './config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appConfig, databaseConfig],
			envFilePath: ['.env.local', '.env'],
		}),

		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('database.uri'),
				dbName: configService.get<string>('database.name'),
				retryWrites: true
			}),
			inject: [ConfigService],
		}),

		MealPlansModule,
		RecipesModule,
		HealthModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
	],
})
export class AppModule {
}
