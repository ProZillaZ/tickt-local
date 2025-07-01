/**
 * Factory for creating Firestore service instances
 * Prevents direct instantiation and ensures proper dependency injection
 */

import {
	ILogger,
	IRecipeService,
	IUserService,
	IMealPlanService,
	IChatSessionService,
	IDatabaseAdapter,
} from '../interfaces';
import { FirestoreRecipeService } from './firestore-recipe.service';
import { FirestoreUserService } from './firestore-user.service';
import { FirestoreMealPlanService } from './firestore-meal-plan.service';
import { FirestoreChatSessionService } from './firestore-chat-session.service';

export interface FirestoreModules {
	collection: any;
	doc: any;
	getDoc: any;
	getDocs: any;
	addDoc: any;
	updateDoc: any;
	deleteDoc: any;
	query: any;
	where: any;
	orderBy: any;
	limit: any;
	startAfter: any;
	QueryDocumentSnapshot: any;
	OrderByDirection: any;
}

export class FirestoreServiceFactory {

	/**
	 * @internal - Only used by ServiceFactory
	 */
	static createRecipeService(
		logger: ILogger,
		dbAdapter: IDatabaseAdapter,
	): IRecipeService {
		return FirestoreRecipeService.create(logger, dbAdapter);
	}

	/**
	 * @internal - Only used by ServiceFactory
	 */
	static createUserService(
		logger: ILogger,
		dbAdapter: IDatabaseAdapter,
	): IUserService {
		return FirestoreUserService.create(logger, dbAdapter);
	}

	/**
	 * @internal - Only used by ServiceFactory
	 */
	static createMealPlanService(
		logger: ILogger,
		dbAdapter: IDatabaseAdapter,
	): IMealPlanService {
		return FirestoreMealPlanService.create(logger, dbAdapter);
	}

	/**
	 * @internal - Only used by ServiceFactory
	 */
	static createChatSessionService(
		dbAdapter: IDatabaseAdapter,
	): IChatSessionService {
		return FirestoreChatSessionService.create(dbAdapter);
	}

	private constructor() {
		throw new Error('FirestoreServiceFactory cannot be instantiated. Use static methods.');
	}
}
