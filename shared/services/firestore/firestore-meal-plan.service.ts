import {
	CreateMealPlanDto,
	IDatabaseAdapter,
	ILogger,
	IMealPlanService,
	MealPlanFilter,
	PaginatedResult,
	SearchOptions,
	UpdateMealPlanDto,
	DEFAULT_DATABASE_CONFIG,
} from '../interfaces';
import { WeekMealPlan } from '@tickt-engineering/types';
import { BaseService, NotFoundError, ValidationError } from '../core';

/**
 * Improved Firestore Meal Plan Service with User-Grouped Data Structure
 *
 * Data Structure: meal_plans/{userId}/{mealPlanId}
 * Benefits:
 * - Better query performance (no userId filtering needed)
 * - Improved security (natural user data isolation)
 * - Reduced Firestore costs (fewer document reads)
 * - Better scalability (user data naturally partitioned)
 * - Cleaner structure (no unnecessary subcollections)
 */
export class FirestoreMealPlanService extends BaseService implements IMealPlanService {
	private readonly collection = DEFAULT_DATABASE_CONFIG.collections.mealPlans;

	/**
	 * Protected constructor - prevents direct instantiation
	 * Use FirestoreServiceFactory.createMealPlanService() instead
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
	): FirestoreMealPlanService {
		return new FirestoreMealPlanService(logger, dbAdapter);
	}

	private getUserCollectionPath(userId: string): string {
		return `${this.collection}/${userId}`;
	}

	private convertDataToMealPlan(id: string, userId: string, data: any): WeekMealPlan {
		return {
			id,
			userId, // We know the userId from the collection path
			startDate: data.startDate,
			endDate: data.endDate,
			dayPlans: data.dayPlans || data.meals || [], // Support both field names for backward compatibility
			weekNutritionalInfo: data.weekNutritionalInfo,
			name: data.name,
			description: data.description,
			createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
			updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
		};
	}

	/**
	 * Convert MealPlan DTO to plain object for database storage
	 * Note: userId is not stored in the document since it's in the path
	 */
	private convertMealPlanToData(mealPlan: CreateMealPlanDto | UpdateMealPlanDto): any {
		const now = new Date();

		const data: any = {
			...mealPlan,
			updatedAt: now,
		};

		// Only add createdAt for new meal plans
		if ('startDate' in mealPlan && mealPlan.startDate) {
			data.createdAt = now;
		}

		// Don't store userId in document - it's in the collection path
		delete data.userId;

		return data;
	}

	async getById(id: string, userId: string): Promise<WeekMealPlan | null> {
		try {
			this.logOperation('getById', { id, userId });

			if (!id?.trim()) {
				throw new ValidationError('Meal plan ID is required');
			}
			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			const userCollectionPath = this.getUserCollectionPath(userId);
			const doc = await this.dbAdapter.get(userCollectionPath, id);

			if (!doc) {
				return null;
			}

			const mealPlan = this.convertDataToMealPlan(doc.id, userId, doc.data);

			this.logSuccess('getById', { mealPlanId: id, userId });
			return mealPlan;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.getById');
		}
	}

	async create(data: CreateMealPlanDto, userId: string): Promise<WeekMealPlan> {
		try {
			this.logOperation('create', { userId, startDate: data.startDate, endDate: data.endDate });

			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			this.validateRequiredFields(data, ['startDate', 'endDate', 'dayPlans'], 'create');

			// Validate date format and logic
			const startDate = new Date(data.startDate);
			const endDate = new Date(data.endDate);

			if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
				throw new ValidationError('Invalid date format. Use YYYY-MM-DD format.');
			}

			if (startDate >= endDate) {
				throw new ValidationError('Start date must be before end date');
			}

			const userCollectionPath = this.getUserCollectionPath(userId);
			const mealPlanData = this.convertMealPlanToData(data);
			const newId = await this.dbAdapter.create(userCollectionPath, mealPlanData);

			const newMealPlan = await this.getById(newId, userId);
			if (!newMealPlan) {
				throw new Error('Failed to retrieve created meal plan');
			}

			this.logSuccess('create', { mealPlanId: newId, userId });
			return newMealPlan;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.create');
		}
	}

	async update(id: string, data: UpdateMealPlanDto, userId: string): Promise<WeekMealPlan> {
		try {
			this.logOperation('update', { id, userId });

			if (!id?.trim()) {
				throw new ValidationError('Meal plan ID is required');
			}
			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			// Check if meal plan exists
			const existingMealPlan = await this.getById(id, userId);
			if (!existingMealPlan) {
				throw new NotFoundError('Meal plan', id);
			}

			// Validate dates if provided
			if (data.startDate || data.endDate) {
				const startDate = new Date(data.startDate || existingMealPlan.startDate);
				const endDate = new Date(data.endDate || existingMealPlan.endDate);

				if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
					throw new ValidationError('Invalid date format. Use YYYY-MM-DD format.');
				}

				if (startDate >= endDate) {
					throw new ValidationError('Start date must be before end date');
				}
			}

			const userCollectionPath = this.getUserCollectionPath(userId);
			const updateData = this.convertMealPlanToData(data);
			await this.dbAdapter.update(userCollectionPath, id, updateData);

			const updatedMealPlan = await this.getById(id, userId);
			if (!updatedMealPlan) {
				throw new Error('Failed to retrieve updated meal plan');
			}

			this.logSuccess('update', { mealPlanId: id, userId });
			return updatedMealPlan;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.update');
		}
	}

	async delete(id: string, userId: string): Promise<void> {
		try {
			this.logOperation('delete', { id, userId });

			if (!id?.trim()) {
				throw new ValidationError('Meal plan ID is required');
			}
			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			// Check if meal plan exists
			const existingMealPlan = await this.getById(id, userId);
			if (!existingMealPlan) {
				throw new NotFoundError('Meal plan', id);
			}

			const userCollectionPath = this.getUserCollectionPath(userId);
			await this.dbAdapter.delete(userCollectionPath, id);

			this.logSuccess('delete', { mealPlanId: id, userId });
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.delete');
		}
	}

	async getByUser(userId: string, options: SearchOptions = {}): Promise<PaginatedResult<WeekMealPlan>> {
		try {
			this.logOperation('getByUser', { userId, options });

			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			const {
				limit: limitCount = 10,
				orderBy: orderByField = 'createdAt',
				orderDirection = 'desc',
				lastDoc,
			} = options;

			const userCollectionPath = this.getUserCollectionPath(userId);
			const queryOptions: any = {
				limit: limitCount,
				orderBy: [{ field: orderByField, direction: orderDirection }],
				startAfter: lastDoc,
				// No need for userId filter - we're already in the user's collection!
			};

			const queryResult = await this.dbAdapter.query(userCollectionPath, queryOptions);
			const items: WeekMealPlan[] = queryResult.docs.map(doc =>
				this.convertDataToMealPlan(doc.id, userId, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('getByUser', { userId, itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.getByUser');
		}
	}

	async getByDateRange(userId: string, startDate: string, endDate: string): Promise<WeekMealPlan[]> {
		try {
			this.logOperation('getByDateRange', { userId, startDate, endDate });

			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}
			if (!startDate?.trim()) {
				throw new ValidationError('Start date is required');
			}
			if (!endDate?.trim()) {
				throw new ValidationError('End date is required');
			}

			// Validate dates
			const start = new Date(startDate);
			const end = new Date(endDate);

			if (isNaN(start.getTime()) || isNaN(end.getTime())) {
				throw new ValidationError('Invalid date format. Use YYYY-MM-DD format.');
			}

			if (start >= end) {
				throw new ValidationError('Start date must be before end date');
			}

			const userCollectionPath = this.getUserCollectionPath(userId);
			const queryOptions: any = {
				where: [
					{ field: 'startDate', op: '>=', value: startDate },
					{ field: 'endDate', op: '<=', value: endDate },
				],
				orderBy: [{ field: 'startDate', direction: 'asc' }],
			};

			const queryResult = await this.dbAdapter.query(userCollectionPath, queryOptions);
			const mealPlans: WeekMealPlan[] = queryResult.docs.map(doc =>
				this.convertDataToMealPlan(doc.id, userId, doc.data),
			);

			this.logSuccess('getByDateRange', { userId, mealPlanCount: mealPlans.length });
			return mealPlans;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.getByDateRange');
		}
	}

	async getCurrentWeekMealPlan(userId: string): Promise<WeekMealPlan | null> {
		try {
			this.logOperation('getCurrentWeekMealPlan', { userId });

			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			// Calculate current week dates
			const now = new Date();
			const startOfWeek = new Date(now);
			startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
			const endOfWeek = new Date(startOfWeek);
			endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

			const startDateStr = startOfWeek.toISOString().split('T')[0];
			const endDateStr = endOfWeek.toISOString().split('T')[0];

			const mealPlans = await this.getByDateRange(userId, startDateStr, endDateStr);

			// Return the first meal plan that covers the current week
			const currentWeekPlan = mealPlans.find(plan =>
				plan.startDate <= startDateStr && plan.endDate >= endDateStr,
			);

			this.logSuccess('getCurrentWeekMealPlan', { userId, found: !!currentWeekPlan });
			return currentWeekPlan || null;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.getCurrentWeekMealPlan');
		}
	}

	async searchMealPlans(userId: string, filter: MealPlanFilter = {}, options: SearchOptions = {}): Promise<PaginatedResult<WeekMealPlan>> {
		try {
			this.logOperation('searchMealPlans', { userId, filter, options });

			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			const {
				limit: limitCount = 10,
				orderBy: orderByField = 'createdAt',
				orderDirection = 'desc',
				lastDoc,
			} = options;

			const whereConditions = [];

			// Add filter conditions
			if (filter.startDate) {
				whereConditions.push({ field: 'startDate', op: '>=', value: filter.startDate });
			}
			if (filter.endDate) {
				whereConditions.push({ field: 'endDate', op: '<=', value: filter.endDate });
			}
			if (filter.dateRange) {
				whereConditions.push({ field: 'startDate', op: '>=', value: filter.dateRange.from });
				whereConditions.push({ field: 'endDate', op: '<=', value: filter.dateRange.to });
			}

			const userCollectionPath = this.getUserCollectionPath(userId);
			const queryOptions: any = {
				limit: limitCount,
				orderBy: [{ field: orderByField, direction: orderDirection }],
				where: whereConditions,
				startAfter: lastDoc,
			};

			const queryResult = await this.dbAdapter.query(userCollectionPath, queryOptions);
			const items: WeekMealPlan[] = queryResult.docs.map(doc =>
				this.convertDataToMealPlan(doc.id, userId, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('searchMealPlans', { userId, itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreMealPlanGroupedService.searchMealPlans');
		}
	}
}
