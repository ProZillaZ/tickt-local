import { Injectable, BadRequestException, Logger, Inject } from '@nestjs/common';
import { GenerateMealPlanDto } from '../dto/generate-meal-plan.dto';
import { CreateMealPlanDto } from '../dto/create-meal-plan.dto';
import { MealPlanBuilder } from '@tickt-ltd/diet-gen-lib';
import { WeekMealPlan, Recipe, UserProfile } from '@tickt-ltd/types';
import { MealPlanMapper } from '../mappers/meal-plan.mapper';
import { RecipeSelectionService } from '../../recipes/services/recipe-selection.service';
import { AllergenFilterService } from '../../recipes/services/allergen-filter.service';
import { MealDistributionService } from './meal-distribution.service';

@Injectable()
export class MealPlanGeneratorService {
	private readonly logger = new Logger(MealPlanGeneratorService.name);

	constructor(
		private readonly recipeSelectionService: RecipeSelectionService,
		private readonly allergenFilterService: AllergenFilterService,
		private readonly mealDistributionService: MealDistributionService
	) {}

	/**
	 * Generates a meal plan using the diet-gen-lib MealPlanBuilder
	 * @param generateDto - User profile and generation parameters
	 * @returns CreateMealPlanDto ready for persistence
	 */
	async generateMealPlan(generateDto: GenerateMealPlanDto): Promise<CreateMealPlanDto> {
		try {
			this.validateUserProfile(generateDto.userProfile);

			this.logger.log(`Generating meal plan for user profile: ${generateDto.userProfile?.id || 'unknown'}`);

			const mealPlanBuilder = new MealPlanBuilder(generateDto.userProfile);

			const recipes = generateDto.options?.includeRecipes
				? await this.getRecipesForGeneration(generateDto)
				: undefined;

			const weekMealPlan: WeekMealPlan = mealPlanBuilder.build(recipes);

			if (!weekMealPlan || !weekMealPlan.dayPlans || weekMealPlan.dayPlans.length === 0) {
				throw new Error('Generated meal plan is empty or invalid');
			}

			const createMealPlanDto = MealPlanMapper.map(weekMealPlan, generateDto);

			this.logger.log('Meal plan generated successfully');
			return createMealPlanDto;
		} catch (error) {
			this.logger.error(`Failed to generate meal plan: ${error.message}`, error.stack);

			if (error.message.includes('user profile')) {
				throw new BadRequestException(`Invalid user profile: ${error.message}`);
			} else if (error.message.includes('dietary')) {
				throw new BadRequestException(`Dietary constraints issue: ${error.message}`);
			} else {
				throw new BadRequestException(`Meal plan generation failed: ${error.message}`);
			}
		}
	}

	/**
	 * Gets recipes for meal plan generation based on user preferences
	 */
	private async getRecipesForGeneration(generateDto: GenerateMealPlanDto): Promise<Recipe[][]> {
		try {
			const { userProfile, options } = generateDto;
			const { dietFilters } = userProfile;
			const mealCount = dietFilters?.mealCount || 3;

			this.logger.log(`🔍 Recipe selection pipeline started:`);
			this.logger.log(`   - Diet type: ${userProfile.dietType}`);
			this.logger.log(`   - Meal count: ${mealCount}`);
			this.logger.log(`   - Favorite cuisines: ${dietFilters?.favoriteCuisines?.join(', ') || 'None'}`);
			this.logger.log(`   - Allergies: ${dietFilters?.allergies?.join(', ') || 'None'}`);

			if (mealCount < 1 || mealCount > 6) {
				this.logger.warn(`⚠️  Invalid meal count ${mealCount} in user profile, using default of 3`);
			}

			this.logger.log(`🔄 Step 1: Selecting recipes from database...`);
			const selectedRecipes = await this.recipeSelectionService.selectRecipes(userProfile);

			this.logger.log(`📊 Step 1 Result: Found ${selectedRecipes.length} recipes matching criteria`);
			
			if (selectedRecipes.length === 0) {
				this.logger.warn('❌ No recipes found matching user criteria, falling back to ingredient-based generation');
				this.logger.log(`   Possible reasons:`);
				this.logger.log(`   - No recipes in database for diet type: ${userProfile.dietType}`);
				this.logger.log(`   - No recipes matching cuisines: ${dietFilters?.favoriteCuisines?.join(', ') || 'N/A'}`);
				return undefined;
			}

			// Log sample recipes for debugging
			if (selectedRecipes.length > 0) {
				this.logger.log(`🍽️  Sample recipes found:`);
				selectedRecipes.slice(0, 3).forEach((recipe, index) => {
					this.logger.log(`   ${index + 1}. "${recipe.name}" [Cuisines: ${recipe.cuisines?.join(', ') || 'None'}]`);
				});
			}

			this.logger.log(`🔄 Step 2: Filtering recipes by allergens...`);
			const filteredRecipes = this.allergenFilterService.filterRecipesByAllergens(
				selectedRecipes,
				dietFilters?.allergies || []
			);

			this.logger.log(`📊 Step 2 Result: ${filteredRecipes.length} recipes remain after allergen filtering`);
			const filteredCount = selectedRecipes.length - filteredRecipes.length;
			if (filteredCount > 0) {
				this.logger.log(`   - Filtered out ${filteredCount} recipes due to allergen constraints`);
			}

			if (filteredRecipes.length === 0) {
				this.logger.warn('❌ No recipes found after filtering allergens, falling back to ingredient-based generation');
				this.logger.log(`   All recipes contained allergens: ${dietFilters?.allergies?.join(', ') || 'N/A'}`);
				return undefined;
			}

			this.logger.log(`🔄 Step 3: Distributing recipes across week...`);
			const weekRecipes = this.mealDistributionService.distributeRecipesForWeek(
				filteredRecipes,
				mealCount,
				'balanced'
			);

			this.logger.log(`📊 Step 3 Result: Generated ${weekRecipes.length} days of meal plans`);
			weekRecipes.forEach((dayRecipes, dayIndex) => {
				this.logger.log(`   Day ${dayIndex + 1}: ${dayRecipes.length} meals planned`);
			});

			this.logger.log(`✅ Recipe selection pipeline completed successfully`);
			return weekRecipes;

		} catch (error) {
			this.logger.error(`💥 Recipe selection pipeline failed: ${error.message}`, error.stack);
			return undefined;
		}
	}

	/**
	 * Validates required user profile fields for meal plan generation
	 * TODO: Replace when the UserProfile CRUD API is created with the relevant DTOs
	 */
	private validateUserProfile(userProfile: UserProfile): void {
		if (!userProfile) {
			throw new Error('User profile is required');
		}

		const requiredFields = ['age', 'gender', 'heightCm', 'weightKg', 'activityLevel', 'goal', 'dietType'];
		const missingFields = requiredFields.filter(field => !userProfile[field]);

		if (missingFields.length > 0) {
			throw new Error(`Missing required user profile fields: ${missingFields.join(', ')}`);
		}

		// Validate age range
		if (userProfile.age < 18 || userProfile.age > 100) {
			throw new Error('Age must be between 18 and 100 years');
		}

		// Validate weight and height
		if (userProfile.weightKg <= 0 || userProfile.weightKg > 500) {
			throw new Error('Weight must be between 1 and 500 kg');
		}

		if (userProfile.heightCm <= 0 || userProfile.heightCm > 300) {
			throw new Error('Height must be between 1 and 300 cm');
		}
	}
}
