import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin SDK
let app: App;

if (getApps().length === 0) {
	// Check if running in emulator
	if (process.env.FUNCTIONS_EMULATOR === 'true') {
		app = initializeApp({
			projectId: 'tickt-90f02',
		});
	} else {
		app = initializeApp();
	}
} else {
	app = getApps()[0];
}

// Initialize Firestore with settings
const db = getFirestore(app);

// Configure for emulator if running locally
if (process.env.FUNCTIONS_EMULATOR === 'true') {
	db.settings({
		host: 'localhost:8081',
		ssl: false,
		ignoreUndefinedProperties: true,
	});
} else {
	db.settings({
		ignoreUndefinedProperties: true,
	});
}

// Initialize Auth
const auth = getAuth(app);

// Configure Auth emulator if running locally
if (process.env.FUNCTIONS_EMULATOR === 'true') {
	process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9098';
}

// Import all module handlers
import * as recipesHandlers from './modules/recipes/handlers/recipes.handlers';

// Export functions with module prefixes
// This creates functions like: recipes-getRecipe, recipes-createRecipe, etc.
export const recipes = recipesHandlers;

// Health check function
export const healthCheck = require('firebase-functions/v2/https').onRequest({
	cors: true,
	region: 'us-central1',
	memory: '128MiB',
	timeoutSeconds: 30,
}, async (request: any, response: any) => {
	try {
		// Test database connection
		const testDoc = await db.collection('_health').doc('test').get();

		// Test auth service
		await auth.listUsers(1);

		const healthStatus = {
			status: 'healthy',
			timestamp: new Date().toISOString(),
			version: process.env.FUNCTION_VERSION || '1.0.0',
			checks: {
				firestore: { status: 'up', message: 'Connected' },
				auth: { status: 'up', message: 'Connected' },
			},
		};

		response.status(200).json(healthStatus);
	} catch (error: any) {
		console.error('Health check failed:', error);

		const healthStatus = {
			status: 'unhealthy',
			timestamp: new Date().toISOString(),
			checks: {
				firestore: { status: 'down', message: error.message },
				auth: { status: 'down', message: error.message },
			},
		};

		response.status(503).json(healthStatus);
	}
});

// Example of how to add other modules:
// import * as coachHandlers from './modules/coach/handlers';
// import * as usersHandlers from './modules/users/handlers';
// import * as mealPlansHandlers from './modules/meal-plans/handlers';
//
// export const coach = coachHandlers;
// export const users = usersHandlers;
// export const mealPlans = mealPlansHandlers;
