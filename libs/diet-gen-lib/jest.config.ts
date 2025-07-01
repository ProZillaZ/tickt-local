import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/tests'], // Include both src and tests directories
    testMatch: ['**/?(*.)+(spec|test|tests).[tj]s?(x)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }]
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/index.ts',
        '!**/node_modules/**',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Use @ as an alias for src
        '^@tests/(.*)$': '<rootDir>/tests/$1', // Add an alias for tests directory
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: 'reports/junit',
            outputName: 'js-tests-results.xml',
        }],
    ],
    globals: {
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
}

export default config;