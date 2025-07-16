import { Recipe, CreateRecipeDto, UpdateRecipeDto, RecipeFilter } from '@tickt-ltd/types';
import { PaginatedResult, SearchOptions } from './common-types';

export interface IRecipeService {
	getById(id: string): Promise<Recipe | null>;

	create(data: CreateRecipeDto, userId: string): Promise<Recipe>;

	update(id: string, data: UpdateRecipeDto, userId: string): Promise<Recipe>;

	delete(id: string, userId: string): Promise<void>;

	search(filter?: RecipeFilter, options?: SearchOptions): Promise<PaginatedResult<Recipe>>;

	searchByText(query: string, options?: SearchOptions): Promise<PaginatedResult<Recipe>>;

	getByUser(userId: string, options?: SearchOptions): Promise<PaginatedResult<Recipe>>;

	getRandomRecipes(count?: number): Promise<Recipe[]>;

	getFavorites(userId: string, options?: SearchOptions): Promise<PaginatedResult<Recipe>>;

	addToFavorites(userId: string, recipeId: string): Promise<void>;

	removeFromFavorites(userId: string, recipeId: string): Promise<void>;
}
