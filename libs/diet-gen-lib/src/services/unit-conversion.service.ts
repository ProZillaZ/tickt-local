import { UnitSystem } from '@tickt-engineering/types';

export class UnitConversionService {

    // Convert height from centimeters to feet and inches (returns an object with feet and inches)
    static convertCmToFeetInches(cm: number): { feet: number, inches: number } {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);
        return {feet, inches};
    }

    // Convert height from feet and inches to centimeters
    static convertFeetInchesToCm(feet: number, inches: number): number {
        return (feet * 12 + inches) * 2.54;
    }

    // Convert weight from kilograms to pounds
    static convertKgToLbs(kg: number): number {
        return kg * 2.20462;
    }

    // Convert weight from pounds to kilograms
    static convertLbsToKg(lbs: number): number {
        return lbs / 2.20462;
    }

    // Converts height based on the unit system
    static convertHeight(
      height: number | { feet: number; inches: number },
      fromSystem: UnitSystem,
      toSystem: UnitSystem
    ): number | { feet: number; inches: number } {
        if (fromSystem === toSystem) {
            return height;
        }

        if (fromSystem === UnitSystem.METRIC && toSystem === UnitSystem.IMPERIAL) {
            return this.convertCmToFeetInches(height as number);
        }

        if (fromSystem === UnitSystem.IMPERIAL && toSystem === UnitSystem.METRIC) {
            const { feet, inches } = height as { feet: number; inches: number };
            return this.convertFeetInchesToCm(feet, inches);
        }

        return height;
    }

    // Converts weight based on the unit system
    static convertWeight(weight: number, fromSystem: UnitSystem, toSystem: UnitSystem): number {
        if (fromSystem === toSystem) {
            return weight;
        }

        if (fromSystem === UnitSystem.METRIC && toSystem === UnitSystem.IMPERIAL) {
            return this.convertKgToLbs(weight);
        }

        if (fromSystem === UnitSystem.IMPERIAL && toSystem === UnitSystem.METRIC) {
            return this.convertLbsToKg(weight);
        }

        return weight;
    }
}
