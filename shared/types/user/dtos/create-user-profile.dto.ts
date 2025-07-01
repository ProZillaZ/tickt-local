import { Gender, ActivityLevel, DietGoal, UnitSystem } from '../enums';
import { DietFilters, DietType } from '../../nutrition';

export interface CreateUserProfileDto {
	email: string;
	age: number;
	gender: Gender;
	heightCm: number;
	weightKg: number;
	activityLevel: ActivityLevel;
	goal: DietGoal;
	dietType: DietType;
	unitSystem: UnitSystem;
	dietFilters?: DietFilters;
}
