import { Gender, ActivityLevel, DietGoal, GoalPace } from '@tickt-engineering/types';
import {CalorieAdjustmentsConfig} from '../utils/constants';

export class CaloricIntakeService {
    /**
     * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
     * @param gender - Gender of the user.
     * @param weightKg - Weight of the user in kilograms.
     * @param heightCm - Height of the user in centimeters.
     * @param age - Age of the user in years.
     * @returns The calculated BMR.
     */
    calculateBmr(gender: Gender, weightKg: number, heightCm: number, age: number): number {
        if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
            throw new Error("Weight, height, and age must be positive values.");
        }

        const baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * age;

        return gender === Gender.MALE ? baseBmr + 5 : baseBmr - 161;
    }

    /**
     * Adjusts BMR based on the user's activity level.
     * @param bmr - The user's calculated BMR.
     * @param activityLevel - The user's activity level.
     * @returns The adjusted BMR.
     */
    adjustBmrForActivityLevel(bmr: number, activityLevel: ActivityLevel): number {
        if (bmr <= 0) {
            throw new Error("BMR must be a positive value.");
        }

        switch (activityLevel) {
            case ActivityLevel.SEDENTARY:
                return bmr * 1.2;
            case ActivityLevel.LIGHTLY_ACTIVE:
                return bmr * 1.375;
            case ActivityLevel.MODERATELY_ACTIVE:
                return bmr * 1.55;
            case ActivityLevel.VERY_ACTIVE:
                return bmr * 1.725;
            default:
                throw new Error("Invalid activity level provided.");
        }
    }

    /**
     * Adjusts the caloric intake based on the user's diet goal.
     * @param bmrActivityLevel - The BMR adjusted for activity level.
     * @param goal - The user's diet goal.
     * @param pace - The pace of diet goal, e.g. moderate or fast.
     * @returns The final caloric intake adjusted for the user's goal.
     */
    adjustCaloriesForDietGoal(bmrActivityLevel: number, goal: DietGoal, pace: GoalPace = GoalPace.MODERATE): number {
        if (bmrActivityLevel <= 0) {
            throw new Error("Adjusted BMR must be a positive value.");
        }

        const calorieAdjustment = this.getCalorieAdjustmentForPace(pace);

        switch (goal) {
            case DietGoal.WEIGHT_LOSS:
                return bmrActivityLevel - calorieAdjustment;
            case DietGoal.WEIGHT_GAIN:
                return bmrActivityLevel + calorieAdjustment;
            case DietGoal.MAINTENANCE:
            default:
                throw new Error("Invalid diet goal provided.");
        }
    }

    private getCalorieAdjustmentForPace(pace: GoalPace): number {
        switch (pace) {
            case GoalPace.MODERATE:
                return CalorieAdjustmentsConfig.MODERATE;
            case GoalPace.FAST:
                return CalorieAdjustmentsConfig.FAST;
            default:
                throw new Error("Invalid pace provided.");
        }
    }
}
