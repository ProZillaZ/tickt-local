import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';
export interface AuthUser {
    uid: string;
    email?: string;
    emailVerified?: boolean;
    phoneNumber?: string;
    role?: string;
    customClaims?: Record<string, any>;
}
export interface AuthenticatedRequest extends Omit<Request, 'user'> {
    user?: AuthUser;
}
export declare const authMiddleware: (request: AuthenticatedRequest, response: express.Response, next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>) => Promise<void>;
export declare const optionalAuthMiddleware: (request: AuthenticatedRequest, response: express.Response, next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>) => Promise<void>;
export declare const requireRole: (allowedRoles: string[]) => (request: AuthenticatedRequest, response: express.Response, next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>) => Promise<void>;
export declare const requireEmailVerification: (request: AuthenticatedRequest, response: express.Response, next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>) => Promise<void>;
//# sourceMappingURL=auth.middleware.d.ts.map