export interface LoggerInterface {
	log(message: string, context?: string): void;
	error(message: string, error?: any, context?: string): void;
	warn(message: string, context?: string): void;
}
