// logger.ts
import { logger } from 'react-native-logs';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import { getLoggingConfig } from './logger.config';

const log = logger.createLogger(getLoggingConfig());

export interface LogExtra {
	[key: string]: any;
}

export interface UserAttributes {
	email?: string;
	createdAt?: string;
	plan?: string;

	[key: string]: string | undefined;
}

class AppLogger {
	static debug(message: string, extra: LogExtra = {}): void {
		log.debug(message, extra);
	}

	static info(message: string, extra: LogExtra = {}): void {
		log.info(message, extra);
	}

	static warn(message: string, extra: LogExtra = {}): void {
		log.warn(message, extra);
	}

	static error(message: string, error?: Error | null, extra: LogExtra = {}): void {
		log.error(message, extra);

		if (error) {
			crashlytics().recordError(error);
		} else {
			crashlytics().recordError(new Error(message));
		}
	}

	/**
	 * Set user ID for crash reporting
	 */
	static async setUserId(userId: string): Promise<void> {
		await crashlytics().setUserId(userId);
		this.debug('User ID set for logging', { userId });
	}

	/**
	 * Set user attributes for crash reporting
	 */
	static async setUserAttributes(attributes: UserAttributes): Promise<void> {
		await Promise.all(
			Object.entries(attributes).map(async ([key, value]) => {
				if (value !== undefined) {
					await crashlytics().setAttribute(key, value);
				}
			}),
		);
		this.debug('User attributes set', attributes);
	}

	static trackNavigation(screenName: string, params?: LogExtra): void {
		this.info(`Navigation: ${screenName}`, {
			screen: screenName,
			params,
		});

		// Send to Firebase Analytics
		analytics().logScreenView({
			screen_name: screenName,
			screen_class: screenName,
		}).catch(error => this.error('Failed to log screen view', error));
	}

	static trackUserAction(action: string, extra: LogExtra = {}): void {
		this.info(`User Action: ${action}`, {
			action,
			timestamp: Date.now(),
			...extra,
		});

		analytics().logEvent('user_action', {
			action_name: action,
			...extra,
		}).catch(error => this.error('Failed to log user action', error));
	}

	static trackApiCall(endpoint: string, method: string, extra: LogExtra = {}): void {
		this.debug(`API Call: ${method} ${endpoint}`, {
			endpoint,
			method,
			...extra,
		});
	}

	static trackApiError(
		endpoint: string,
		method: string,
		error: Error,
		extra: LogExtra = {},
	): void {
		this.error(`API Error: ${method} ${endpoint} - ${error.message}`, error, {
			endpoint,
			method,
			...extra,
		});
	}

	static trackPerformance(operation: string, duration: number, extra: LogExtra = {}): void {
		this.info(`Performance: ${operation}`, {
			operation,
			duration,
			...extra,
		});

		analytics().logEvent('performance_metric', {
			operation_name: operation,
			duration_ms: duration,
			...extra,
		}).catch(error => this.error('Failed to log performance metric', error));
	}

	/**
	 * Track custom events for Analytics
	 */
	static trackEvent(eventName: string, parameters: LogExtra = {}): void {
		this.info(`Event: ${eventName}`, parameters);
		analytics().logEvent(eventName, parameters).catch(error => this.error('Failed to log event', error));
	}

	static trackFoodLog(foodName: string, extra: LogExtra = {}): void {
		const eventData = {
			food_name: foodName,
			...extra,
		};

		this.info('Food logged', eventData);
		analytics().logEvent('log_food', eventData).catch(error => this.error('Failed to log food event', error));
	}

	static trackWeightLog(weight: number, unit: string, extra: LogExtra = {}): void {
		const eventData = {
			weight,
			unit,
			timestamp: Date.now(),
			...extra,
		};

		this.info('Weight logged', eventData);
		analytics().logEvent('log_weight', eventData).catch(error => this.error('Failed to log weight event', error));
	}

	static trackMealPlan(planType: string, extra: LogExtra = {}): void {
		const eventData = {
			plan_type: planType,
			...extra,
		};

		this.info('Meal plan created', eventData);
		analytics().logEvent('create_meal_plan', eventData).catch(error => this.error('Failed to log meal plan event', error));
	}
}

export default AppLogger;
