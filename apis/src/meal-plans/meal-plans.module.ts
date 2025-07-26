import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MealPlansService } from './meal-plans.service';
import { MealPlansController } from './meal-plans.controller';
import { MealPlanGeneratorService } from './services/meal-plan-generator.service';
import { MealDistributionService } from './services/meal-distribution.service';
import { WeekMealPlan, WeekMealPlanSchema } from './schemas/week-meal-plan.schema';
import { MealPlanRepository } from './repositories/meal-plan.repository';
import { RecipesModule } from '../recipes/recipes.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: WeekMealPlan.name, schema: WeekMealPlanSchema },
		]),
		RecipesModule,
	],
	controllers: [MealPlansController],
	providers: [
		MealPlansService,
		MealPlanGeneratorService,
		MealDistributionService,
		MealPlanRepository
	],
	exports: [
	],
})
export class MealPlansModule {
}
