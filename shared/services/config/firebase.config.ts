import { Environment } from '../interfaces';

export interface FirebaseConfig {
	projectId: string;
	region: string;
	environment: Environment;
}

export const firebaseConfigs: Record<string, FirebaseConfig> = {
	development: {
		projectId: 'tickt-90f02',
		region: 'us-central1',
		environment: Environment.DEVELOPMENT,
	},
	production: {
		projectId: 'tickt-prod',
		region: 'europe-west1', // eur3 region
		environment: Environment.PRODUCTION,
	},
};

/**
 * Get Firebase configuration based on environment
 */
export function getFirebaseConfig(): FirebaseConfig {
	const env = process.env.NODE_ENV || process.env.FIREBASE_ENV || Environment.DEVELOPMENT;

	if (env === Environment.PRODUCTION || env === 'production' || env === 'prod') {
		return firebaseConfigs.production;
	}

	return firebaseConfigs.development;
}

/**
 * Get current environment
 */
export function getCurrentEnvironment(): Environment {
	return getFirebaseConfig().environment;
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
	return getCurrentEnvironment() === Environment.PRODUCTION;
}
