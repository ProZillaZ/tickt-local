import { Gender, UnitSystem, FrameSize } from '@tickt-ltd/types';
import { HealthMetricsService } from './health-metrics.service';

/**
 * Service for determining and working with body frame sizes
 */
export class FrameSizeService {
  private healthMetricsService: HealthMetricsService;

  constructor(healthMetricsService?: HealthMetricsService) {
    this.healthMetricsService = healthMetricsService || new HealthMetricsService();
  }

  /**
   * Estimates frame size based on wrist circumference and height
   *
   * @param wristCircumference Wrist circumference in cm (metric) or inches (imperial)
   * @param height Height in cm (metric) or inches (imperial)
   * @param gender User's gender
   * @param unitSystem The unit system being used
   * @returns Estimated frame size
   */
  inferFrameSize(
    wristCircumference: number,
    height: number,
    gender: Gender,
    unitSystem: UnitSystem
  ): FrameSize {
    // Convert to metric if using imperial
    const wristInCm = unitSystem === UnitSystem.IMPERIAL ? wristCircumference * 2.54 : wristCircumference;
    const heightInCm = unitSystem === UnitSystem.IMPERIAL ? height * 2.54 : height;

    // Calculate height to wrist ratio
    const ratio = heightInCm / wristInCm;

    if (gender === Gender.MALE) {
      if (ratio > 10.4) return FrameSize.SMALL;
      if (ratio < 9.6) return FrameSize.LARGE;
      return FrameSize.MEDIUM;
    } else {
      if (ratio > 11.0) return FrameSize.SMALL;
      if (ratio < 10.1) return FrameSize.LARGE;
      return FrameSize.MEDIUM;
    }
  }

  /**
   * Estimates frame size when wrist measurement is not available
   * Based on BMI and body composition patterns
   *
   * @param weight Weight in kg (metric) or pounds (imperial)
   * @param height Height in cm (metric) or inches (imperial)
   * @param gender User's gender
   * @param unitSystem The unit system being used
   * @returns Estimated frame size
   */
  estimateFrameSizeFromBMI(
    weight: number,
    height: number,
    gender: Gender,
    unitSystem: UnitSystem
  ): FrameSize {
    // Calculate BMI using HealthMetricsService
    const bmi = this.healthMetricsService.calculateBMI(height, weight, unitSystem);

    // Adjust BMI interpretation based on gender
    const adjustedBMI = gender === Gender.MALE ? bmi : bmi + 1;

    // Estimate based on body composition patterns
    if (adjustedBMI < 21) {
      return FrameSize.SMALL;
    } else if (adjustedBMI > 25) {
      return FrameSize.LARGE;
    } else {
      return FrameSize.MEDIUM;
    }
  }

  /**
   * Gets the appropriate frame factor for weight calculations
   *
   * @param frameSize The frame size
   * @returns Factor to adjust calculations by
   */
  getFrameFactor(frameSize: FrameSize): number {
    return frameSize === FrameSize.SMALL ? 0.9 :
           frameSize === FrameSize.LARGE ? 1.1 : 1.0;
  }
}
