import { Gender, ActivityLevel, DietGoal, UnitSystem } from '../enums';
import { DietFilters, DietType } from '../../nutrition';

/**
 * DTO for updating an existing user profile
 * All fields are optional for partial updates
 */
export interface UpdateUserProfileDto {
	email?: string;
	age?: number;
	gender?: Gender;
	heightCm?: number;
	weightKg?: number;
	activityLevel?: ActivityLevel;
	goal?: DietGoal;
	dietType?: DietType;
	unitSystem?: UnitSystem;
	dietFilters?: DietFilters;
}
