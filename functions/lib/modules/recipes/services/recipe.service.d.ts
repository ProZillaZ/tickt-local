import { Recipe, CreateRecipeDto, UpdateRecipeDto } from '@tickt-engineering/recipe-types';
export interface RecipeFilter {
    mealTypes?: string[];
    dietTypes?: string[];
    cuisines?: string[];
    difficulty?: string;
    maxCookTime?: number;
    maxPrepTime?: number;
    tags?: string[];
    ingredients?: string[];
}
export interface RecipeSearchOptions {
    page?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}
export declare class RecipeService {
    private readonly collection;
    private convertFirestoreDataToRecipe;
    private convertRecipeToFirestoreData;
    getById(id: string): Promise<Recipe | null>;
    create(data: CreateRecipeDto, userId: string): Promise<Recipe>;
    update(id: string, data: UpdateRecipeDto, userId: string): Promise<Recipe>;
    delete(id: string, userId: string): Promise<void>;
    search(filter?: RecipeFilter, options?: RecipeSearchOptions): Promise<{
        items: Recipe[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    searchByText(query: string, options?: RecipeSearchOptions): Promise<{
        items: Recipe[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getByUser(userId: string, options?: RecipeSearchOptions): Promise<{
        items: Recipe[];
        total: number;
        page: number;
        limit: number;
        pages: number;
    }>;
    getRandomRecipes(count?: number): Promise<Recipe[]>;
}
//# sourceMappingURL=recipe.service.d.ts.map