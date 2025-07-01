import { onRequest, Request } from 'firebase-functions/v2/https';
import * as express from 'express';
import {
	corsMiddleware,
	authMiddleware,
	optionalAuthMiddleware,
	validateBody,
	validateQuery,
	asyncHandler,
	AuthenticatedRequest,
	NotFoundError,
	ValidationError,
} from '../../../shared';
import { ResponseUtils } from '../../../shared';
import { RecipeService, RecipeFilter } from '../services/recipe.service';
import { CreateRecipeDto, UpdateRecipeDto } from '@tickt-engineering/recipe-types';

const recipeService = new RecipeService();

// Validation schemas
const createRecipeSchema = {
	name: { required: true, type: 'string' as const, minLength: 1, maxLength: 200 },
	description: { required: true, type: 'string' as const, minLength: 1, maxLength: 2000 },
	ingredients: { required: true, type: 'array' as const, minLength: 1, maxLength: 100 },
	instructions: { required: true, type: 'array' as const, minLength: 1, maxLength: 50 },
	prepTime: { required: true, type: 'number' as const, min: 0, max: 1440 },
	cookTime: { required: true, type: 'number' as const, min: 0, max: 1440 },
	servings: { required: true, type: 'number' as const, min: 1, max: 100 },
	cuisines: { required: true, type: 'array' as const, minLength: 1 },
	mealTypes: { required: true, type: 'array' as const, minLength: 1 },
	dietTypes: { required: true, type: 'array' as const, minLength: 1 },
	difficulty: { required: true, type: 'string' as const },
	nutritionalInfo: { required: true, type: 'object' as const },
	tags: { required: false, type: 'array' as const },
	imageUrl: { required: false, type: 'string' as const, maxLength: 2000 },
};

const updateRecipeSchema = {
	name: { required: false, type: 'string' as const, minLength: 1, maxLength: 200 },
	description: { required: false, type: 'string' as const, minLength: 1, maxLength: 2000 },
	ingredients: { required: false, type: 'array' as const, minLength: 1, maxLength: 100 },
	instructions: { required: false, type: 'array' as const, minLength: 1, maxLength: 50 },
	prepTime: { required: false, type: 'number' as const, min: 0, max: 1440 },
	cookTime: { required: false, type: 'number' as const, min: 0, max: 1440 },
	servings: { required: false, type: 'number' as const, min: 1, max: 100 },
	cuisines: { required: false, type: 'array' as const, minLength: 1 },
	mealTypes: { required: false, type: 'array' as const, minLength: 1 },
	dietTypes: { required: false, type: 'array' as const, minLength: 1 },
	difficulty: { required: false, type: 'string' as const },
	nutritionalInfo: { required: false, type: 'object' as const },
	tags: { required: false, type: 'array' as const },
	imageUrl: { required: false, type: 'string' as const, maxLength: 2000 },
};

const searchQuerySchema = {
	page: { type: 'number' as const, min: 1 },
	limit: { type: 'number' as const, min: 1, max: 100 },
	orderBy: { type: 'string' as const },
	orderDirection: { type: 'string' as const },
};

const searchTextSchema = {
	q: { required: true, type: 'string' as const, minLength: 1, maxLength: 100 },
	...searchQuerySchema,
};

const randomRecipesSchema = {
	count: { type: 'number' as const, min: 1, max: 50 },
};

// GET /recipes/:id - Get single recipe
export const getRecipe = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '256MiB',
	timeoutSeconds: 60,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await optionalAuthMiddleware(request as AuthenticatedRequest, response, asyncHandler<AuthenticatedRequest>(async (req, res) => {
			const { id } = req.params;

			if (!id?.trim()) {
				throw new ValidationError('Recipe ID is required');
			}

			const recipe = await recipeService.getById(id);

			if (!recipe) {
				throw new NotFoundError('Recipe');
			}

			ResponseUtils.success(res, recipe);
		}));
	});
});

// GET /recipes - Get recipes with filtering and pagination
export const getRecipes = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '256MiB',
	timeoutSeconds: 60,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await validateQuery<AuthenticatedRequest>(searchQuerySchema)(request as AuthenticatedRequest, response, async (req, res) => {
			await optionalAuthMiddleware(request as AuthenticatedRequest, response, asyncHandler<AuthenticatedRequest>(async (req, res) => {
				const {
					page = 1,
					limit = 10,
					orderBy = 'createdAt',
					orderDirection = 'desc',
					mealTypes,
					dietTypes,
					cuisines,
					difficulty,
					maxCookTime,
					maxPrepTime,
					tags,
				} = req.query;

				// Build filter object
				const filter: RecipeFilter = {};

				if (mealTypes) {
					const mealTypesArray = String(mealTypes).split(',').map(s => s.trim()).filter(Boolean);
					if (mealTypesArray.length > 0) {
						filter.mealTypes = mealTypesArray;
					}
				}

				if (dietTypes) {
					const dietTypesArray = String(dietTypes).split(',').map(s => s.trim()).filter(Boolean);
					if (dietTypesArray.length > 0) {
						filter.dietTypes = dietTypesArray;
					}
				}

				if (cuisines) {
					const cuisinesArray = String(cuisines).split(',').map(s => s.trim()).filter(Boolean);
					if (cuisinesArray.length > 0) {
						filter.cuisines = cuisinesArray;
					}
				}

				if (difficulty && String(difficulty).trim()) {
					filter.difficulty = String(difficulty).trim();
				}

				if (maxCookTime) {
					const cookTime = Number(maxCookTime);
					if (!isNaN(cookTime) && cookTime > 0) {
						filter.maxCookTime = cookTime;
					}
				}

				if (maxPrepTime) {
					const prepTime = Number(maxPrepTime);
					if (!isNaN(prepTime) && prepTime > 0) {
						filter.maxPrepTime = prepTime;
					}
				}

				if (tags) {
					const tagsArray = String(tags).split(',').map(s => s.trim()).filter(Boolean);
					if (tagsArray.length > 0) {
						filter.tags = tagsArray;
					}
				}

				const result = await recipeService.search(filter, {
					page: Number(page),
					limit: Number(limit),
					orderBy: String(orderBy),
					orderDirection: orderDirection as 'asc' | 'desc',
				});

				ResponseUtils.paginated(res, result);
			}));
		});
	});
});

// POST /recipes - Create new recipe
export const createRecipe = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '512MiB',
	timeoutSeconds: 120,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await authMiddleware(request as AuthenticatedRequest, response, async (authReq, authRes) => {
			await validateBody<AuthenticatedRequest>(createRecipeSchema)(authReq, authRes, asyncHandler<AuthenticatedRequest>(async (req, res) => {
				const createData: CreateRecipeDto = req.body;
				const userId = req.user!.uid;

				// Validate required fields are not empty
				if (!createData.name?.trim()) {
					throw new ValidationError('Recipe name cannot be empty');
				}

				if (!createData.description?.trim()) {
					throw new ValidationError('Recipe description cannot be empty');
				}

				if (!Array.isArray(createData.ingredients) || createData.ingredients.length === 0) {
					throw new ValidationError('Recipe must have at least one ingredient');
				}

				if (!Array.isArray(createData.instructions) || createData.instructions.length === 0) {
					throw new ValidationError('Recipe must have at least one instruction');
				}

				const recipe = await recipeService.create(createData, userId);
				ResponseUtils.created(res, recipe, 'Recipe created successfully');
			}));
		});
	});
});

// PUT /recipes/:id - Update recipe
export const updateRecipe = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '512MiB',
	timeoutSeconds: 120,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await authMiddleware(request as AuthenticatedRequest, response, async (authReq, authRes) => {
			await validateBody<AuthenticatedRequest>(updateRecipeSchema)(authReq, authRes, asyncHandler<AuthenticatedRequest>(async (req, res) => {
				const { id } = req.params;
				const updateData: UpdateRecipeDto = req.body;
				const userId = req.user!.uid;

				if (!id?.trim()) {
					throw new ValidationError('Recipe ID is required');
				}

				// Validate that at least one field is being updated
				const hasValidUpdate = Object.keys(updateData).some(key =>
					updateData[key as keyof UpdateRecipeDto] !== undefined,
				);

				if (!hasValidUpdate) {
					throw new ValidationError('At least one field must be provided for update');
				}

				// Validate non-empty strings if provided
				if (updateData.name !== undefined && !updateData.name?.trim()) {
					throw new ValidationError('Recipe name cannot be empty');
				}

				if (updateData.description !== undefined && !updateData.description?.trim()) {
					throw new ValidationError('Recipe description cannot be empty');
				}

				const recipe = await recipeService.update(id, updateData, userId);
				ResponseUtils.success(res, recipe, 'Recipe updated successfully');
			}));
		});
	});
});

// DELETE /recipes/:id - Delete recipe
export const deleteRecipe = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '256MiB',
	timeoutSeconds: 60,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await authMiddleware(request as AuthenticatedRequest, response, asyncHandler(async (req: AuthenticatedRequest, res) => {
			const { id } = req.params;
			const userId = req.user!.uid;

			if (!id?.trim()) {
				throw new ValidationError('Recipe ID is required');
			}

			await recipeService.delete(id, userId);
			ResponseUtils.noContent(res, 'Recipe deleted successfully');
		}));
	});
});

// GET /recipes/search - Text search recipes
export const searchRecipes = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '256MiB',
	timeoutSeconds: 60,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await validateQuery<AuthenticatedRequest>(searchTextSchema)(request as AuthenticatedRequest, response, async (req, res) => {
			await optionalAuthMiddleware(request as AuthenticatedRequest, response, asyncHandler<AuthenticatedRequest>(async (req, res) => {
				const {
					q: query,
					page = 1,
					limit = 10,
					orderBy = 'createdAt',
					orderDirection = 'desc',
				} = req.query;

				const searchQuery = String(query).trim();
				if (!searchQuery) {
					throw new ValidationError('Search query cannot be empty');
				}

				const result = await recipeService.searchByText(searchQuery, {
					page: Number(page),
					limit: Number(limit),
					orderBy: String(orderBy),
					orderDirection: orderDirection as 'asc' | 'desc',
				});

				ResponseUtils.paginated(res, result);
			}));
		});
	});
});

// GET /recipes/user/:userId - Get recipes by user
export const getUserRecipes = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '256MiB',
	timeoutSeconds: 60,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await validateQuery<AuthenticatedRequest>(searchQuerySchema)(request as AuthenticatedRequest, response, async (req, res) => {
			await optionalAuthMiddleware(request as AuthenticatedRequest, response, asyncHandler<AuthenticatedRequest>(async (req, res) => {
				const { userId } = req.params;
				const {
					page = 1,
					limit = 10,
					orderBy = 'createdAt',
					orderDirection = 'desc',
				} = req.query;

				if (!userId?.trim()) {
					throw new ValidationError('User ID is required');
				}

				const result = await recipeService.getByUser(userId, {
					page: Number(page),
					limit: Number(limit),
					orderBy: String(orderBy),
					orderDirection: orderDirection as 'asc' | 'desc',
				});

				ResponseUtils.paginated(res, result);
			}));
		});
	});
});

// GET /recipes/random - Get random recipes
export const getRandomRecipes = onRequest({
	cors: true,
	region: 'us-central1',
	memory: '256MiB',
	timeoutSeconds: 60,
}, async (request: Request, response: express.Response) => {
	await corsMiddleware(request, response, async () => {
		await validateQuery<AuthenticatedRequest>(randomRecipesSchema)(request as AuthenticatedRequest, response, async (req, res) => {
			await optionalAuthMiddleware(request as AuthenticatedRequest, response, asyncHandler<AuthenticatedRequest>(async (req, res) => {
				const { count = 10 } = req.query;

				const recipeCount = Number(count);
				if (isNaN(recipeCount) || recipeCount < 1) {
					throw new ValidationError('Count must be a positive number');
				}

				const recipes = await recipeService.getRandomRecipes(recipeCount);
				ResponseUtils.success(res, recipes);
			}));
		});
	});
});
