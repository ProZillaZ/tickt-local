import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, Types } from 'mongoose';
import { BaseRepository, QueryOptions, PaginatedResponse } from '@/common';
import { WeekMealPlan } from '../schemas/week-meal-plan.schema';
import { MealPlanQueryDto } from '../dto/meal-plan-query.dto';

export type WeekMealPlanDocument = WeekMealPlan & Document;

@Injectable()
export class MealPlanRepository extends BaseRepository<WeekMealPlanDocument> {
	constructor(
		@InjectModel(WeekMealPlan.name)
		private readonly mealPlanModel: Model<WeekMealPlanDocument>
	) {
		super(mealPlanModel);
	}

	/**
	 * Find meal plans with advanced filtering
	 */
	async findWithAdvancedFilters(query: MealPlanQueryDto): Promise<PaginatedResponse<WeekMealPlanDocument>> {
		const filter = this.buildAdvancedFilter(query);
		const options: QueryOptions = {
			page: query.page,
			limit: query.limit,
			sort: { createdAt: -1 },
		};

		return this.findAll(filter, options);
	}

	/**
	 * Find meal plans by date range
	 */
	async findByDateRange(
		startDate: Date,
		endDate: Date,
		options?: QueryOptions
	): Promise<WeekMealPlanDocument[]> {
		const filter = {
			startDate: { $gte: startDate },
			endDate: { $lte: endDate }
		};
		return this.find(filter, options);
	}

	/**
	 * Find meal plans by user ID
	 */
	async findByUserId(userId: string, options?: QueryOptions): Promise<WeekMealPlanDocument[]> {
		if (!Types.ObjectId.isValid(userId)) {
			throw new Error('Invalid user ID format');
		}

		const filter = { userId: new Types.ObjectId(userId) };
		return this.find(filter, options);
	}

	/**
	 * Find meal plans by name (partial match)
	 */
	async findByName(name: string, options?: QueryOptions): Promise<WeekMealPlanDocument[]> {
		const filter = { name: { $regex: name, $options: 'i' } };
		return this.find(filter, options);
	}

	/**
	 * Find meal plans that overlap with a given date range
	 */
	async findOverlapping(
		startDate: Date,
		endDate: Date,
		options?: QueryOptions
	): Promise<WeekMealPlanDocument[]> {
		const filter = {
			$or: [
				// Meal plan starts within the range
				{
					startDate: { $gte: startDate, $lte: endDate }
				},
				// Meal plan ends within the range
				{
					endDate: { $gte: startDate, $lte: endDate }
				},
				// Meal plan encompasses the entire range
				{
					startDate: { $lte: startDate },
					endDate: { $gte: endDate }
				}
			]
		};
		return this.find(filter, options);
	}

	/**
	 * Find recent meal plans
	 */
	async findRecent(limit: number = 10): Promise<WeekMealPlanDocument[]> {
		return this.find({}, {
			sort: { createdAt: -1 },
		}).then(results => results.slice(0, limit));
	}

	/**
	 * Create meal plan with user association
	 */
	async createWithUser(createDto: any, userId?: string): Promise<WeekMealPlanDocument> {
		const mealPlanData = {
			...createDto,
			startDate: new Date(createDto.startDate),
			endDate: new Date(createDto.endDate),
			dayPlans: createDto.dayPlans.map((dayPlan: any) => ({
				...dayPlan,
				date: new Date(dayPlan.date),
				meals: dayPlan.meals.map((mealOrRecipe: any) => {
					if (mealOrRecipe.type === 'meal') {
						return mealOrRecipe.meal;
					} else {
						return mealOrRecipe.recipe;
					}
				}),
			})),
			userId: userId ? new Types.ObjectId(userId) : undefined,
		};

		return this.create(mealPlanData);
	}

	/**
	 * Build advanced filter from query DTO
	 */
	private buildAdvancedFilter(query: MealPlanQueryDto): FilterQuery<WeekMealPlanDocument> {
		const filter: FilterQuery<WeekMealPlanDocument> = {};

		// Date range filters
		if (query.startDate) {
			filter.startDate = { $gte: new Date(query.startDate) };
		}

		if (query.endDate) {
			filter.endDate = { $lte: new Date(query.endDate) };
		}

		if (query.name) {
			filter.name = { $regex: query.name, $options: 'i' };
		}

		if (query.userId) {
			if (Types.ObjectId.isValid(query.userId)) {
				filter.userId = new Types.ObjectId(query.userId);
			}
		}

		return filter;
	}
}
