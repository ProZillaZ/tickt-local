import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	HttpCode,
	HttpStatus,
	UseFilters,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiQuery,
} from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeQueryDto } from './dto/recipe-query.dto';
import { HttpExceptionFilter } from '@/common';
import { ApiResponse as IApiResponse, PaginatedResponse } from '../common/interfaces/api-response.interface';
import { RecipeDocument } from './schemas/recipe.schema';

@ApiTags('recipes')
@Controller('recipes')
@UseFilters(HttpExceptionFilter)
export class RecipesController {
	constructor(private readonly recipesService: RecipesService) {}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new recipe' })
	@ApiResponse({ status: 201, description: 'Recipe created successfully' })
	@ApiResponse({ status: 400, description: 'Invalid input data' })
	async create(@Body() createRecipeDto: CreateRecipeDto): Promise<IApiResponse<RecipeDocument>> {
		const recipe = await this.recipesService.create(createRecipeDto);
		return {
			success: true,
			data: recipe,
			message: 'Recipe created successfully',
		};
	}

	@Get()
	@ApiOperation({ summary: 'Get all recipes with optional filtering and pagination' })
	@ApiResponse({ status: 200, description: 'Recipes retrieved successfully' })
	@ApiQuery({ name: 'page', required: false, description: 'Page number' })
	@ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
	@ApiQuery({ name: 'search', required: false, description: 'Search by name or description' })
	@ApiQuery({ name: 'cuisine', required: false, description: 'Filter by cuisine type' })
	@ApiQuery({ name: 'mealType', required: false, description: 'Filter by meal type' })
	@ApiQuery({ name: 'dietType', required: false, description: 'Filter by diet type' })
	@ApiQuery({ name: 'difficulty', required: false, description: 'Filter by difficulty level' })
	@ApiQuery({ name: 'maxPrepTime', required: false, description: 'Maximum preparation time in minutes' })
	@ApiQuery({ name: 'maxCookTime', required: false, description: 'Maximum cooking time in minutes' })
	@ApiQuery({ name: 'maxTotalTime', required: false, description: 'Maximum total time in minutes' })
	@ApiQuery({ name: 'maxServings', required: false, description: 'Maximum servings' })
	@ApiQuery({ name: 'minServings', required: false, description: 'Minimum servings' })
	@ApiQuery({ name: 'ingredient', required: false, description: 'Filter by specific ingredient' })
	@ApiQuery({ name: 'tag', required: false, description: 'Filter by tag name' })
	@ApiQuery({ name: 'createdBy', required: false, description: 'Filter by creator user ID' })
	@ApiQuery({ name: 'sortBy', required: false, description: 'Sort field' })
	@ApiQuery({ name: 'sortOrder', required: false, description: 'Sort order (asc/desc)' })
	async findAll(@Query() query: RecipeQueryDto): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipesService.findAll(query);
	}

	@Get('cuisine/:cuisine')
	@ApiOperation({ summary: 'Get recipes by cuisine type' })
	@ApiParam({ name: 'cuisine', description: 'Cuisine type' })
	@ApiResponse({ status: 200, description: 'Recipes retrieved successfully' })
	async findByCuisine(
		@Param('cuisine') cuisine: string,
		@Query() query: RecipeQueryDto,
	): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipesService.findByCuisine(cuisine, query);
	}

	@Get('meal-type/:mealType')
	@ApiOperation({ summary: 'Get recipes by meal type' })
	@ApiParam({ name: 'mealType', description: 'Meal type' })
	@ApiResponse({ status: 200, description: 'Recipes retrieved successfully' })
	async findByMealType(
		@Param('mealType') mealType: string,
		@Query() query: RecipeQueryDto,
	): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipesService.findByMealType(mealType, query);
	}

	@Get('diet-type/:dietType')
	@ApiOperation({ summary: 'Get recipes by diet type' })
	@ApiParam({ name: 'dietType', description: 'Diet type' })
	@ApiResponse({ status: 200, description: 'Recipes retrieved successfully' })
	async findByDietType(
		@Param('dietType') dietType: string,
		@Query() query: RecipeQueryDto,
	): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipesService.findByDietType(dietType, query);
	}

	@Get('difficulty/:difficulty')
	@ApiOperation({ summary: 'Get recipes by difficulty level' })
	@ApiParam({ name: 'difficulty', description: 'Difficulty level' })
	@ApiResponse({ status: 200, description: 'Recipes retrieved successfully' })
	async findByDifficulty(
		@Param('difficulty') difficulty: string,
		@Query() query: RecipeQueryDto,
	): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipesService.findByDifficulty(difficulty, query);
	}

	@Get('search/ingredient/:ingredient')
	@ApiOperation({ summary: 'Search recipes by ingredient' })
	@ApiParam({ name: 'ingredient', description: 'Ingredient name to search for' })
	@ApiResponse({ status: 200, description: 'Recipes retrieved successfully' })
	async searchByIngredient(
		@Param('ingredient') ingredient: string,
		@Query() query: RecipeQueryDto,
	): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipesService.searchByIngredient(ingredient, query);
	}

	@Get('search/tag/:tag')
	@ApiOperation({ summary: 'Search recipes by tag' })
	@ApiParam({ name: 'tag', description: 'Tag name to search for' })
	@ApiResponse({ status: 200, description: 'Recipes retrieved successfully' })
	async searchByTag(
		@Param('tag') tag: string,
		@Query() query: RecipeQueryDto,
	): Promise<PaginatedResponse<RecipeDocument>> {
		return await this.recipesService.searchByTag(tag, query);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a specific recipe by ID' })
	@ApiParam({ name: 'id', description: 'Recipe ID' })
	@ApiResponse({ status: 200, description: 'Recipe retrieved successfully' })
	@ApiResponse({ status: 404, description: 'Recipe not found' })
	@ApiResponse({ status: 400, description: 'Invalid recipe ID format' })
	async findOne(@Param('id') id: string): Promise<IApiResponse<RecipeDocument>> {
		const recipe = await this.recipesService.findOne(id);
		return {
			success: true,
			data: recipe,
		};
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a recipe' })
	@ApiParam({ name: 'id', description: 'Recipe ID' })
	@ApiResponse({ status: 200, description: 'Recipe updated successfully' })
	@ApiResponse({ status: 404, description: 'Recipe not found' })
	@ApiResponse({ status: 400, description: 'Invalid input data or recipe ID format' })
	async update(
		@Param('id') id: string,
		@Body() updateRecipeDto: UpdateRecipeDto,
	): Promise<IApiResponse<RecipeDocument>> {
		const updatedRecipe = await this.recipesService.update(id, updateRecipeDto);
		return {
			success: true,
			data: updatedRecipe,
			message: 'Recipe updated successfully',
		};
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete a recipe' })
	@ApiParam({ name: 'id', description: 'Recipe ID' })
	@ApiResponse({ status: 204, description: 'Recipe deleted successfully' })
	@ApiResponse({ status: 404, description: 'Recipe not found' })
	@ApiResponse({ status: 400, description: 'Invalid recipe ID format' })
	async remove(@Param('id') id: string): Promise<void> {
		await this.recipesService.remove(id);
	}
}
