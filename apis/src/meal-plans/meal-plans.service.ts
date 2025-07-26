import { Injectable } from '@nestjs/common';
import { BaseService, PaginatedResponse } from '@/common';
import { CreateMealPlanDto } from './dto/create-meal-plan.dto';
import { UpdateMealPlanDto } from './dto/update-meal-plan.dto';
import { MealPlanQueryDto } from './dto/meal-plan-query.dto';
import { MealPlanRepository, WeekMealPlanDocument } from './repositories/meal-plan.repository';

@Injectable()
export class MealPlansService extends BaseService<WeekMealPlanDocument> {
	constructor(private readonly mealPlanRepository: MealPlanRepository) {
		super(mealPlanRepository);
	}

	async save(createMealPlanDto: CreateMealPlanDto, userId?: string): Promise<WeekMealPlanDocument> {
		return await this.mealPlanRepository.createWithUser(createMealPlanDto, userId);
	}

	async findAll(query: MealPlanQueryDto): Promise<PaginatedResponse<WeekMealPlanDocument>> {
		return await this.mealPlanRepository.findWithAdvancedFilters(query);
	}

	async findOne(id: string): Promise<WeekMealPlanDocument> {
		return await this.findById(id);
	}

	async update(id: string, updateMealPlanDto: UpdateMealPlanDto): Promise<WeekMealPlanDocument> {
		// Transform dates if present
		const updateData: any = { ...updateMealPlanDto };

		if (updateMealPlanDto.startDate) {
			updateData.startDate = new Date(updateMealPlanDto.startDate);
		}

		if (updateMealPlanDto.endDate) {
			updateData.endDate = new Date(updateMealPlanDto.endDate);
		}

		if (updateMealPlanDto.dayPlans) {
			updateData.dayPlans = updateMealPlanDto.dayPlans.map(dayPlan => ({
				...dayPlan,
				date: new Date(dayPlan.date),
				meals: dayPlan.meals.map(mealOrRecipe => {
					if (mealOrRecipe.type === 'meal') {
						return mealOrRecipe.meal;
					} else {
						return mealOrRecipe.recipe;
					}
				}),
			}));
		}

		return await this.repository.update(id, updateData);
	}

	async remove(id: string): Promise<void> {
		await this.delete(id);
	}

	async findByUserId(userId: string, query: MealPlanQueryDto): Promise<PaginatedResponse<WeekMealPlanDocument>> {
		const queryWithUserId = Object.assign(new MealPlanQueryDto(), query, { userId });
		return this.findAll(queryWithUserId);
	}

	async findByDateRange(startDate: string, endDate: string, query: MealPlanQueryDto): Promise<PaginatedResponse<WeekMealPlanDocument>> {
		const queryWithDates = Object.assign(new MealPlanQueryDto(), query, { startDate, endDate });
		return this.findAll(queryWithDates);
	}
}
