import { UnitConversionService } from '../../../src/services/unit-conversion.service';
import { UnitSystem } from '@tickt-engineering/types';

describe('UnitConversionService', () => {

    describe('convertCmToFeetInches', () => {
        it('should correctly convert centimeters to feet and inches', () => {
            const result = UnitConversionService.convertCmToFeetInches(180);
            expect(result).toEqual({ feet: 5, inches: 11 });
        });

        it('should handle edge cases like exactly 1 meter', () => {
            const result = UnitConversionService.convertCmToFeetInches(100);
            expect(result).toEqual({ feet: 3, inches: 3 });
        });
    });

    describe('convertFeetInchesToCm', () => {
        it('should correctly convert feet and inches to centimeters', () => {
            const result = UnitConversionService.convertFeetInchesToCm(5, 11);
            expect(result).toBeCloseTo(180.34, 2);
        });

        it('should handle zero feet and inches', () => {
            const result = UnitConversionService.convertFeetInchesToCm(0, 0);
            expect(result).toBeCloseTo(0, 2);
        });
    });

    describe('convertKgToLbs', () => {
        it('should correctly convert kilograms to pounds', () => {
            const result = UnitConversionService.convertKgToLbs(70);
            expect(result).toBeCloseTo(154.32, 2);
        });

        it('should handle zero kilograms', () => {
            const result = UnitConversionService.convertKgToLbs(0);
            expect(result).toBeCloseTo(0, 2);
        });
    });

    describe('convertLbsToKg', () => {
        it('should correctly convert pounds to kilograms', () => {
            const result = UnitConversionService.convertLbsToKg(154.32);
            expect(result).toBeCloseTo(70, 2);
        });

        it('should handle zero pounds', () => {
            const result = UnitConversionService.convertLbsToKg(0);
            expect(result).toBeCloseTo(0, 2);
        });
    });

    describe('convertHeight', () => {
        it('should convert height from metric to imperial correctly', () => {
            const result = UnitConversionService.convertHeight(180, UnitSystem.METRIC, UnitSystem.IMPERIAL);
            expect(result).toEqual({ feet: 5, inches: 11 });
        });

        it('should convert height from imperial to metric correctly', () => {
            const result = UnitConversionService.convertHeight({
                feet: 5,
                inches: 11,
            }, UnitSystem.IMPERIAL, UnitSystem.METRIC);
            expect(result).toBeCloseTo(180.34, 2);
        });

        it('should return height unchanged when the unit systems are the same', () => {
            const resultMetric = UnitConversionService.convertHeight(180, UnitSystem.METRIC, UnitSystem.METRIC);
            expect(resultMetric).toBe(180);

            const resultImperial = UnitConversionService.convertHeight({
                feet: 5,
                inches: 11,
            }, UnitSystem.IMPERIAL, UnitSystem.IMPERIAL);
            expect(resultImperial).toEqual({ feet: 5, inches: 11 });
        });
    });

    describe('convertWeight', () => {
        it('should convert weight from metric to imperial correctly', () => {
            const result = UnitConversionService.convertWeight(70, UnitSystem.METRIC, UnitSystem.IMPERIAL);
            expect(result).toBeCloseTo(154.32, 2);
        });

        it('should convert weight from imperial to metric correctly', () => {
            const result = UnitConversionService.convertWeight(154.32, UnitSystem.IMPERIAL, UnitSystem.METRIC);
            expect(result).toBeCloseTo(70, 2);
        });

        it('should return weight unchanged when the unit systems are the same', () => {
            const resultMetric = UnitConversionService.convertWeight(70, UnitSystem.METRIC, UnitSystem.METRIC);
            expect(resultMetric).toBe(70);

            const resultImperial = UnitConversionService.convertWeight(154.32, UnitSystem.IMPERIAL, UnitSystem.IMPERIAL);
            expect(resultImperial).toBeCloseTo(154.32, 2);
        });
    });

});
