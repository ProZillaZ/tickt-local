import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { BaseRepository, QueryOptions, PaginatedResponse } from "@/common";
import { Recipe, RecipeDocument } from "../schemas/recipe.schema";
import { RecipeQueryDto } from "../dto/recipe-query.dto";
import { Cuisine, DietType, Difficulty, MealType } from "@tickt-ltd/types";

@Injectable()
export class RecipeRepository extends BaseRepository<RecipeDocument> {
  constructor(
    @InjectModel(Recipe.name)
    private readonly recipeModel: Model<RecipeDocument>
  ) {
    super(recipeModel);
  }

  /**
   * Find recipes with advanced filtering and search
   */
  async findWithAdvancedFilters(
    query: RecipeQueryDto
  ): Promise<PaginatedResponse<RecipeDocument>> {
    const filter = this.buildAdvancedFilter(query);
    const options: QueryOptions = {
      page: query.page,
      limit: query.limit,
      sort: this.buildSortOptions(query),
    };

    // Handle total time sorting with aggregation
    if (query.sortBy === "totalTime") {
      return this.findWithAggregation(filter, query);
    }

    return this.findAll(filter, options);
  }

  /**
   * Find recipes by cuisine
   */
  async findByCuisine(
    cuisine: Cuisine,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    return this.find({ cuisines: cuisine }, options);
  }

  /**
   * Find recipes by meal type
   */
  async findByMealType(
    mealType: MealType,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    return this.find({ mealTypes: mealType }, options);
  }

  /**
   * Find recipes by diet type
   */
  async findByDietType(
    dietType: DietType,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    return this.find({ dietTypes: dietType }, options);
  }

  /**
   * Find recipes by difficulty
   */
  async findByDifficulty(
    difficulty: Difficulty,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    return this.find({ difficulty }, options);
  }

  /**
   * Search recipes by ingredient
   */
  async searchByIngredient(
    ingredient: string,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    const filter = {
      "ingredients.name": { $regex: ingredient, $options: "i" },
    };
    return this.find(filter, options);
  }

  /**
   * Search recipes by tag
   */
  async searchByTag(
    tag: string,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    const filter = { "tags.name": { $regex: tag, $options: "i" } };
    return this.find(filter, options);
  }

  /**
   * Find recipes by creator
   */
  async findByCreator(
    createdBy: string,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    return this.find({ createdBy }, options);
  }

  /**
   * Search recipes by text (name and description)
   */
  async searchByText(
    searchText: string,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    const filter = { $text: { $search: searchText } };
    return this.find(filter, options);
  }

  /**
   * Find recipes within time constraints
   */
  async findByTimeConstraints(
    maxPrepTime?: number,
    maxCookTime?: number,
    maxTotalTime?: number,
    options?: QueryOptions
  ): Promise<RecipeDocument[]> {
    const filter: FilterQuery<RecipeDocument> = {};

    if (maxPrepTime !== undefined) {
      filter.prepTime = { $lte: maxPrepTime };
    }

    if (maxCookTime !== undefined) {
      filter.cookTime = { $lte: maxCookTime };
    }

    if (maxTotalTime !== undefined) {
      filter.$expr = {
        $lte: [{ $add: ["$prepTime", "$cookTime"] }, maxTotalTime],
      };
    }

    return this.find(filter, options);
  }

  /**
   * Build advanced filter from query DTO
   */
  private buildAdvancedFilter(
    query: RecipeQueryDto
  ): FilterQuery<RecipeDocument> {
    const filter: FilterQuery<RecipeDocument> = {};

    // Text search
    if (query.search) {
      filter.$text = { $search: query.search };
    }

    // Filter by cuisine
    if (query.cuisine) {
      filter.cuisines = query.cuisine;
    }

    // Filter by meal type
    if (query.mealType) {
      filter.mealTypes = query.mealType;
    }

    // Filter by diet type
    if (query.dietType) {
      filter.dietTypes = query.dietType;
    }

    // Filter by difficulty
    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    // Time constraints
    if (query.maxPrepTime !== undefined) {
      filter.prepTime = { $lte: query.maxPrepTime };
    }

    if (query.maxCookTime !== undefined) {
      filter.cookTime = { $lte: query.maxCookTime };
    }

    if (query.maxTotalTime !== undefined) {
      filter.$expr = {
        $lte: [{ $add: ["$prepTime", "$cookTime"] }, query.maxTotalTime],
      };
    }

    // Servings constraints
    if (query.minServings !== undefined) {
      filter.servings = { ...filter.servings, $gte: query.minServings };
    }

    if (query.maxServings !== undefined) {
      filter.servings = { ...filter.servings, $lte: query.maxServings };
    }

    // Ingredient search
    if (query.ingredient) {
      filter["ingredients.name"] = { $regex: query.ingredient, $options: "i" };
    }

    // Tag search
    if (query.tag) {
      filter["tags.name"] = { $regex: query.tag, $options: "i" };
    }

    // Creator filter
    if (query.createdBy) {
      filter.createdBy = query.createdBy;
    }

    return filter;
  }

  /**
   * Build sort options from query DTO
   */
  private buildSortOptions(query: RecipeQueryDto): { [key: string]: 1 | -1 } {
    if (!query.sortBy) {
      return { createdAt: -1 };
    }

    const sortOrder = query.sortOrder === "desc" ? -1 : 1;
    return { [query.sortBy]: sortOrder };
  }

  /**
   * Handle aggregation queries for computed fields like totalTime
   */
  private async findWithAggregation(
    filter: FilterQuery<RecipeDocument>,
    query: RecipeQueryDto
  ): Promise<PaginatedResponse<RecipeDocument>> {
    const pipeline: any[] = [
      { $match: filter },
      {
        $addFields: {
          totalTime: { $add: ["$prepTime", "$cookTime"] },
        },
      },
    ];

    // Add sorting
    const sortOrder = query.sortOrder === "desc" ? -1 : 1;
    pipeline.push({ $sort: { [query.sortBy]: sortOrder } });

    // Count total documents
    const countPipeline = [...pipeline, { $count: "totalCount" }];
    const countResult = await this.recipeModel.aggregate(countPipeline);
    const totalCount = countResult[0]?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / query.limit);

    // Add pagination
    pipeline.push({ $skip: query.skip }, { $limit: query.limit });

    const recipes = await this.recipeModel.aggregate(pipeline);

    return {
      success: true,
      data: recipes,
      meta: {
        page: query.page,
        limit: query.limit,
        totalCount,
        totalPages,
        hasNext: query.page < totalPages,
        hasPrevious: query.page > 1,
      },
    };
  }
}
