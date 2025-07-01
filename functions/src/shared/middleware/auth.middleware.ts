import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';
import { getAuth, Auth, DecodedIdToken } from 'firebase-admin/auth';

interface AuthError {
	code: string;
	message: string;
}

export interface AuthUser {
	uid: string;
	email?: string;
	emailVerified?: boolean;
	phoneNumber?: string;
	role?: string;
	customClaims?: Record<string, any>;
}

// Create a Firebase Functions Request that has our AuthUser instead of the default user property
export interface AuthenticatedRequest extends Omit<Request, 'user'> {
	user?: AuthUser;
}

const auth: Auth = getAuth();

export const authMiddleware = async (
	request: AuthenticatedRequest,
	response: express.Response,
	next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>,
): Promise<void> => {
	try {
		const authHeader = request.headers.authorization;

		if (!authHeader?.startsWith('Bearer ')) {
			response.status(401).json({
				success: false,
				error: 'Missing or invalid authorization header',
				code: 'MISSING_AUTH_HEADER',
			});
			return;
		}

		const token = authHeader.split('Bearer ')[1];

		if (!token || token.trim() === '') {
			response.status(401).json({
				success: false,
				error: 'Invalid authorization token',
				code: 'INVALID_TOKEN',
			});
			return;
		}

		const decodedToken: DecodedIdToken = await auth.verifyIdToken(token, true);

		// Check if token is expired
		const now = Math.floor(Date.now() / 1000);
		if (decodedToken.exp < now) {
			response.status(401).json({
				success: false,
				error: 'Token has expired',
				code: 'TOKEN_EXPIRED',
			});
			return;
		}

		// Attach user to request with enhanced data
		request.user = {
			uid: decodedToken.uid,
			email: decodedToken.email,
			emailVerified: decodedToken.email_verified,
			phoneNumber: decodedToken.phone_number,
			role: decodedToken.role || decodedToken.admin === true ? 'admin' : 'user',
			customClaims: decodedToken,
		} as AuthUser;

		await next(request, response);
	} catch (error: any) {
		console.error('Authentication error:', {
			error: error.message,
			code: error.code,
			stack: error.stack,
		});

		// Handle specific Firebase Auth errors
		let statusCode = 401;
		let errorMessage = 'Authentication failed';
		let errorCode = 'AUTH_ERROR';

		if (error.code) {
			switch (error.code) {
				case 'auth/id-token-expired':
					errorMessage = 'Token has expired';
					errorCode = 'TOKEN_EXPIRED';
					break;
				case 'auth/id-token-revoked':
					errorMessage = 'Token has been revoked';
					errorCode = 'TOKEN_REVOKED';
					break;
				case 'auth/invalid-id-token':
					errorMessage = 'Invalid token format';
					errorCode = 'INVALID_TOKEN_FORMAT';
					break;
				case 'auth/user-disabled':
					errorMessage = 'User account has been disabled';
					errorCode = 'USER_DISABLED';
					statusCode = 403;
					break;
				case 'auth/user-not-found':
					errorMessage = 'User not found';
					errorCode = 'USER_NOT_FOUND';
					statusCode = 404;
					break;
				default:
					errorMessage = 'Invalid or expired token';
					errorCode = 'INVALID_TOKEN';
			}
		}

		response.status(statusCode).json({
			success: false,
			error: errorMessage,
			code: errorCode,
		});
	}
};

export const optionalAuthMiddleware = async (
	request: AuthenticatedRequest,
	response: express.Response,
	next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>,
): Promise<void> => {
	try {
		const authHeader = request.headers.authorization;

		if (authHeader?.startsWith('Bearer ')) {
			const token = authHeader.split('Bearer ')[1];

			if (token && token.trim() !== '') {
				try {
					const decodedToken: DecodedIdToken = await auth.verifyIdToken(token, true);

					// Check if token is not expired
					const now = Math.floor(Date.now() / 1000);
					if (decodedToken.exp >= now) {
						request.user = {
							uid: decodedToken.uid,
							email: decodedToken.email,
							emailVerified: decodedToken.email_verified,
							phoneNumber: decodedToken.phone_number,
							role: decodedToken.role || decodedToken.admin === true ? 'admin' : 'user',
							customClaims: decodedToken,
						} as AuthUser;
					}
				} catch (tokenError: any) {
					// Log the error but continue without authentication
					console.warn('Optional auth failed (continuing without auth):', {
						error: tokenError.message,
						code: tokenError.code,
					});
				}
			}
		}

		await next(request, response);
	} catch (error: any) {
		// Optional auth - log error but continue without user
		console.warn('Optional auth middleware error (continuing without auth):', {
			error: error.message,
			code: error.code,
		});
		await next(request, response);
	}
};

export const requireRole = (allowedRoles: string[]) => {
	return async (
		request: AuthenticatedRequest,
		response: express.Response,
		next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>,
	): Promise<void> => {
		if (!request.user) {
			response.status(401).json({
				success: false,
				error: 'Authentication required',
				code: 'AUTH_REQUIRED',
			});
			return;
		}

		const userRole = request.user.role || 'user';

		if (!allowedRoles.includes(userRole)) {
			response.status(403).json({
				success: false,
				error: 'Insufficient permissions',
				code: 'INSUFFICIENT_PERMISSIONS',
				details: {
					required: allowedRoles,
					current: userRole,
				},
			});
			return;
		}

		await next(request, response);
	};
};

export const requireEmailVerification = async (
	request: AuthenticatedRequest,
	response: express.Response,
	next: (req: AuthenticatedRequest, res: express.Response) => Promise<void>,
): Promise<void> => {
	if (!request.user) {
		response.status(401).json({
			success: false,
			error: 'Authentication required',
			code: 'AUTH_REQUIRED',
		});
		return;
	}

	if (!request.user.emailVerified) {
		response.status(403).json({
			success: false,
			error: 'Email verification required',
			code: 'EMAIL_NOT_VERIFIED',
		});
		return;
	}

	await next(request, response);
};
