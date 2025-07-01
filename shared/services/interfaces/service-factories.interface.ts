import { ILogger, IDatabaseAdapter } from './';
import { IRecipeService, IUserService, IMealPlanService, IChatSessionService } from './';

/**
 * Service factory functions interface for dependency injection
 * Allows platforms to provide their own service implementations
 */
export interface ServiceFactories {
	createRecipeService: (logger: ILogger, adapter: IDatabaseAdapter) => IRecipeService;
	createUserService: (logger: ILogger, adapter: IDatabaseAdapter) => IUserService;
	createMealPlanService: (logger: ILogger, adapter: IDatabaseAdapter) => IMealPlanService;
	createChatSessionService: (adapter: IDatabaseAdapter) => IChatSessionService;
}

/**
 * Platform-specific database adapter providers
 */
export interface DatabaseAdapters {
	recipeAdapter: IDatabaseAdapter;
	userAdapter: IDatabaseAdapter;
	mealPlanAdapter: IDatabaseAdapter;
	chatSessionAdapter: IDatabaseAdapter;
}