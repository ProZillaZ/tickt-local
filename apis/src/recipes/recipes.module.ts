import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipesService } from './recipes.service';
import { RecipesController } from './recipes.controller';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { RecipeRepository } from './repositories/recipe.repository';
import { AllergenFilterService, RecipeSelectionService } from './services';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Recipe.name, schema: RecipeSchema },
		]),
	],
	controllers: [RecipesController],
	providers: [
		RecipesService,
		RecipeRepository,
		AllergenFilterService,
		RecipeSelectionService
	],
	exports: [
		AllergenFilterService,
		RecipeSelectionService
	],
})
export class RecipesModule {}
