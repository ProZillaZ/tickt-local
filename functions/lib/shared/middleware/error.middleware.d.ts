import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code?: string;
    readonly details?: any;
    readonly isOperational: boolean;
    constructor(statusCode: number, message: string, code?: string, details?: any, isOperational?: boolean);
}
export declare class ValidationError extends AppError {
    constructor(message: string, details?: any);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string, code?: string);
}
export declare class AuthorizationError extends AppError {
    constructor(message?: string, details?: any);
}
export declare class NotFoundError extends AppError {
    constructor(resource?: string);
}
export declare class ConflictError extends AppError {
    constructor(message: string, details?: any);
}
export declare const errorHandler: (error: any, request: Request, response: express.Response) => void;
export declare const asyncHandler: <T = Request>(fn: (req: T, res: express.Response) => Promise<void>) => (request: T, response: express.Response) => Promise<void>;
export declare const notFoundHandler: (request: Request, response: express.Response) => void;
//# sourceMappingURL=error.middleware.d.ts.map