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
	BadRequestException,
} from '@nestjs/common';
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiQuery,
} from '@nestjs/swagger';
import { MealPlansService } from './meal-plans.service';
import { MealPlanGeneratorService } from './services/meal-plan-generator.service';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { MealPlanQueryDto } from './dto/meal-plan-query.dto';
import { GenerateMealPlanDto } from './dto/generate-meal-plan.dto';
import { HttpExceptionFilter } from '@/common';
import { ApiResponse as IApiResponse, PaginatedResponse } from '../common/interfaces/api-response.interface';
import { WeekMealPlan } from './schemas/week-meal-plan.schema';

@ApiTags('meal-plans')
@Controller('meal-plans')
@UseFilters(HttpExceptionFilter)
export class MealPlansController {
	constructor(
		private readonly mealPlansService: MealPlansService,
		private readonly generatorService: MealPlanGeneratorService,
	) {
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({ summary: 'Create a new meal plan' })
	@ApiResponse({ status: 201, description: 'Meal plan created successfully' })
	@ApiResponse({ status: 400, description: 'Invalid input data' })
	async create(@Body() createMealPlanDto: CreateMealPlanDto): Promise<IApiResponse<WeekMealPlan>> {
		const mealPlan = await this.mealPlansService.save(createMealPlanDto);
		return {
			success: true,
			data: mealPlan,
			message: 'Meal plan created successfully',
		};
	}

	@Post('generate')
	@HttpCode(HttpStatus.CREATED)
	@ApiOperation({
		summary: 'Generate a meal plan using AI',
		description: 'Creates a personalized meal plan based on user profile, dietary preferences, and constraints using the diet-gen-lib meal plan builder'
	})
	@ApiResponse({ status: 201, description: 'Meal plan generated and created successfully' })
	@ApiResponse({ status: 400, description: 'Invalid user profile data or generation failed' })
	async generateMealPlan(@Body() generateDto: GenerateMealPlanDto): Promise<IApiResponse<WeekMealPlan>> {
		try {
			const generatedPlanDto = await this.generatorService.generateMealPlan(generateDto);
			const mealPlan = await this.mealPlansService.save(generatedPlanDto);

			return {
				success: true,
				data: mealPlan,
				message: 'Meal plan generated and created successfully',
			};
		} catch (error) {
			if (error.message.includes('timed out')) {
				throw new BadRequestException('Meal plan generation is taking longer than expected. Please try again with simpler preferences or contact support.');
			}
			throw error; // Re-throw other errors
		}
	}

	@Get()
	@ApiOperation({ summary: 'Get all meal plans with optional filtering and pagination' })
	@ApiResponse({ status: 200, description: 'Meal plans retrieved successfully' })
	@ApiQuery({ name: 'page', required: false, description: 'Page number' })
	@ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
	@ApiQuery({ name: 'startDate', required: false, description: 'Filter by start date' })
	@ApiQuery({ name: 'endDate', required: false, description: 'Filter by end date' })
	@ApiQuery({ name: 'name', required: false, description: 'Filter by name' })
	@ApiQuery({ name: 'userId', required: false, description: 'Filter by user ID' })
	async findAll(@Query() query: MealPlanQueryDto): Promise<PaginatedResponse<WeekMealPlan>> {
		return await this.mealPlansService.findAll(query);
	}

	@Get('user/:userId')
	@ApiOperation({ summary: 'Get meal plans for a specific user' })
	@ApiParam({ name: 'userId', description: 'User ID' })
	@ApiResponse({ status: 200, description: 'User meal plans retrieved successfully' })
	@ApiResponse({ status: 400, description: 'Invalid user ID format' })
	async findByUserId(
		@Param('userId') userId: string,
		@Query() query: MealPlanQueryDto,
	): Promise<PaginatedResponse<WeekMealPlan>> {
		return await this.mealPlansService.findByUserId(userId, query);
	}

	@Get('date-range')
	@ApiOperation({ summary: 'Get meal plans within a date range' })
	@ApiQuery({ name: 'startDate', required: true, description: 'Start date (YYYY-MM-DD)' })
	@ApiQuery({ name: 'endDate', required: true, description: 'End date (YYYY-MM-DD)' })
	@ApiResponse({ status: 200, description: 'Meal plans retrieved successfully' })
	@ApiResponse({ status: 400, description: 'Invalid date format' })
	async findByDateRange(
		@Query('startDate') startDate: string,
		@Query('endDate') endDate: string,
		@Query() query: MealPlanQueryDto,
	): Promise<PaginatedResponse<WeekMealPlan>> {
		return await this.mealPlansService.findByDateRange(startDate, endDate, query);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get a specific meal plan by ID' })
	@ApiParam({ name: 'id', description: 'Meal plan ID' })
	@ApiResponse({ status: 200, description: 'Meal plan retrieved successfully' })
	@ApiResponse({ status: 404, description: 'Meal plan not found' })
	@ApiResponse({ status: 400, description: 'Invalid meal plan ID format' })
	async findOne(@Param('id') id: string): Promise<IApiResponse<WeekMealPlan>> {
		const mealPlan = await this.mealPlansService.findOne(id);
		return {
			success: true,
			data: mealPlan,
		};
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Update a meal plan' })
	@ApiParam({ name: 'id', description: 'Meal plan ID' })
	@ApiResponse({ status: 200, description: 'Meal plan updated successfully' })
	@ApiResponse({ status: 404, description: 'Meal plan not found' })
	@ApiResponse({ status: 400, description: 'Invalid input data or meal plan ID format' })
	async update(
		@Param('id') id: string,
		@Body() updateMealPlanDto: UpdateMealPlanDto,
	): Promise<IApiResponse<WeekMealPlan>> {
		const updatedMealPlan = await this.mealPlansService.update(id, updateMealPlanDto);
		return {
			success: true,
			data: updatedMealPlan,
			message: 'Meal plan updated successfully',
		};
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@ApiOperation({ summary: 'Delete a meal plan' })
	@ApiParam({ name: 'id', description: 'Meal plan ID' })
	@ApiResponse({ status: 204, description: 'Meal plan deleted successfully' })
	@ApiResponse({ status: 404, description: 'Meal plan not found' })
	@ApiResponse({ status: 400, description: 'Invalid meal plan ID format' })
	async remove(@Param('id') id: string): Promise<void> {
		await this.mealPlansService.remove(id);
	}
}
