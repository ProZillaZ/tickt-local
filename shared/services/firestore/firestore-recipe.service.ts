import {
	Recipe,
	CreateRecipeDto,
	UpdateRecipeDto,
	RecipeFilter,
} from '@tickt-engineering/types';
import { ILogger, PaginatedResult, SearchOptions, IDatabaseAdapter, IRecipeService, DEFAULT_DATABASE_CONFIG } from '../interfaces';
import { BaseService, ValidationError, NotFoundError, UnauthorizedError } from '../core';

export class FirestoreRecipeService extends BaseService implements IRecipeService {
	private readonly collection = DEFAULT_DATABASE_CONFIG.collections.recipes;

	/**
	 * Protected constructor - prevents direct instantiation
	 * Use FirestoreServiceFactory.createRecipeService() instead
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
	): FirestoreRecipeService {
		return new FirestoreRecipeService(logger, dbAdapter);
	}

	/**
	 * Convert raw database data to Recipe instance
	 * Uses the extended Recipe class with built-in metadata support
	 */
	private convertDataToRecipe(id: string, data: any): Recipe {
		// Handle different data formats from Firebase (legacy compatibility)
		const cuisines = Array.isArray(data.cuisines) ? data.cuisines : [data.cuisines].filter(Boolean);
		const mealTypes = Array.isArray(data.mealTypes) ? data.mealTypes : [data.mealTypes].filter(Boolean);
		const dietTypes = Array.isArray(data.dietTypes) ? data.dietTypes : [data.dietTypes].filter(Boolean);

		const recipe = new Recipe(
			data.name,
			data.description,
			data.ingredients as any[], // DTOs work directly with Recipe constructor
			data.instructions as any[],
			data.prepTime,
			data.cookTime,
			data.servings,
			cuisines,
			mealTypes,
			dietTypes,
			data.tags as any[],
			data.difficulty,
			data.nutritionalInfo as any,
			data.imageUrl,
			id,
		);

		recipe.setMetadata({
			createdBy: data.createdBy,
			createdAt: data.createdAt ? new Date(data.createdAt) : undefined,
			updatedAt: data.updatedAt ? new Date(data.updatedAt) : undefined,
			id,
		});

		return recipe;
	}

	private convertRecipeToData(recipe: CreateRecipeDto | UpdateRecipeDto, userId: string): any {
		const now = new Date();

		const data: any = {
			name: recipe.name!,
			description: recipe.description!,
			ingredients: recipe.ingredients!,
			instructions: recipe.instructions!,
			prepTime: recipe.prepTime!,
			cookTime: recipe.cookTime!,
			servings: recipe.servings!,
			cuisines: recipe.cuisines!,
			mealTypes: recipe.mealTypes!,
			dietTypes: recipe.dietTypes!,
			tags: recipe.tags!,
			difficulty: recipe.difficulty!,
			nutritionalInfo: recipe.nutritionalInfo!,
			createdBy: userId,
			createdAt: now,
			updatedAt: now,
		};

		if ((recipe as any).imageUrl) {
			data.imageUrl = (recipe as any).imageUrl;
		}

		return data;
	}

	async getById(id: string): Promise<Recipe | null> {
		try {
			this.logOperation('getById', { id });

			if (!id?.trim()) {
				throw new ValidationError('Recipe ID is required');
			}

			const doc = await this.dbAdapter.get(this.collection, id);

			if (!doc) {
				return null;
			}

			const recipe = this.convertDataToRecipe(doc.id, doc.data);

			this.logSuccess('getById', { recipeId: id });
			return recipe;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.getById');
		}
	}

	async create(data: CreateRecipeDto, userId: string): Promise<Recipe> {
		try {
			this.logOperation('create', { userId });

			this.validateRequiredFields(data, ['name', 'description', 'ingredients', 'instructions'], 'create');
			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			const recipeData = this.convertRecipeToData(data, userId);
			const newId = await this.dbAdapter.create(this.collection, recipeData);

			const newRecipe = await this.getById(newId);
			if (!newRecipe) {
				throw new Error('Failed to retrieve created recipe');
			}

			this.logSuccess('create', { recipeId: newId });
			return newRecipe;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.create');
		}
	}

	async update(id: string, data: UpdateRecipeDto, userId: string): Promise<Recipe> {
		try {
			this.logOperation('update', { id, userId });

			if (!id?.trim()) {
				throw new ValidationError('Recipe ID is required');
			}
			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			const existingRecipe = await this.getById(id);
			if (!existingRecipe) {
				throw new NotFoundError('Recipe', id);
			}

			if (existingRecipe.createdBy !== userId) {
				throw new UnauthorizedError('You can only update your own recipes');
			}

			const updateData = this.convertRecipeToData(data, userId);
			await this.dbAdapter.update(this.collection, id, updateData);

			const updatedRecipe = await this.getById(id);
			if (!updatedRecipe) {
				throw new Error('Failed to retrieve updated recipe');
			}

			this.logSuccess('update', { recipeId: id });
			return updatedRecipe;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.update');
		}
	}

	async delete(id: string, userId: string): Promise<void> {
		try {
			this.logOperation('delete', { id, userId });

			if (!id?.trim()) {
				throw new ValidationError('Recipe ID is required');
			}
			if (!userId?.trim()) {
				throw new ValidationError('User ID is required');
			}

			const existingRecipe = await this.getById(id);
			if (!existingRecipe) {
				throw new NotFoundError('Recipe', id);
			}

			if (existingRecipe.createdBy !== userId) {
				throw new UnauthorizedError('You can only delete your own recipes');
			}

			await this.dbAdapter.delete(this.collection, id);

			this.logSuccess('delete', { recipeId: id });
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.delete');
		}
	}

	async search(
		filter: RecipeFilter = {},
		options: SearchOptions = {},
	): Promise<PaginatedResult<Recipe>> {
		try {
			this.logOperation('search', { filter, options });

			const {
				limit: limitCount = 10,
				orderBy: orderByField = 'createdAt',
				orderDirection = 'desc',
				lastDoc,
			} = options;

			const queryOptions: any = {
				limit: limitCount,
				orderBy: [{ field: orderByField, direction: orderDirection }],
				where: [],
				startAfter: lastDoc,
			};

			if (filter.mealTypes && filter.mealTypes.length > 0) {
				queryOptions.where.push({ field: 'mealTypes', op: 'array-contains-any', value: filter.mealTypes });
			}

			if (filter.dietTypes && filter.dietTypes.length > 0) {
				queryOptions.where.push({ field: 'dietTypes', op: 'array-contains-any', value: filter.dietTypes });
			}

			if (filter.cuisines && filter.cuisines.length > 0) {
				queryOptions.where.push({ field: 'cuisines', op: 'array-contains-any', value: filter.cuisines });
			}

			if (filter.difficulty) {
				queryOptions.where.push({ field: 'difficulty', op: '==', value: filter.difficulty });
			}

			if (filter.maxCookTime) {
				queryOptions.where.push({ field: 'cookTime', op: '<=', value: filter.maxCookTime });
			}

			if (filter.maxPrepTime) {
				queryOptions.where.push({ field: 'prepTime', op: '<=', value: filter.maxPrepTime });
			}

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);
			const items: Recipe[] = queryResult.docs.map(doc =>
				this.convertDataToRecipe(doc.id, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('search', { itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.search');
		}
	}

	async searchByText(
		searchQuery: string,
		options: SearchOptions = {},
	): Promise<PaginatedResult<Recipe>> {
		try {
			this.logOperation('searchByText', { searchQuery, options });

			if (!searchQuery?.trim()) {
				throw new ValidationError('Search query cannot be empty');
			}

			const {
				limit: limitCount = 10,
				orderBy: orderByField = 'createdAt',
				orderDirection = 'desc',
				lastDoc,
			} = options;

			const sanitizedQuery = this.sanitizeString(searchQuery);

			// Build query for text search
			const queryOptions: any = {
				limit: limitCount,
				orderBy: [
					{ field: 'name', direction: 'asc' },
					{ field: orderByField, direction: orderDirection },
				],
				where: [
					{ field: 'name', op: '>=', value: sanitizedQuery },
					{ field: 'name', op: '<=', value: sanitizedQuery + '\uf8ff' },
				],
				startAfter: lastDoc,
			};

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);
			const items: Recipe[] = queryResult.docs.map(doc =>
				this.convertDataToRecipe(doc.id, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('searchByText', { query: searchQuery, itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.searchByText');
		}
	}

	async getByUser(
		userId: string,
		options: SearchOptions = {},
	): Promise<PaginatedResult<Recipe>> {
		try {
			this.logOperation('getByUser', { userId, options });

			if (!userId?.trim()) {
				throw new ValidationError('User ID cannot be empty');
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
				where: [{ field: 'createdBy', op: '==', value: userId }],
				startAfter: lastDoc,
			};

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);
			const items: Recipe[] = queryResult.docs.map(doc =>
				this.convertDataToRecipe(doc.id, doc.data),
			);

			const result = this.createPaginationResult(items, limitCount, queryResult.lastDoc);
			this.logSuccess('getByUser', { userId, itemCount: items.length });
			return result;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.getByUser');
		}
	}

	async getRandomRecipes(count: number = 10): Promise<Recipe[]> {
		try {
			this.logOperation('getRandomRecipes', { count });

			// Simple implementation - get recent recipes. For true randomness, we need a random field
			const queryOptions: any = {
				limit: count,
				orderBy: [{ field: 'createdAt', direction: 'desc' }],
			};

			const queryResult = await this.dbAdapter.query(this.collection, queryOptions);
			const items: Recipe[] = queryResult.docs.map(doc =>
				this.convertDataToRecipe(doc.id, doc.data),
			);

			this.logSuccess('getRandomRecipes', { itemCount: items.length });
			return items;
		} catch (error) {
			throw this.errorHandler.handleError(error as Error, 'FirestoreRecipeService.getRandomRecipes');
		}
	}

	async getFavorites(userId: string, options?: SearchOptions): Promise<PaginatedResult<Recipe>> {
		throw new Error('getFavorites not implemented yet');
	}

	async addToFavorites(userId: string, recipeId: string): Promise<void> {
		throw new Error('addToFavorites not implemented yet');
	}

	async removeFromFavorites(userId: string, recipeId: string): Promise<void> {
		throw new Error('removeFromFavorites not implemented yet');
	}
}
