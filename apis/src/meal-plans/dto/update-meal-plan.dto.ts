import { PartialType } from '@nestjs/swagger';
import { CreateMealPlanDto } from '@/meal-plans';

export class UpdateMealPlanDto extends PartialType(CreateMealPlanDto) {
}
