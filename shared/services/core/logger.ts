import { ILogger, LogLevel } from '../interfaces';

export class Logger implements ILogger {
	private level: LogLevel = LogLevel.INFO;
	private readonly context?: string;

	constructor(context?: string) {
		this.context = context;
	}

	setLevel(level: LogLevel): void {
		this.level = level;
	}

	debug(message: string, ...args: any[]): void {
		if (this.level <= LogLevel.DEBUG) {
			this.log('DEBUG', message, ...args);
		}
	}

	info(message: string, ...args: any[]): void {
		if (this.level <= LogLevel.INFO) {
			this.log('INFO', message, ...args);
		}
	}

	warn(message: string, ...args: any[]): void {
		if (this.level <= LogLevel.WARN) {
			this.log('WARN', message, ...args);
		}
	}

	error(message: string, error?: Error, ...args: any[]): void {
		if (this.level <= LogLevel.ERROR) {
			this.log('ERROR', message, error, ...args);
		}
	}

	private log(level: string, message: string, ...args: any[]): void {
		const timestamp = new Date().toISOString();
		const contextStr = this.context ? `[${this.context}] ` : '';
		const logMessage = `${timestamp} [${level}] ${contextStr}${message}`;

		switch (level) {
			case 'DEBUG':
				console.log(logMessage, ...args);
				break;
			case 'INFO':
				console.info(logMessage, ...args);
				break;
			case 'WARN':
				console.warn(logMessage, ...args);
				break;
			case 'ERROR':
				console.error(logMessage, ...args);
				break;
			default:
				console.log(logMessage, ...args);
		}
	}
}
