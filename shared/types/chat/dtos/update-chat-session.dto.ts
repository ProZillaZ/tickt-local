import { SessionStatus } from '../enums';

export interface UpdateChatSessionDto {
	title?: string;
	status?: SessionStatus;
	context?: Record<string, any>;
	metadata?: Record<string, any>;
}