import { PromptBuilderService, RecipePromptOptions } from '../../../src/services/prompt-builder.service';
import { RecipeStyle, RecipeSetting, RecipeLighting, RecipePlating } from '../../../src/models';

describe('PromptBuilderService', () => {
    let service: PromptBuilderService;

    beforeEach(() => {
        service = new PromptBuilderService();
    });

    describe('buildRecipeImagePrompt', () => {
        it('should build a basic prompt with recipe name', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Chocolate Cake'
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('Chocolate Cake');
            expect(prompt).toContain('photorealistic');
            expect(prompt).toContain('high-quality');
        });

        it('should include description when provided', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Chocolate Cake',
                description: 'rich and moist'
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('rich and moist');
        });

        it('should include cuisine when provided', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Pasta Carbonara',
                cuisine: 'Italian'
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('Italian cuisine style');
        });

        it('should include main ingredients', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Caesar Salad',
                ingredients: ['romaine lettuce', 'parmesan cheese', 'croutons', 'caesar dressing']
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('featuring romaine lettuce, parmesan cheese, croutons');
        });

        it('should apply professional style correctly', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Steak',
                style: RecipeStyle.PROFESSIONAL
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('professionally photographed food styling');
        });

        it('should apply rustic style correctly', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Soup',
                style: RecipeStyle.RUSTIC
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('rustic, homestyle presentation');
        });

        it('should apply kitchen setting correctly', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Bread',
                setting: RecipeSetting.KITCHEN
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('cozy kitchen setting');
        });

        it('should include technical photography terms', () => {
            const options: RecipePromptOptions = {
                recipeName: 'Salad'
            };

            const prompt = service.buildRecipeImagePrompt(options);
            
            expect(prompt).toContain('professional camera');
            expect(prompt).toContain('shallow depth of field');
            expect(prompt).toContain('food photography');
        });
    });

    describe('buildSimplePrompt', () => {
        it('should build a simple prompt with default settings', () => {
            const prompt = service.buildSimplePrompt('Pizza');
            
            expect(prompt).toContain('Pizza');
            expect(prompt).toContain('professionally photographed');
            expect(prompt).toContain('studio background');
            expect(prompt).toContain('natural window lighting');
            expect(prompt).toContain('elegantly plated');
        });

        it('should include description in simple prompt', () => {
            const prompt = service.buildSimplePrompt('Burger', 'juicy and loaded');
            
            expect(prompt).toContain('Burger');
            expect(prompt).toContain('juicy and loaded');
        });
    });
});