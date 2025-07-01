import { UnitSystem } from '@tickt-engineering/types';

/**
 * Service for calculating various health metrics and indicators
 */
export class HealthMetricsService {
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
    if (unitSystem === UnitSystem.IMPERIAL) {
      // Imperial formula: BMI = (weight in pounds * 703) / (height in inches)²
      return Math.round((weight * 703) / (height * height) * 10) / 10;
    } else {
      // Metric formula: BMI = weight in kg / (height in m)²
      const heightInM = height / 100;
      return Math.round((weight / (heightInM * heightInM)) * 10) / 10;
    }
  }
} 