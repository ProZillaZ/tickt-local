import cors from 'cors';
import { Request } from 'firebase-functions/v2/https';
import * as express from 'express';

const corsOptions = {
	origin: [
		'http://localhost:3000',
		'http://localhost:19006', // Expo dev
		'https://mealtickt.com',
		'https://app.mealtickt.com',
	],
	credentials: true,
	optionsSuccessStatus: 200,
};

const corsHandler = cors(corsOptions);

export const corsMiddleware = (
	request: Request,
	response: express.Response,
	next: () => Promise<void>,
): Promise<void> => {
	return new Promise((resolve, reject) => {
		corsHandler(request as any, response as any, async (error?: any) => {
			if (error) {
				reject(error);
				return;
			}

			try {
				await next();
				resolve();
			} catch (err) {
				reject(err);
			}
		});
	});
};
