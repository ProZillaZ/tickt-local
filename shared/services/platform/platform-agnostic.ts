/**
 * Platform-Agnostic Service Initialization
 * Uses dependency injection - no platform-specific imports or knowledge
 */

import { ServiceFactory } from '../core';
import { LogLevel, Environment, ServiceConfig } from '../interfaces';
import { ServiceFactories, DatabaseAdapters } from '../interfaces';

/**
 * Initialize services with provided database adapters and service factories
 * It accepts factories rather than creating concrete implementations
 *
 * @param serviceConfig - Service configuration options
 * @param databaseAdapters - Platform-specific database adapters
 * @param serviceFactories - Platform-specific service factory functions
 * @returns Configured ServiceFactory instance
 */
export function initializeServices(
	serviceConfig: ServiceConfig = {},
	databaseAdapters: DatabaseAdapters,
	serviceFactories: ServiceFactories,
): ServiceFactory {
	const factory = ServiceFactory.getInstance({
		logLevel: LogLevel.INFO,
		enableMetrics: true,
		enableCaching: true,
		environment: Environment.DEVELOPMENT,
		...serviceConfig,
	});

	factory.registerServices({
		RecipeService: (logger: any) => {
			return serviceFactories.createRecipeService(logger, databaseAdapters.recipeAdapter);
		},
		UserService: (logger: any) => {
			return serviceFactories.createUserService(logger, databaseAdapters.userAdapter);
		},
		MealPlanService: (logger: any) => {
			return serviceFactories.createMealPlanService(logger, databaseAdapters.mealPlanAdapter);
		},
		ChatSessionService: () => {
			return serviceFactories.createChatSessionService(databaseAdapters.chatSessionAdapter);
		},
	});

	return factory;
}

export type { ServiceFactories, DatabaseAdapters } from '../interfaces';
export type { IDatabaseAdapter } from '../interfaces';
