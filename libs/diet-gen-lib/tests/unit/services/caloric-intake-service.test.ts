import { CaloricIntakeService } from '../../../src/services/caloric-intake.service';
import { Gender, ActivityLevel, DietGoal, GoalPace } from '@tickt-ltd/types';
import { CalorieAdjustmentsConfig } from '../../../src/utils/constants';

describe('CaloricIntakeService', () => {
    let service: CaloricIntakeService;

    beforeEach(() => {
        service = new CaloricIntakeService();
    });

    describe('calculateBmr', () => {
        it('should calculate BMR correctly for males', () => {
            const bmr = service.calculateBmr(Gender.MALE, 70, 175, 30);
            expect(bmr).toBeCloseTo(1648.75, 2);
        });

        it('should calculate BMR correctly for females', () => {
            const bmr = service.calculateBmr(Gender.FEMALE, 60, 165, 25);
            expect(bmr).toBeCloseTo(1345.25, 2);
        });

        it('should throw an error for non-positive weight', () => {
            expect(() => service.calculateBmr(Gender.MALE, 0, 175, 30)).toThrow();
        });

        it('should throw an error for non-positive height', () => {
            expect(() => service.calculateBmr(Gender.MALE, 70, 0, 30)).toThrow();
        });

        it('should throw an error for non-positive age', () => {
            expect(() => service.calculateBmr(Gender.MALE, 70, 175, 0)).toThrow();
        });
    });

    describe('adjustBmrForActivityLevel', () => {
        it('should adjust BMR correctly for sedentary activity level', () => {
            const adjustedBmr = service.adjustBmrForActivityLevel(1500, ActivityLevel.SEDENTARY);
            expect(adjustedBmr).toBe(1800);
        });

        it('should adjust BMR correctly for lightly active activity level', () => {
            const adjustedBmr = service.adjustBmrForActivityLevel(1500, ActivityLevel.LIGHTLY_ACTIVE);
            expect(adjustedBmr).toBe(2062.5);
        });

        it('should adjust BMR correctly for moderately active activity level', () => {
            const adjustedBmr = service.adjustBmrForActivityLevel(1500, ActivityLevel.MODERATELY_ACTIVE);
            expect(adjustedBmr).toBe(2325);
        });

        it('should adjust BMR correctly for very active activity level', () => {
            const adjustedBmr = service.adjustBmrForActivityLevel(1500, ActivityLevel.VERY_ACTIVE);
            expect(adjustedBmr).toBe(2587.5);
        });

        it('should throw an error for non-positive BMR', () => {
            expect(() => service.adjustBmrForActivityLevel(0, ActivityLevel.SEDENTARY)).toThrow();
        });

        it('should throw an error for invalid activity level', () => {
            expect(() => service.adjustBmrForActivityLevel(1500, 'INVALID' as ActivityLevel)).toThrow();
        });
    });

    describe('adjustCaloriesForDietGoal', () => {
        it('should adjust calories correctly for weight loss with moderate pace', () => {
            const adjustedCalories = service.adjustCaloriesForDietGoal(2000, DietGoal.WEIGHT_LOSS);
            expect(adjustedCalories).toBe(2000 - CalorieAdjustmentsConfig.MODERATE);
        });

        it('should adjust calories correctly for weight gain with moderate pace', () => {
            const adjustedCalories = service.adjustCaloriesForDietGoal(2000, DietGoal.WEIGHT_GAIN);
            expect(adjustedCalories).toBe(2000 + CalorieAdjustmentsConfig.MODERATE);
        });

        it('should adjust calories correctly for weight loss with fast pace', () => {
            const adjustedCalories = service.adjustCaloriesForDietGoal(2000, DietGoal.WEIGHT_LOSS, GoalPace.FAST);
            expect(adjustedCalories).toBe(2000 - CalorieAdjustmentsConfig.FAST);
        });

        it('should adjust calories correctly for weight gain with fast pace', () => {
            const adjustedCalories = service.adjustCaloriesForDietGoal(2000, DietGoal.WEIGHT_GAIN, GoalPace.FAST);
            expect(adjustedCalories).toBe(2000 + CalorieAdjustmentsConfig.FAST);
        });

        it('should return the same calories for maintenance goal', () => {
            const result = service.adjustCaloriesForDietGoal(2000, DietGoal.MAINTENANCE);
            expect(result).toBe(2000);
        });

        it('should throw an error for non-positive adjusted BMR', () => {
            expect(() => service.adjustCaloriesForDietGoal(0, DietGoal.WEIGHT_LOSS)).toThrow();
        });

        it('should throw an error for invalid goal', () => {
            expect(() => service.adjustCaloriesForDietGoal(2000, 'INVALID' as DietGoal)).toThrow();
        });

        it('should throw an error for invalid pace', () => {
            expect(() => service.adjustCaloriesForDietGoal(2000, DietGoal.WEIGHT_LOSS, 'INVALID' as GoalPace)).toThrow();
        });
    });
});
