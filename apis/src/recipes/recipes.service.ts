import { Injectable } from '@nestjs/common';
import { BaseService, PaginatedResponse } from '@/common';
import { RecipeDocument } from './schemas/recipe.schema';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeQueryDto } from './dto/recipe-query.dto';
import { RecipeRepository } from './repositories/recipe.repository';

@Injectable()
export class RecipesService extends BaseService<RecipeDocument> {
	constructor(private readonly recipeRepository: RecipeRepository) {
		super(recipeRepository);
	}

	async create(createRecipeDto: CreateRecipeDto): Promise<RecipeDocument> {
		const recipeData = {
			...createRecipeDto,
			cuisines: createRecipeDto.cuisines || [],
			dietTypes: createRecipeDto.dietTypes || [],
			tags: createRecipeDto.tags || [],
		};

		return await this.recipeRepository.create(recipeData);
	}

	async findAll(query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipeRepository.findWithAdvancedFilters(query);
	}

	async findOne(id: string): Promise<RecipeDocument> {
		return await this.findById(id);
	}

	async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeDocument> {
		return await this.repository.update(id, updateRecipeDto);
	}

	async remove(id: string): Promise<void> {
		await this.delete(id);
	}

	async findByCuisine(cuisine: string, query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		const queryWithCuisine = Object.assign(new RecipeQueryDto(), query, { cuisine });
		return this.findAll(queryWithCuisine);
	}

	async findByMealType(mealType: string, query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		const queryWithMealType = Object.assign(new RecipeQueryDto(), query, { mealType });
		return this.findAll(queryWithMealType);
	}

	async findByDietType(dietType: string, query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		const queryWithDietType = Object.assign(new RecipeQueryDto(), query, { dietType });
		return this.findAll(queryWithDietType);
	}

	async findByDifficulty(difficulty: string, query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		const queryWithDifficulty = Object.assign(new RecipeQueryDto(), query, { difficulty });
		return this.findAll(queryWithDifficulty);
	}

	async searchByIngredient(ingredient: string, query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		const queryWithIngredient = Object.assign(new RecipeQueryDto(), query, { ingredient });
		return this.findAll(queryWithIngredient);
	}

	async searchByTag(tag: string, query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		const queryWithTag = Object.assign(new RecipeQueryDto(), query, { tag });
		return this.findAll(queryWithTag);
	}
}
