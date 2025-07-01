import { Gender, UnitSystem, FrameSize, ActivityLevel, DietGoal, GoalPace } from '@tickt-engineering/types';
import { FrameSizeService } from './frame-size.service';
import { HealthMetricsService } from './health-metrics.service';
import { UnitConversionService } from './unit-conversion.service';
/**
 * Service for calculating and recommending ideal target weights
 * based on user characteristics and health metrics.
 */
export class TargetWeightService {
  private frameSizeService: FrameSizeService;
  private healthMetricsService: HealthMetricsService;

  constructor(
    frameSizeService?: FrameSizeService,
    healthMetricsService?: HealthMetricsService
  ) {
    this.frameSizeService = frameSizeService || new FrameSizeService();
    this.healthMetricsService = healthMetricsService || new HealthMetricsService();
  }

  /**
   * Calculates the recommended target weight range based on height, gender, and frame size
   * using evidence-based formulas.
   * 
   * @param height Height in cm (metric) or inches (imperial)
   * @param gender User's gender
   * @param age User's age in years
   * @param unitSystem The unit system being used
   * @param frameSize Optional parameter for body frame size
   * @returns Object containing minimum, ideal, and maximum recommended weights in kg or lbs
   */
  calculateIdealWeightRange(
    height: number,
    gender: Gender,
    age: number,
    unitSystem: UnitSystem,
    frameSize: FrameSize = FrameSize.MEDIUM
  ): { min: number; ideal: number; max: number } {
    // Convert to metric if using imperial
    const heightInCm = unitSystem === UnitSystem.IMPERIAL ? height * 2.54 : height;
    
    // Base calculation using modified Hamwi formula
    let baseWeight: number;
    if (gender === Gender.MALE) {
      baseWeight = 50 + 0.91 * (heightInCm - 152.4);
    } else {
      baseWeight = 45.5 + 0.91 * (heightInCm - 152.4);
    }
    
    // Get frame factor using FrameSizeService
    const frameFactor = this.frameSizeService.getFrameFactor(frameSize);
    
    // Adjust for age (metabolism slows as we age)
    const ageFactor = age >= 50 ? 0.98 : 1.0;
    
    const idealWeight = baseWeight * frameFactor * ageFactor;
    
    // Calculate range (typically ±10% of ideal weight is considered healthy)
    const min = Math.round(idealWeight * 0.9);
    const max = Math.round(idealWeight * 1.1);
    
    // Convert back to imperial if needed
    if (unitSystem === UnitSystem.IMPERIAL) {
      return {
        min: Math.round(min * 2.20462),
        ideal: Math.round(idealWeight * 2.20462),
        max: Math.round(max * 2.20462)
      };
    }
    
    return {
      min: min,
      ideal: Math.round(idealWeight),
      max: max
    };
  }

  /**
   * Calculates BMI (Body Mass Index) given height and weight
   * 
   * @param height Height in cm (metric) or inches (imperial)
   * @param weight Weight in kg (metric) or pounds (imperial)
   * @param unitSystem The unit system being used
   * @returns Calculated BMI value
   */
  calculateBMI(
    height: number,
    weight: number,
    unitSystem: UnitSystem
  ): number {
    return this.healthMetricsService.calculateBMI(height, weight, unitSystem);
  }

  /**
   * Determines the healthy weight range based on BMI 18.5-24.9
   * 
   * @param height Height in cm (metric) or inches (imperial)
   * @param unitSystem The unit system being used
   * @returns Object containing minimum and maximum healthy weights based on BMI
   */
  calculateHealthyWeightRangeByBMI(
    height: number, 
    unitSystem: UnitSystem
  ): { min: number; max: number } {
    if (unitSystem === UnitSystem.IMPERIAL) {
      // Convert to kg/cm for calculation
      const heightInInches = height;
      const minWeight = Math.round(18.5 * (heightInInches * heightInInches) / 703);
      const maxWeight = Math.round(24.9 * (heightInInches * heightInInches) / 703);
      return { min: minWeight, max: maxWeight };
    } else {
      const heightInM = height / 100;
      const minWeight = Math.round(18.5 * (heightInM * heightInM));
      const maxWeight = Math.round(24.9 * (heightInM * heightInM));
      return { min: minWeight, max: maxWeight };
    }
  }

  /**
   * Determines the user's frame size based on available data
   * 
   * @param weight Current weight in kg (metric) or pounds (imperial)
   * @param height Height in cm (metric) or inches (imperial)
   * @param gender User's gender
   * @param unitSystem The unit system being used
   * @param providedFrameSize Optional explicitly provided frame size
   * @param wristCircumference Optional wrist measurement for more accurate estimation
   * @returns Determined frame size
   */
  private determineFrameSize(
    weight: number,
    height: number,
    gender: Gender,
    unitSystem: UnitSystem,
    providedFrameSize?: FrameSize,
    wristCircumference?: number
  ): FrameSize {
    // Use provided frame size if available
    if (providedFrameSize) {
      return providedFrameSize;
    }
    
    // Use wrist measurement if available for more accurate estimation
    if (wristCircumference) {
      return this.frameSizeService.inferFrameSize(
        wristCircumference, 
        height, 
        gender, 
        unitSystem
      );
    }
    
    // Fall back to BMI-based estimation
    return this.frameSizeService.estimateFrameSizeFromBMI(
      weight,
      height,
      gender,
      unitSystem
    );
  }

  /**
   * Calculates a detailed age-based adjustment factor for metabolic changes
   * 
   * @param age User's age in years
   * @param gender User's gender
   * @returns Age adjustment factor for weight calculations
   */
  private calculateAgeAdjustmentFactor(age: number, gender: Gender): number {
    if (age < 25) {
      return 1.0; // Young adults have optimal metabolism
    } else if (age < 35) {
      return 0.99; // Slight decrease in metabolism
    } else if (age < 45) {
      return 0.98; // Further metabolic slowdown
    } else if (age < 55) {
      return 0.97; // More significant changes during this decade
    } else if (age < 65) {
      return 0.96; // Continued reduction in muscle mass and BMR
    } else if (age < 75) {
      // More pronounced effects for elderly
      return gender === Gender.MALE ? 0.95 : 0.94;
    } else {
      // Additional adjustment for very elderly
      return gender === Gender.MALE ? 0.94 : 0.93;
    }
  }

  /**
   * Gets an activity level factor based on the user's activity level
   * 
   * @param activityLevel User's activity level
   * @returns Activity adjustment factor
   */
  private getActivityLevelFactor(activityLevel: ActivityLevel): number {
    switch (activityLevel) {
      case ActivityLevel.SEDENTARY:
        return 0.94;
      case ActivityLevel.LIGHTLY_ACTIVE:
        return 0.97;
      case ActivityLevel.MODERATELY_ACTIVE:
        return 1.0;
      case ActivityLevel.VERY_ACTIVE:
        return 1.03
      default:
        return 1.0;
    }
  }

  /**
   * Recommends a target weight based on current weight, height, gender, and health goals
   * 
   * @param currentWeight Current weight in kg (metric) or pounds (imperial)
   * @param height Height in cm (metric) or inches (imperial)
   * @param gender User's gender
   * @param age User's age in years
   * @param unitSystem The unit system being used
   * @param activityLevel User's activity level
   * @param frameSize Optional body frame size (will be estimated if not provided)
   * @param wristCircumference Optional wrist circumference for more accurate frame size estimation
   * @returns Recommended target weight in kg or lbs
   */
  recommendTargetWeight(
    currentWeight: number,
    height: number,
    gender: Gender,
    age: number,
    unitSystem: UnitSystem,
    activityLevel: ActivityLevel = ActivityLevel.LIGHTLY_ACTIVE,
    frameSize?: FrameSize,
    wristCircumference?: number
  ): number {
    // Determine frame size using the extracted method
    const userFrameSize = this.determineFrameSize(
      currentWeight,
      height,
      gender,
      unitSystem,
      frameSize,
      wristCircumference
    );
    
    const bmiRange = this.calculateHealthyWeightRangeByBMI(height, unitSystem);
    const idealRange = this.calculateIdealWeightRange(height, gender, age, unitSystem, userFrameSize);
    
    // Calculate detailed age adjustment factor
    const ageAdjustmentFactor = this.calculateAgeAdjustmentFactor(age, gender);
    
    // Check if current weight is healthy
    if (currentWeight >= bmiRange.min && currentWeight <= bmiRange.max) {
      // If already in healthy range, target the ideal weight for their frame size
      // Apply age adjustment to the ideal weight
      return Math.round(idealRange.ideal * ageAdjustmentFactor);
    }
    
    // If overweight, target the upper end of healthy BMI range
    if (currentWeight > bmiRange.max) {
      // Activity level adjustment based on enum
      const activityAdjustment = this.getActivityLevelFactor(activityLevel);
      
      // Frame size adjustment - larger frames can support more weight
      const frameFactor = this.frameSizeService.getFrameFactor(userFrameSize);
      
      // Apply age adjustment factor
      const adjustedMax = bmiRange.max * activityAdjustment * frameFactor * ageAdjustmentFactor;
      
      const target = Math.min(
        currentWeight * 0.9, // Don't recommend more than 10% loss initially
        adjustedMax
      );
      return Math.round(target);
    }
    
    // If underweight, target the lower end of healthy BMI range
    if (currentWeight < bmiRange.min) {
      // Frame size adjustment - smaller frames naturally weigh less
      const frameFactor = this.frameSizeService.getFrameFactor(userFrameSize);
      
      // Apply age adjustment - but in reverse for underweight individuals
      // For underweight, we want to ensure adequate weight regardless of age
      const ageFactorForUnderweight = Math.min(1.0, 2 - ageAdjustmentFactor);
      
      const adjustedMin = bmiRange.min * frameFactor * ageFactorForUnderweight;
      
      const target = Math.max(
        currentWeight * 1.1, // Don't recommend more than 10% gain initially
        adjustedMin
      );
      return Math.round(target);
    }
    
    // Fallback to ideal weight for their frame size with age adjustment
    return Math.round(idealRange.ideal * ageAdjustmentFactor);
  }

  /**
   * Infers the diet goal based on the relationship between current and target weights
   * 
   * @param currentWeight Current weight in kg or lbs
   * @param targetWeight Target weight in kg or lbs
   * @returns The inferred diet goal
   */
  inferDietGoal(currentWeight: number, targetWeight: number): DietGoal {
    // Calculate percentage difference
    const difference = targetWeight - currentWeight;
    const percentDifference = (difference / currentWeight) * 100;
    
    // Small differences (±1%) are considered maintenance
    if (Math.abs(percentDifference) < 1) {
      return DietGoal.MAINTENANCE;
    }
    
    // Weight loss goal
    if (difference < 0) {
      return DietGoal.WEIGHT_LOSS;
    }
    
    // Weight gain goal
    return DietGoal.WEIGHT_GAIN;
  }

  /**
   * Calculate the number of weeks needed to reach a target weight based on the selected pace
   * 
   * @param currentWeight Current weight in kg (metric) or pounds (imperial)
   * @param targetWeight Target weight in kg (metric) or pounds (imperial)
   * @param goalPace Selected weight change pace (MODERATE: 0.5kg/week, FAST: 1kg/week)
   * @param unitSystem The unit system being used
   * @returns Number of weeks to reach the target
   */
  calculateTimeToReachGoal(
    currentWeight: number,
    targetWeight: number,
    goalPace: GoalPace,
    unitSystem: UnitSystem
  ): number {
    // Infer diet goal
    const dietGoal = this.inferDietGoal(currentWeight, targetWeight);
    
    // For maintenance goals, return 0 weeks
    if (dietGoal === DietGoal.MAINTENANCE) {
      return 0;
    }
    
    // Calculate weight difference
    const weightDifference = Math.abs(targetWeight - currentWeight);
    
    // Get weekly rate in kg based on the pace
    let weeklyRate: number;
    if (goalPace === GoalPace.FAST) {
      weeklyRate = 1.0; // 1.0 kg per week
    } else {
      weeklyRate = 0.5; // 0.5 kg per week (MODERATE is the default)
    }
    
    // Convert to imperial if needed
    if (unitSystem === UnitSystem.IMPERIAL) {
      weeklyRate = UnitConversionService.convertKgToLbs(weeklyRate);
    }
    
    // Calculate weeks
    const weeks = weightDifference / weeklyRate;
    
    // Return ceiling value to get full weeks
    return Math.ceil(weeks);
  }
} 