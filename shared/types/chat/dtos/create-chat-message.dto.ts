import { MessageType } from '../enums';

export interface CreateChatMessageDto {
	sessionId: string;
	participantId: string;
	type: MessageType;
	content: string;
	parentMessageId?: string;
	metadata?: Record<string, any>;
}