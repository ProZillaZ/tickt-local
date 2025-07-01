import { SessionStatus } from '../enums';

export interface CreateChatSessionDto {
	title: string;
	userId: string;
	status?: SessionStatus;
	context?: Record<string, any>;
	metadata?: Record<string, any>;
}