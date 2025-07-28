import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  Max,
  MinLength,
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
} from "class-validator";
import { Type } from "class-transformer";
import {
  IngredientDto,
  InstructionDto,
  TagDto,
  NutritionalInfoDto,
} from "@/common/dto";
import { Cuisine, DietType, Difficulty, MealType } from "@tickt-ltd/types";

export class CreateRecipeDto {
  @ApiProperty({
    description: "Recipe name",
    example: "Mediterranean Pasta Salad",
  })
  @IsString()
  @MinLength(1)
  @MaxLength(200)
  name: string;

  @ApiProperty({
    description: "Recipe description",
    example: "A refreshing pasta salad with vegetables and feta cheese",
  })
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  description: string;

  @ApiProperty({ description: "Recipe ingredients", type: [IngredientDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  ingredients: IngredientDto[];

  @ApiProperty({ description: "Cooking instructions", type: [InstructionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InstructionDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  instructions: InstructionDto[];

  @ApiProperty({ description: "Preparation time in minutes", example: 15 })
  @IsNumber()
  @Min(0)
  @Max(1440)
  prepTime: number;

  @ApiProperty({ description: "Cooking time in minutes", example: 20 })
  @IsNumber()
  @Min(0)
  @Max(1440)
  cookTime: number;

  @ApiProperty({ description: "Number of servings", example: 4 })
  @IsNumber()
  @Min(1)
  @Max(100)
  servings: number;

  @ApiPropertyOptional({
    description: "Cuisine types",
    enum: Cuisine,
    isArray: true,
    example: [Cuisine.MEDITERRANEAN],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Cuisine, { each: true })
  cuisines?: Cuisine[];

  @ApiProperty({
    description: "Meal types",
    enum: MealType,
    isArray: true,
    example: [MealType.LUNCH],
  })
  @IsArray()
  @IsEnum(MealType, { each: true })
  @ArrayMinSize(1)
  mealTypes: MealType[];

  @ApiPropertyOptional({
    description: "Diet types",
    enum: DietType,
    isArray: true,
    example: [DietType.VEGETARIAN],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(DietType, { each: true })
  dietTypes?: DietType[];

  @ApiPropertyOptional({ description: "Recipe tags", type: [TagDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags?: TagDto[];

  @ApiProperty({
    description: "Recipe difficulty level",
    enum: Difficulty,
    example: Difficulty.MEDIUM,
  })
  @IsEnum(Difficulty)
  difficulty: Difficulty;

  @ApiProperty({
    description: "Nutritional information",
    type: NutritionalInfoDto,
  })
  @ValidateNested()
  @Type(() => NutritionalInfoDto)
  nutritionalInfo: NutritionalInfoDto;

  @ApiPropertyOptional({
    description: "Recipe image URL",
    example: "https://example.com/recipe-image.jpg",
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  imageUrl?: string;

  @ApiPropertyOptional({ description: "User who created the recipe" })
  @IsOptional()
  @IsString()
  createdBy?: string;
}
