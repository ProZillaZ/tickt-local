// Common types for Firebase Functions
export interface ApiResponse<T = any> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
	timestamp?: string;
	code?: string;
}

export interface PaginatedResponse<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	pages: number;
}

export interface ApiError {
	code: string;
	message: string;
	details?: any;
	statusCode?: number;
}

export interface AuthUser {
	uid: string;
	email?: string;
	emailVerified?: boolean;
	phoneNumber?: string;
	role?: string;
	customClaims?: Record<string, any>;
}

export interface AuthenticatedRequest {
	user?: AuthUser;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

export interface RequestContext {
	method: HttpMethod;
	path: string;
	query: { [key: string]: any };
	body: any;
	headers: { [key: string]: string };
	user?: AuthUser;
	timestamp: string;
	requestId?: string;
}

// Firebase Firestore related types
export interface FirestoreTimestamp {
	seconds: number;
	nanoseconds: number;

	toDate(): Date;
}

export interface BaseDocument {
	id: string;
	createdAt: Date | FirestoreTimestamp;
	updatedAt: Date | FirestoreTimestamp;
}

// Validation types
export type ValidationFieldType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface ValidationRule {
	required?: boolean;
	type?: ValidationFieldType;
	minLength?: number;
	maxLength?: number;
	min?: number;
	max?: number;
	pattern?: RegExp;
	custom?: (value: any) => boolean | string;
}

export type ValidationSchema = {
	[key: string]: ValidationRule;
};

export interface ValidationError {
	field: string;
	message: string;
	code: string;
}

// Error handling types
export interface ErrorDetails {
	field?: string;
	value?: any;
	expected?: any;
	received?: any;
	constraints?: Record<string, any>;
}

export interface ErrorContext {
	timestamp: string;
	path: string;
	method: string;
	userId?: string;
	requestId?: string;
	userAgent?: string;
	ip?: string;
}

// Function configuration types
export interface FunctionConfig {
	cors?: boolean;
	region?: string;
	memory?: '128MiB' | '256MiB' | '512MiB' | '1GiB' | '2GiB' | '4GiB' | '8GiB';
	timeoutSeconds?: number;
	maxInstances?: number;
	minInstances?: number;
	concurrency?: number;
}

// Database query types
export interface QueryOptions {
	page?: number;
	limit?: number;
	orderBy?: string;
	orderDirection?: 'asc' | 'desc';
	offset?: number;
}

export interface WhereCondition {
	field: string;
	operator: FirebaseFirestore.WhereFilterOp;
	value: any;
}

export interface DatabaseQuery extends QueryOptions {
	where?: WhereCondition[];
	select?: string[];
}

// Service response types
export interface ServiceResponse<T> {
	success: boolean;
	data?: T;
	error?: string;
	metadata?: Record<string, any>;
}

export interface PaginatedServiceResponse<T> extends ServiceResponse<PaginatedResponse<T>> {
	data: PaginatedResponse<T>;
}

// Middleware types
export type MiddlewareFunction = (
	request: any,
	response: any,
	next: () => Promise<void>,
) => Promise<void>;

export interface CorsOptions {
	origin: string[] | string | boolean;
	credentials?: boolean;
	optionsSuccessStatus?: number;
	methods?: string[];
	allowedHeaders?: string[];
	exposedHeaders?: string[];
	maxAge?: number;
}

// Cache types
export interface CacheOptions {
	ttl?: number; // Time to live in seconds
	key?: string;
	tags?: string[];
}

// Rate limiting types
export interface RateLimitOptions {
	windowMs: number;
	max: number;
	message?: string;
	standardHeaders?: boolean;
	legacyHeaders?: boolean;
}

// Monitoring and logging types
export interface LogLevel {
	DEBUG: 'debug';
	INFO: 'info';
	WARN: 'warn';
	ERROR: 'error';
}

export interface LogEntry {
	level: keyof LogLevel;
	message: string;
	timestamp: string;
	metadata?: Record<string, any>;
	error?: Error;
	userId?: string;
	requestId?: string;
}

// Health check types
export interface HealthStatus {
	status: 'healthy' | 'unhealthy' | 'degraded';
	timestamp: string;
	checks: {
		[serviceName: string]: {
			status: 'up' | 'down';
			message?: string;
			responseTime?: number;
		};
	};
	version?: string;
	uptime?: number;
}

// Export utility type helpers
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment types
export interface Environment {
	NODE_ENV: 'development' | 'staging' | 'production';
	FIREBASE_PROJECT_ID: string;
	FIREBASE_CONFIG?: string;
	LOG_LEVEL?: keyof LogLevel;
	CORS_ORIGINS?: string;
	API_VERSION?: string;
}

// Feature flag types
export interface FeatureFlag {
	name: string;
	enabled: boolean;
	rolloutPercentage?: number;
	userSegments?: string[];
	metadata?: Record<string, any>;
}

export interface FeatureFlags {
	[flagName: string]: FeatureFlag;
}
