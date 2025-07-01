import { ILogger } from './logger-interface';
import { IRecipeService } from './recipe-service.interface';
import { IUserService } from './user-service.interface';
import { IMealPlanService } from './meal-plan-service.interface';
import { IChatSessionService } from './chat-session-service.interface';
import { ServiceConfig } from './common-types';

export interface IServiceFactory {
	getLogger(): ILogger;

	getRecipeService(): IRecipeService;

	getUserService(): IUserService;

	getMealPlanService(): IMealPlanService;

	getChatSessionService(): IChatSessionService;

	updateConfig(newConfig: Partial<ServiceConfig>): void;

	reset(): void;
}
