import {Gender} from "./gender.enum";
import {ActivityLevel} from "./activity-level.enum";
import {DietGoal} from "./diet-goal.enum";
import {DietType} from "./diet-type.enum";
import {UnitSystem} from "./unit-system.enum";
import {DietFilters} from "../filters/diet-filters";

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