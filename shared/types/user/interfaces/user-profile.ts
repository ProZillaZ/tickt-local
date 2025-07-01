import { Gender, ActivityLevel, DietGoal, UnitSystem } from '../enums';
import { DietFilters, DietType } from '../../nutrition';

/**
 * Interface representing a complete user profile for health and nutrition applications
 */
export interface UserProfile {
	id: string;
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
	createdAt: Date;
	updatedAt: Date;
}
