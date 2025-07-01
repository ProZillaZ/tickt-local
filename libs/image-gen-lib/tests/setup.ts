// Jest setup file for image-gen-lib tests

// Set up environment variables for testing
process.env.FIREBASE_PROJECT_ID = 'test-project';
process.env.FIREBASE_REGION = 'us-central1';

// Mock Firebase Admin SDK
jest.mock('firebase-admin/storage', () => ({
    getStorage: jest.fn(() => ({
        bucket: jest.fn(() => ({
            file: jest.fn(),
            name: 'test-bucket'
        }))
    })),
    getDownloadURL: jest.fn()
}));

// Mock OpenAI
jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => ({
        images: {
            generate: jest.fn()
        }
    }));
});

// Mock GenKit
jest.mock('@genkit-ai/core', () => ({
    configureGenkit: jest.fn(),
}));

jest.mock('@genkit-ai/ai', () => ({
    generate: jest.fn().mockResolvedValue({
        media: { url: 'https://example.com/mock-image.png' }
    }),
}));

jest.mock('@genkit-ai/vertexai', () => ({
    vertexAI: jest.fn(),
    imagen3: 'imagen3-model',
}));

// Global test timeout
jest.setTimeout(30000);