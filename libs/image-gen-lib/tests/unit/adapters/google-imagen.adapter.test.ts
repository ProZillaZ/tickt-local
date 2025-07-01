import { GoogleImagenAdapter } from '../../../src/adapters/google-imagen.adapter';
import { mockGoogleImagenConfig } from '../../__mocks__/mock-config';
import { ImageProvider, ImageQuality, ImageSize, ImageStyle } from '../../../src/models';

// Import the mocked generate function
const mockGenerate = jest.requireMock('@genkit-ai/ai').generate;

describe('GoogleImagenAdapter', () => {
    let adapter: GoogleImagenAdapter;

    beforeEach(() => {
        adapter = new GoogleImagenAdapter();
        jest.clearAllMocks();
    });

    describe('generateImage', () => {
        it('should generate image successfully', async () => {
            const mockResponse = {
                media: {
                    url: 'https://example.com/test-image.png',
                    contentType: 'image/png'
                },
                candidates: [],
                usage: {},
                custom: {},
                output: null,
                request: {},
                response: {}
            };

            mockGenerate.mockResolvedValue(mockResponse as any);

            const result = await adapter.generateImage(
                'A delicious pasta dish',
                mockGoogleImagenConfig
            );

            expect(result).toEqual({
                imageUrl: 'https://example.com/test-image.png',
                revisedPrompt: 'A delicious pasta dish',
                provider: ImageProvider.GOOGLE_IMAGEN,
                model: 'imagen-3.0-generate-002',
                metadata: {
                    quality: ImageQuality.HD,
                    size: ImageSize.SQUARE_1024,
                    style: ImageStyle.NATURAL,
                    aspectRatio: '1:1',
                    guidanceScale: 60,
                },
                generatedAt: expect.any(Date),
            });

            expect(mockGenerate).toHaveBeenCalledWith({
                model: 'imagen3-model',
                output: { format: 'media' },
                prompt: 'A delicious pasta dish',
                config: {
                    aspectRatio: '1:1',
                    seed: expect.any(Number),
                    guidanceScale: 60,
                },
            });
        });

        it('should handle base64 data response', async () => {
            const mockResponse = {
                media: {
                    data: 'base64encodeddata',
                    contentType: 'image/png'
                }
            };

            mockGenerate.mockResolvedValue(mockResponse);

            const result = await adapter.generateImage(
                'A delicious pasta dish',
                mockGoogleImagenConfig
            );

            expect(result.imageUrl).toBe('data:image/png;base64,base64encodeddata');
        });

        it('should throw error when no image data returned', async () => {
            mockGenerate.mockResolvedValue({ media: null });

            await expect(
                adapter.generateImage('test prompt', mockGoogleImagenConfig)
            ).rejects.toThrow('No image data returned from Google Imagen');
        });

        it('should throw error when generation fails', async () => {
            mockGenerate.mockRejectedValue(new Error('API error'));

            await expect(
                adapter.generateImage('test prompt', mockGoogleImagenConfig)
            ).rejects.toThrow('Google Imagen image generation failed: Error: API error');
        });
    });

    describe('validateConfig', () => {
        it('should return true for valid config', () => {
            const isValid = adapter.validateConfig(mockGoogleImagenConfig);
            expect(isValid).toBe(true);
        });

        it('should return false for wrong provider', () => {
            const config = { ...mockGoogleImagenConfig, provider: ImageProvider.OPENAI_DALLE };
            const isValid = adapter.validateConfig(config);
            expect(isValid).toBe(false);
        });

        it('should return false for missing Firebase project', () => {
            const originalProject = process.env.FIREBASE_PROJECT_ID;
            delete process.env.FIREBASE_PROJECT_ID;
            
            const isValid = adapter.validateConfig(mockGoogleImagenConfig);
            expect(isValid).toBe(false);
            
            // Restore
            if (originalProject) process.env.FIREBASE_PROJECT_ID = originalProject;
        });

        it('should return false for invalid quality', () => {
            const config = { ...mockGoogleImagenConfig, quality: 'invalid' as ImageQuality };
            const isValid = adapter.validateConfig(config);
            expect(isValid).toBe(false);
        });
    });

    describe('getProviderName', () => {
        it('should return correct provider name', () => {
            expect(adapter.getProviderName()).toBe(ImageProvider.GOOGLE_IMAGEN);
        });
    });

    describe('mapSizeToAspectRatio', () => {
        it('should map sizes correctly', async () => {
            const testCases = [
                { size: ImageSize.SQUARE_1024, expected: '1:1' },
                { size: ImageSize.LANDSCAPE_1792_1024, expected: '16:9' },
                { size: ImageSize.PORTRAIT_1024_1792, expected: '9:16' },
            ];

            for (const { size, expected } of testCases) {
                const config = { ...mockGoogleImagenConfig, size };
                const mockResponse = { media: { url: 'test.png' } };
                mockGenerate.mockResolvedValue(mockResponse);
                
                await adapter.generateImage('test', config);
                
                const lastCall = mockGenerate.mock.calls[mockGenerate.mock.calls.length - 1];
                expect(lastCall[0].config.aspectRatio).toBe(expected);
            }
        });
    });

    describe('mapStyleToGuidanceScale', () => {
        it('should map styles to guidance scale correctly', async () => {
            const testCases = [
                { style: ImageStyle.VIVID, expected: 100 },
                { style: ImageStyle.NATURAL, expected: 60 },
            ];

            for (const { style, expected } of testCases) {
                const config = { ...mockGoogleImagenConfig, style };
                const mockResponse = { media: { url: 'test.png' } };
                mockGenerate.mockResolvedValue(mockResponse);
                
                await adapter.generateImage('test', config);
                
                const lastCall = mockGenerate.mock.calls[mockGenerate.mock.calls.length - 1];
                expect(lastCall[0].config.guidanceScale).toBe(expected);
            }
        });
    });
});