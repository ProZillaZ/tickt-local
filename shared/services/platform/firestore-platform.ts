/**
 * Firestore Platform Implementation
 * Contains Firestore-specific service factories and adapters
 */

import { ServiceFactories, DatabaseAdapters, LogLevel, Environment, ServiceConfig } from '../interfaces';
import { initializeServices } from './platform-agnostic';
import {
	FirestoreRecipeService,
	FirestoreUserService,
	FirestoreMealPlanService,
	FirestoreChatSessionService,
} from '../firestore';
import { FirebaseDatabaseAdapter, FirebaseModules } from '../adapters';

export const firestoreServiceFactories: ServiceFactories = {
	createRecipeService: (logger, adapter) => {
		return FirestoreRecipeService.create(logger, adapter);
	},
	createUserService: (logger, adapter) => {
		return FirestoreUserService.create(logger, adapter);
	},
	createMealPlanService: (logger, adapter) => {
		return FirestoreMealPlanService.create(logger, adapter);
	},
	createChatSessionService: (adapter) => {
		return FirestoreChatSessionService.create(adapter);
	},
};

/**
 * Helper function to create Firebase database adapters
 * Eliminates boilerplate in consuming code
 */
export function createFirebaseAdapters(firebase: FirebaseModules): DatabaseAdapters {
	const adapter = new FirebaseDatabaseAdapter(firebase);

	// All services can share the same Firebase adapter
	return {
		recipeAdapter: adapter,
		userAdapter: adapter,
		mealPlanAdapter: adapter,
		chatSessionAdapter: adapter,
	};
}

/**
 * Convenience function: Initialize services with Firebase
 * For platforms that want a simple Firebase setup
 */
export function initializeFirestoreServices(
	firebase: FirebaseModules,
	serviceConfig: ServiceConfig = {},
) {
	const adapters = createFirebaseAdapters(firebase);
	return initializeServices(serviceConfig, adapters, firestoreServiceFactories);
}

export { FirebaseDatabaseAdapter } from '../adapters/firebase-database.adapter';
export type { FirebaseModules } from '../adapters/firebase-database.adapter';
