import {
	LogLevel,
	Environment,
	ILogger,
	IServiceFactory,
	IRecipeService,
	IUserService,
	IMealPlanService,
	IChatSessionService,
	ServiceConfig,
} from '../interfaces';
import { Logger } from './logger';

export class ServiceFactory implements IServiceFactory {
	private static instance: ServiceFactory;
	private readonly logger: ILogger;
	private config: ServiceConfig;

	private recipeService?: IRecipeService;
	private userService?: IUserService;
	private mealPlanService?: IMealPlanService;
	private chatSessionService?: IChatSessionService;

	// Service implementation factories will be injected
	private RecipeServiceFactory?: (logger: ILogger) => IRecipeService;
	private UserServiceFactory?: (logger: ILogger) => IUserService;
	private MealPlanServiceFactory?: (logger: ILogger) => IMealPlanService;
	private ChatSessionServiceFactory?: () => IChatSessionService;

	private constructor(config: ServiceConfig = {}) {
		this.config = {
			logLevel: LogLevel.INFO,
			enableMetrics: false,
			enableCaching: false,
			environment: Environment.DEVELOPMENT,
			...config,
		};

		this.logger = new Logger('ServiceFactory');
		this.logger.setLevel(this.config.logLevel!);
	}

	static getInstance(config?: ServiceConfig): ServiceFactory {
		if (!ServiceFactory.instance) {
			ServiceFactory.instance = new ServiceFactory(config);
		}
		return ServiceFactory.instance;
	}

	static reset(): void {
		ServiceFactory.instance = undefined as any;
	}

	registerServices(services: {
		RecipeService?: (logger: ILogger) => IRecipeService;
		UserService?: (logger: ILogger) => IUserService;
		MealPlanService?: (logger: ILogger) => IMealPlanService;
		ChatSessionService?: () => IChatSessionService;
	}): void {
		if (services.RecipeService) {
			this.RecipeServiceFactory = services.RecipeService;
			this.recipeService = undefined; // Reset cached instance
		}
		if (services.UserService) {
			this.UserServiceFactory = services.UserService;
			this.userService = undefined;
		}
		if (services.MealPlanService) {
			this.MealPlanServiceFactory = services.MealPlanService;
			this.mealPlanService = undefined;
		}
		if (services.ChatSessionService) {
			this.ChatSessionServiceFactory = services.ChatSessionService;
			this.chatSessionService = undefined;
		}
	}

	getLogger(): ILogger {
		return this.logger;
	}

	getRecipeService(): IRecipeService {
		if (!this.recipeService) {
			if (!this.RecipeServiceFactory) {
				throw new Error('RecipeService implementation not registered. Call registerServices() first.');
			}
			this.recipeService = this.RecipeServiceFactory(new Logger('RecipeService'));
		}
		return this.recipeService;
	}

	getUserService(): IUserService {
		if (!this.userService) {
			if (!this.UserServiceFactory) {
				throw new Error('UserService implementation not registered. Call registerServices() first.');
			}
			this.userService = this.UserServiceFactory(new Logger('UserService'));
		}
		return this.userService;
	}

	getMealPlanService(): IMealPlanService {
		if (!this.mealPlanService) {
			if (!this.MealPlanServiceFactory) {
				throw new Error('MealPlanService implementation not registered. Call registerServices() first.');
			}
			this.mealPlanService = this.MealPlanServiceFactory(new Logger('MealPlanService'));
		}
		return this.mealPlanService;
	}

	getChatSessionService(): IChatSessionService {
		if (!this.chatSessionService) {
			if (!this.ChatSessionServiceFactory) {
				throw new Error('ChatSessionService implementation not registered. Call registerServices() first.');
			}
			this.chatSessionService = this.ChatSessionServiceFactory();
		}
		return this.chatSessionService;
	}

	updateConfig(newConfig: Partial<ServiceConfig>): void {
		this.config = { ...this.config, ...newConfig };

		if (newConfig.logLevel !== undefined) {
			this.logger.setLevel(newConfig.logLevel);
		}

		this.logger.info('Service factory configuration updated', newConfig);
	}

	reset(): void {
		this.recipeService = undefined;
		this.userService = undefined;
		this.mealPlanService = undefined;
		this.chatSessionService = undefined;
		this.logger.info('Service factory reset');
	}
}
