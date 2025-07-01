/**
 * Common types used across all services
 */

export interface PaginatedResult<T> {
	items: T[];
	hasMore: boolean;
	lastDoc?: any;
	total?: number;
	page?: number;
	limit?: number;
	pages?: number;
}

export interface SearchOptions {
	page?: number;
	limit?: number;
	orderBy?: string;
	orderDirection?: 'asc' | 'desc';
	lastDoc?: any;
}

export enum LogLevel {
	DEBUG = 0,
	INFO = 1,
	WARN = 2,
	ERROR = 3,
}

export enum Environment {
	DEVELOPMENT = 'development',
	STAGING = 'staging',
	PRODUCTION = 'production',
	TEST = 'test',
}

export interface ServiceConfig {
	logLevel?: LogLevel;
	enableMetrics?: boolean;
	enableCaching?: boolean;
	environment?: Environment;
}

export interface DatabaseConfig {
	collections: {
		users: string;
		recipes: string;
		mealPlans: string;
		chatSessions: string;
	};
}

export const DEFAULT_DATABASE_CONFIG: DatabaseConfig = {
	collections: {
		users: 'users',
		recipes: 'recipes',
		mealPlans: 'meal_plans',
		chatSessions: 'chat_sessions',
	},
};
