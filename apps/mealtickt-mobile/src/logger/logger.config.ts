// config/logging.ts
import { configLoggerType, consoleTransport } from 'react-native-logs';
import crashlytics from '@react-native-firebase/crashlytics';

export interface LogLevel {
	severity: number;
	text: string;
}

export interface LogEntry {
	level: LogLevel;
	msg: string;
	rawMsg: (string | any)[];
}

export interface LoggingConfig extends configLoggerType<any, any> {
	severity: string;
	transport: Array<any>;
	transportOptions: {
		colors: {
			[key: string]: string;
		};
	};
}

// Firebase transport function
const firebaseTransport = {
	log: (log: LogEntry): void => {
		// Only send warn and error levels to Firebase (severity >= 2)
		if (log.level.severity >= 2) {
			const logMessage = `${log.level.text}: ${log.msg}`;
			crashlytics().log(logMessage);

			// Record as error for error level (severity >= 3)
			if (log.level.severity >= 3) {
				crashlytics().recordError(new Error(log.msg));
			}
		}
	},
};

export const getLoggingConfig = (): LoggingConfig => {
	const baseConfig: Partial<LoggingConfig> = {
		transportOptions: {
			colors: {
				debug: 'greenBright',
				info: 'blueBright',
				warn: 'yellowBright',
				error: 'redBright',
			},
		},
	};

	if (__DEV__) {
		// Development configuration
		return {
			...baseConfig,
			severity: 'debug',
			transport: [consoleTransport],
		} as LoggingConfig;
	}

	// Production configuration
	return {
		...baseConfig,
		severity: 'warn', // Only log warnings and errors in production
		transport: [consoleTransport, firebaseTransport],
	} as LoggingConfig;
};
