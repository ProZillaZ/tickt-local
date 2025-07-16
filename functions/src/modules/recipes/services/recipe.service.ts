import {
  Recipe,
  Ingredient,
  Instruction,
  Tag,
  CreateRecipeDto,
  UpdateRecipeDto,
  RecipeDto,
  IngredientDto,
  InstructionDto,
  TagDto,
  Difficulty,
  RecipeNutritionalInfoDto,
  RecipeNutritionalInfo,
  Cuisine,
  MealType,
  DietType,
} from "@tickt-ltd/types";
import { FirestoreUtils } from "../../../shared";
import { AppError } from "../../../shared";

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
  orderDirection?: "asc" | "desc";
}

// Internal interface for Firestore storage when creating/updating
interface RecipeFirestoreData {
  name: string;
  description: string;
  ingredients: IngredientDto[];
  instructions: InstructionDto[];
  prepTime: number;
  cookTime: number;
  servings: number;
  cuisines: Cuisine[];
  mealTypes: MealType[];
  dietTypes: DietType[];
  tags: TagDto[];
  difficulty: Difficulty;
  nutritionalInfo: RecipeNutritionalInfoDto;
  imageUrl?: string;
  createdBy?: string;
  createdAt?: any;
  updatedAt?: any;
}

// Type for when we retrieve from Firestore (has required id)
interface RecipeFirestoreDocument extends RecipeFirestoreData {
  id: string;
}

export class RecipeService {
  private readonly collection = "recipes";

  private convertFirestoreDataToRecipe(data: RecipeFirestoreDocument): Recipe {
    // Convert DTOs to Models with generated IDs and timestamps
    const ingredients = data.ingredients.map(
      (dto, index) =>
        new Ingredient(
          dto.name,
          dto.amount,
          dto.unit,
          `${data.id}-ingredient-${index}`
        )
    );
    const instructions = data.instructions.map(
      (dto, index) =>
        new Instruction(
          dto.stepNumber,
          dto.description,
          `${data.id}-instruction-${index}`
        )
    );
    const tags = data.tags.map(
      (dto, index) => new Tag(dto.name, `${data.id}-tag-${index}`)
    );
    const nutritionalInfo = new RecipeNutritionalInfo(
      data.nutritionalInfo.calories,
      data.nutritionalInfo.protein,
      data.nutritionalInfo.carbohydrates,
      data.nutritionalInfo.fat,
      data.nutritionalInfo.fiber,
      `${data.id}-nutrition`
    );

    return new Recipe(
      data.name,
      data.description,
      ingredients,
      instructions,
      data.prepTime,
      data.cookTime,
      data.servings,
      data.cuisines,
      data.mealTypes,
      data.dietTypes,
      tags,
      data.difficulty,
      nutritionalInfo,
      data.imageUrl,
      data.id
    );
  }

  private convertRecipeToFirestoreData(
    recipe: Recipe,
    userId?: string
  ): RecipeFirestoreData {
    // Convert Models back to DTOs for storage
    const ingredients: IngredientDto[] = recipe.ingredients.map((ing) => ({
      name: ing.name,
      amount: ing.amount,
      unit: ing.unit,
    }));

    const instructions: InstructionDto[] = recipe.instructions.map((inst) => ({
      stepNumber: inst.stepNumber,
      description: inst.description,
    }));

    const tags: TagDto[] = recipe.tags.map((tag) => ({
      name: tag.name,
    }));

    const nutritionalInfo: RecipeNutritionalInfoDto = {
      calories: recipe.nutritionalInfo.calories,
      protein: recipe.nutritionalInfo.protein,
      carbohydrates: recipe.nutritionalInfo.carbohydrates,
      fat: recipe.nutritionalInfo.fat,
      fiber: recipe.nutritionalInfo.fiber,
    };

    return {
      name: recipe.name,
      description: recipe.description,
      ingredients,
      instructions,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      servings: recipe.servings,
      cuisines: recipe.cuisines,
      mealTypes: recipe.mealTypes,
      dietTypes: recipe.dietTypes,
      tags,
      difficulty: recipe.difficulty,
      nutritionalInfo,
      imageUrl: recipe.imageUrl,
      ...(userId && { createdBy: userId }),
    };
  }

  async getById(id: string): Promise<Recipe | null> {
    const data = await FirestoreUtils.getById<RecipeFirestoreDocument>(
      this.collection,
      id
    );
    if (!data) return null;

    return this.convertFirestoreDataToRecipe(data);
  }

  async create(data: CreateRecipeDto, userId: string): Promise<Recipe> {
    try {
      // Convert DTOs to Models for validation
      const ingredients = data.ingredients.map(
        (dto, index) =>
          new Ingredient(
            dto.name,
            dto.amount,
            dto.unit,
            `temp-ingredient-${index}`
          )
      );
      const instructions = data.instructions.map(
        (dto, index) =>
          new Instruction(
            dto.stepNumber,
            dto.description,
            `temp-instruction-${index}`
          )
      );
      const tags = data.tags.map(
        (dto, index) => new Tag(dto.name, `temp-tag-${index}`)
      );
      const nutritionalInfo = new RecipeNutritionalInfo(
        data.nutritionalInfo.calories,
        data.nutritionalInfo.protein,
        data.nutritionalInfo.carbohydrates,
        data.nutritionalInfo.fat,
        data.nutritionalInfo.fiber,
        `temp-nutrition`
      );

      // Create and validate using Recipe model
      const recipe = new Recipe(
        data.name,
        data.description,
        ingredients,
        instructions,
        data.prepTime,
        data.cookTime,
        data.servings,
        data.cuisines,
        data.mealTypes,
        data.dietTypes,
        tags,
        data.difficulty,
        nutritionalInfo
      );

      // Convert to Firestore format
      const recipeData = this.convertRecipeToFirestoreData(recipe, userId);

      // Store in Firestore
      const stored = await FirestoreUtils.create<RecipeFirestoreDocument>(
        this.collection,
        recipeData
      );

      // Return Recipe model with ID
      return this.convertFirestoreDataToRecipe(stored);
    } catch (error: any) {
      throw new AppError(400, `Invalid recipe data: ${error.message}`);
    }
  }

  async update(
    id: string,
    data: UpdateRecipeDto,
    userId: string
  ): Promise<Recipe> {
    // Check if recipe exists and user has permission
    const existingRecipe = await this.getById(id);
    if (!existingRecipe) {
      throw new AppError(404, "Recipe not found");
    }

    const existingData = await FirestoreUtils.getById<RecipeFirestoreDocument>(
      this.collection,
      id
    );
    if (existingData?.createdBy !== userId) {
      throw new AppError(403, "You can only update your own recipes");
    }

    try {
      // Convert DTOs to Models if provided in update data
      const ingredients = data.ingredients
        ? data.ingredients.map(
            (dto, index) =>
              new Ingredient(
                dto.name,
                dto.amount,
                dto.unit,
                `${id}-ingredient-${index}`
              )
          )
        : existingRecipe.ingredients;

      const instructions = data.instructions
        ? data.instructions.map(
            (dto, index) =>
              new Instruction(
                dto.stepNumber,
                dto.description,
                `${id}-instruction-${index}`
              )
          )
        : existingRecipe.instructions;

      const tags = data.tags
        ? data.tags.map((dto, index) => new Tag(dto.name, `${id}-tag-${index}`))
        : existingRecipe.tags;

      const nutritionalInfo = data.nutritionalInfo
        ? new RecipeNutritionalInfo(
            data.nutritionalInfo.calories,
            data.nutritionalInfo.protein,
            data.nutritionalInfo.carbohydrates,
            data.nutritionalInfo.fat,
            data.nutritionalInfo.fiber,
            `${id}-nutrition`
          )
        : existingRecipe.nutritionalInfo;

      // Create updated recipe for validation
      const updatedRecipe = new Recipe(
        data.name ?? existingRecipe.name,
        data.description ?? existingRecipe.description,
        ingredients,
        instructions,
        data.prepTime ?? existingRecipe.prepTime,
        data.cookTime ?? existingRecipe.cookTime,
        data.servings ?? existingRecipe.servings,
        data.cuisines ?? existingRecipe.cuisines,
        data.mealTypes ?? existingRecipe.mealTypes,
        data.dietTypes ?? existingRecipe.dietTypes,
        tags,
        data.difficulty ?? existingRecipe.difficulty,
        nutritionalInfo,
        existingRecipe.imageUrl,
        id
      );

      // Update in Firestore
      const updated = await FirestoreUtils.update<RecipeFirestoreDocument>(
        this.collection,
        id,
        this.convertRecipeToFirestoreData(updatedRecipe)
      );

      return this.convertFirestoreDataToRecipe(updated);
    } catch (error: any) {
      throw new AppError(400, `Failed to update recipe: ${error.message}`);
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    // Check if recipe exists and user has permission
    const existingData = await FirestoreUtils.getById<RecipeFirestoreDocument>(
      this.collection,
      id
    );
    if (!existingData) {
      throw new AppError(404, "Recipe not found");
    }

    if (existingData.createdBy !== userId) {
      throw new AppError(403, "You can only delete your own recipes");
    }

    await FirestoreUtils.delete(this.collection, id);
  }

  async search(
    filter: RecipeFilter = {},
    options: RecipeSearchOptions = {}
  ): Promise<{
    items: Recipe[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }> {
    const {
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      orderDirection = "desc",
    } = options;

    // Build where conditions
    const whereConditions: Array<{
      field: string;
      operator: FirebaseFirestore.WhereFilterOp;
      value: any;
    }> = [];

    if (filter.mealTypes && filter.mealTypes.length > 0) {
      whereConditions.push({
        field: "mealTypes",
        operator: "array-contains-any",
        value: filter.mealTypes,
      });
    }

    if (filter.dietTypes && filter.dietTypes.length > 0) {
      whereConditions.push({
        field: "dietTypes",
        operator: "array-contains-any",
        value: filter.dietTypes,
      });
    }

    if (filter.cuisines && filter.cuisines.length > 0) {
      whereConditions.push({
        field: "cuisines",
        operator: "array-contains-any",
        value: filter.cuisines,
      });
    }

    if (filter.difficulty) {
      whereConditions.push({
        field: "difficulty",
        operator: "==",
        value: filter.difficulty,
      });
    }

    if (filter.maxCookTime) {
      whereConditions.push({
        field: "cookTime",
        operator: "<=",
        value: filter.maxCookTime,
      });
    }

    if (filter.maxPrepTime) {
      whereConditions.push({
        field: "prepTime",
        operator: "<=",
        value: filter.maxPrepTime,
      });
    }

    const result = await FirestoreUtils.paginate<RecipeFirestoreDocument>(
      this.collection,
      {
        page,
        limit,
        orderBy,
        orderDirection,
        where: whereConditions,
      }
    );

    // Convert Firestore data to Recipe models
    const items = result.items.map((item) =>
      this.convertFirestoreDataToRecipe(item)
    );

    return {
      ...result,
      items,
    };
  }

  async searchByText(
    query: string,
    options: RecipeSearchOptions = {}
  ): Promise<{
    items: Recipe[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }> {
    // Simple text search on name field
    // For production, consider using Algolia or Cloud Search
    const result = await FirestoreUtils.search<RecipeFirestoreDocument>(
      this.collection,
      "name",
      query.toLowerCase(),
      options
    );

    // Convert Firestore data to Recipe models
    const items = result.items.map((item) =>
      this.convertFirestoreDataToRecipe(item)
    );

    return {
      ...result,
      items,
    };
  }

  async getByUser(
    userId: string,
    options: RecipeSearchOptions = {}
  ): Promise<{
    items: Recipe[];
    total: number;
    page: number;
    limit: number;
    pages: number;
  }> {
    const {
      page = 1,
      limit = 10,
      orderBy = "createdAt",
      orderDirection = "desc",
    } = options;

    const result = await FirestoreUtils.paginate<RecipeFirestoreDocument>(
      this.collection,
      {
        page,
        limit,
        orderBy,
        orderDirection,
        where: [
          {
            field: "createdBy",
            operator: "==",
            value: userId,
          },
        ],
      }
    );

    // Convert Firestore data to Recipe models
    const items = result.items.map((item) =>
      this.convertFirestoreDataToRecipe(item)
    );

    return {
      ...result,
      items,
    };
  }

  async getRandomRecipes(count: number = 10): Promise<Recipe[]> {
    // Simple implementation - get recent recipes
    // For true randomness, you'd need a different approach
    const result = await FirestoreUtils.paginate<RecipeFirestoreDocument>(
      this.collection,
      {
        limit: count,
        orderBy: "createdAt",
        orderDirection: "desc",
      }
    );

    // Convert Firestore data to Recipe models
    return result.items.map((item) => this.convertFirestoreDataToRecipe(item));
  }
}
