import * as express from 'express';
import { PaginatedResponse } from '../types';
export declare class ResponseUtils {
    static success<T>(response: express.Response, data: T, message?: string): void;
    static created<T>(response: express.Response, data: T, message?: string): void;
    static paginated<T>(response: express.Response, paginatedData: PaginatedResponse<T>): void;
    static noContent(response: express.Response, message?: string): void;
    static badRequest(response: express.Response, message: string, details?: any): void;
    static unauthorized(response: express.Response, message?: string): void;
    static forbidden(response: express.Response, message?: string): void;
    static notFound(response: express.Response, message?: string): void;
    static conflict(response: express.Response, message: string): void;
    static unprocessableEntity(response: express.Response, message: string, details?: any): void;
    static internalError(response: express.Response, message?: string): void;
    static custom<T>(response: express.Response, statusCode: number, data?: T, error?: string, message?: string): void;
}
//# sourceMappingURL=response.utils.d.ts.map