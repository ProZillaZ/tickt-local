import { MessageType } from '../enums';

export interface ChatMessageFilter {
	sessionId?: string;
	participantId?: string;
	type?: MessageType | MessageType[];
	contentContains?: string;
	isReply?: boolean;
	parentMessageId?: string;
	hasReactions?: boolean;
	timestampAfter?: Date;
	timestampBefore?: Date;
	isEdited?: boolean;
	metadataKey?: string;
	limit?: number;
	offset?: number;
	sortBy?: 'timestamp' | 'type';
	sortOrder?: 'asc' | 'desc';
}