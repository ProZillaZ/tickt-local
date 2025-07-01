import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';
export type ValidationSchema = {
    [key: string]: {
        required?: boolean;
        type?: 'string' | 'number' | 'boolean' | 'array' | 'object';
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
        pattern?: RegExp;
    };
};
export declare const validateBody: <T extends {
    body: any;
} = Request>(schema: ValidationSchema) => (request: T, response: express.Response, next: (req: T, res: express.Response) => Promise<void>) => Promise<void>;
export declare const validateQuery: <T extends {
    query: any;
} = Request>(schema: ValidationSchema) => (request: T, response: express.Response, next: (req: T, res: express.Response) => Promise<void>) => Promise<void>;
//# sourceMappingURL=validation.middleware.d.ts.map