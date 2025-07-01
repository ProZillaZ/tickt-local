import { ImageConfigValidator } from '../../../src/validators/image-config.validator';
import { mockImageGenerationConfig, mockRecipeImageGenerationRequest } from '../../__mocks__/mock-config';
import { ImageProvider } from '../../../src/models';

describe('ImageConfigValidator', () => {
    describe('validateImageGenerationConfig', () => {
        it('should return no errors for valid config', () => {
            const errors = ImageConfigValidator.validateImageGenerationConfig(mockImageGenerationConfig);
            expect(errors).toHaveLength(0);
        });

        it('should return error for missing provider', () => {
            const config = { ...mockImageGenerationConfig, provider: undefined as any };
            const errors = ImageConfigValidator.validateImageGenerationConfig(config);
            expect(errors).toContain('Provider is required');
        });

        it('should return error for invalid provider', () => {
            const config = { ...mockImageGenerationConfig, provider: 'invalid-provider' as ImageProvider };
            const errors = ImageConfigValidator.validateImageGenerationConfig(config);
            expect(errors).toContain('Invalid provider: invalid-provider');
        });

        it('should return error for missing API key', () => {
            const config = { ...mockImageGenerationConfig, apiKey: '' };
            const errors = ImageConfigValidator.validateImageGenerationConfig(config);
            expect(errors).toContain('API key is required');
        });

        it('should return error for negative max retries', () => {
            const config = { ...mockImageGenerationConfig, maxRetries: -1 };
            const errors = ImageConfigValidator.validateImageGenerationConfig(config);
            expect(errors).toContain('Max retries must be non-negative');
        });
    });

    describe('validateRecipeImageGenerationRequest', () => {
        it('should return no errors for valid request', () => {
            const errors = ImageConfigValidator.validateRecipeImageGenerationRequest(mockRecipeImageGenerationRequest);
            expect(errors).toHaveLength(0);
        });

        it('should return error for missing recipe ID', () => {
            const request = { ...mockRecipeImageGenerationRequest, recipeId: '' };
            const errors = ImageConfigValidator.validateRecipeImageGenerationRequest(request);
            expect(errors).toContain('Recipe ID is required');
        });

        it('should return error for missing prompt', () => {
            const request = { ...mockRecipeImageGenerationRequest, prompt: '' };
            const errors = ImageConfigValidator.validateRecipeImageGenerationRequest(request);
            expect(errors).toContain('Prompt is required');
        });

        it('should return error for prompt too long', () => {
            const request = { ...mockRecipeImageGenerationRequest, prompt: 'a'.repeat(4001) };
            const errors = ImageConfigValidator.validateRecipeImageGenerationRequest(request);
            expect(errors).toContain('Prompt is too long (max 4000 characters)');
        });
    });

    describe('isValidImageGenerationConfig', () => {
        it('should return true for valid config', () => {
            const isValid = ImageConfigValidator.isValidImageGenerationConfig(mockImageGenerationConfig);
            expect(isValid).toBe(true);
        });

        it('should return false for invalid config', () => {
            const config = { ...mockImageGenerationConfig, apiKey: '' };
            const isValid = ImageConfigValidator.isValidImageGenerationConfig(config);
            expect(isValid).toBe(false);
        });
    });
});