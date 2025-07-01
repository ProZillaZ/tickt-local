import { CreateUserProfileDto, UpdateUserProfileDto, UserProfile } from '@tickt-engineering/types';
import { IDatabaseAdapter, ILogger, IUserService, PaginatedResult, SearchOptions, DEFAULT_DATABASE_CONFIG } from '../interfaces';
import { BaseService, NotFoundError, ValidationError } from '../core';

export class FirestoreUserService extends BaseService implements IUserService {
	private readonly collection = DEFAULT_DATABASE_CONFIG.collections.users;

	/**
	 * Protected constructor - prevents direct instantiation
	 * Use FirestoreServiceFactory.createUserService() instead
	 * @internal
	 */
	protected constructor(
		logger: ILogger,
		private dbAdapter: IDatabaseAdapter,
	) {
		super(logger);
	}

	/**
	 * Factory method for creating instances
	 * @internal - Only used by FirestoreServiceFactory
	 */
	static create(
		logger: ILogger,
		dbAdapter: IDatabaseAdapter,
	): FirestoreUserService {
		return new FirestoreUserService(logger, dbAdapter);
	}

	private convertDataToUserProfile(id: string, data: any): UserProfile {
		return {
			id,
			email: data.email,
			age: data.age,
			gender: data.gender,
			heightCm: data.heightCm,
			weightKg: data.weightKg,
			activityLevel: data.activityLevel,
			goal: data.goal,
			dietType: data.dietType,
			unitSystem: data.unitSystem,
			dietFilters: data.dietFilters,
			createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
			updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
		};
	}

	/**
	 * Convert UserProfile DTO to plain object for database storage
	 */
	private convertUserProfileToData(userProfile: CreateUserProfileDto | UpdateUserProfileDto): any {
		const now = new Date();

		const data: any = {
			...userProfile,
			updatedAt: now,
		};

		// Only add createdAt for new profiles
		if ('email' in userProfile && userProfile.email) {
			data.createdAt = now;
		}

		return data;
	}

	async getById(id: string): Promise<UserProfile | null> {
		try {
			this.logOperation('getById', { id });

			if (!id?.trim()) {
				throw new ValidationError('User ID is required');
			}

			const doc = await this.dbAdapter.get(this.collection, id);

			if (!doc) {
				return null;
			}

			const userProfile = this.convertDataToUserProfile(doc.id, doc.data);

			this.logSuccess('getById', { userId: id });
			return userProfile;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.getById');
		}
	}

	async getByEmail(email: string): Promise<UserProfile | null> {
		try {
			this.logOperation('getByEmail', { email });

			if (!email?.trim()) {
				throw new ValidationError('Email is required');
			}

			const queryOptions = {
				where: [{ field: 'email', op: '==', value: email.toLowerCase() }],
				limit: 1,
			};

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);

			if (queryResult.docs.length === 0) {
				return null;
			}

			const doc = queryResult.docs[0];
			const userProfile = this.convertDataToUserProfile(doc.id, doc.data);

			this.logSuccess('getByEmail', { email, userId: userProfile.id });
			return userProfile;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.getByEmail');
		}
	}

	async create(data: CreateUserProfileDto): Promise<UserProfile> {
		try {
			this.logOperation('create', { email: data.email });

			this.validateRequiredFields(data, ['email', 'age', 'gender', 'heightCm', 'weightKg'], 'create');

			// Check if user already exists
			const existingUser = await this.getByEmail(data.email);
			if (existingUser) {
				throw new ValidationError('User with this email already exists');
			}

			const userData = this.convertUserProfileToData(data);
			const newId = await this.dbAdapter.create(this.collection, userData);

			const newUser = await this.getById(newId);
			if (!newUser) {
				throw new Error('Failed to retrieve created user');
			}

			this.logSuccess('create', { userId: newId });
			return newUser;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.create');
		}
	}

	async update(id: string, data: UpdateUserProfileDto): Promise<UserProfile> {
		try {
			this.logOperation('update', { id });

			if (!id?.trim()) {
				throw new ValidationError('User ID is required');
			}

			// Check if user exists
			const existingUser = await this.getById(id);
			if (!existingUser) {
				throw new NotFoundError('User', id);
			}

			// If email is being updated, check it's not taken
			if (data.email && data.email !== existingUser.email) {
				const userWithEmail = await this.getByEmail(data.email);
				if (userWithEmail) {
					throw new ValidationError('Email is already in use by another user');
				}
			}

			const updateData = this.convertUserProfileToData(data);
			await this.dbAdapter.update(this.collection, id, updateData);

			const updatedUser = await this.getById(id);
			if (!updatedUser) {
				throw new Error('Failed to retrieve updated user');
			}

			this.logSuccess('update', { userId: id });
			return updatedUser;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.update');
		}
	}

	async delete(id: string): Promise<void> {
		try {
			this.logOperation('delete', { id });

			if (!id?.trim()) {
				throw new ValidationError('User ID is required');
			}

			// Check if user exists
			const existingUser = await this.getById(id);
			if (!existingUser) {
				throw new NotFoundError('User', id);
			}

			await this.dbAdapter.delete(this.collection, id);

			this.logSuccess('delete', { userId: id });
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.delete');
		}
	}

	async search(options: SearchOptions = {}): Promise<PaginatedResult<UserProfile>> {
		try {
			this.logOperation('search', { options });

			const {
				limit: limitCount = 10,
				orderBy: orderByField = 'createdAt',
				orderDirection = 'desc',
				lastDoc,
			} = options;

			const queryOptions: any = {
				limit: limitCount,
				orderBy: [{ field: orderByField, direction: orderDirection }],
				startAfter: lastDoc,
			};

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);
			const items: UserProfile[] = queryResult.docs.map(doc =>
				this.convertDataToUserProfile(doc.id, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('search', { itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.search');
		}
	}

	async getByActivityLevel(activityLevel: string, options: SearchOptions = {}): Promise<PaginatedResult<UserProfile>> {
		try {
			this.logOperation('getByActivityLevel', { activityLevel, options });

			if (!activityLevel?.trim()) {
				throw new ValidationError('Activity level is required');
			}

			const {
				limit: limitCount = 10,
				orderBy: orderByField = 'createdAt',
				orderDirection = 'desc',
				lastDoc,
			} = options;

			const queryOptions: any = {
				limit: limitCount,
				orderBy: [{ field: orderByField, direction: orderDirection }],
				where: [{ field: 'activityLevel', op: '==', value: activityLevel }],
				startAfter: lastDoc,
			};

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);
			const items: UserProfile[] = queryResult.docs.map(doc =>
				this.convertDataToUserProfile(doc.id, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('getByActivityLevel', { activityLevel, itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.getByActivityLevel');
		}
	}

	async getByDietGoal(goal: string, options: SearchOptions = {}): Promise<PaginatedResult<UserProfile>> {
		try {
			this.logOperation('getByDietGoal', { goal, options });

			if (!goal?.trim()) {
				throw new ValidationError('Diet goal is required');
			}

			const {
				limit: limitCount = 10,
				orderBy: orderByField = 'createdAt',
				orderDirection = 'desc',
				lastDoc,
			} = options;

			const queryOptions: any = {
				limit: limitCount,
				orderBy: [{ field: orderByField, direction: orderDirection }],
				where: [{ field: 'goal', op: '==', value: goal }],
				startAfter: lastDoc,
			};

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);
			const items: UserProfile[] = queryResult.docs.map(doc =>
				this.convertDataToUserProfile(doc.id, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('getByDietGoal', { goal, itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreUserService.getByDietGoal');
		}
	}
}
