import { SessionStatus, MessageType, ParticipantType } from '../enums';

export interface ChatSessionFilter {
	userId?: string;
	status?: SessionStatus | SessionStatus[];
	participantId?: string;
	participantType?: ParticipantType;
	hasMessages?: boolean;
	messageType?: MessageType;
	createdAfter?: Date;
	createdBefore?: Date;
	updatedAfter?: Date;
	updatedBefore?: Date;
	lastActivityAfter?: Date;
	lastActivityBefore?: Date;
	titleContains?: string;
	contextKey?: string;
	metadataKey?: string;
	limit?: number;
	offset?: number;
	sortBy?: 'createdAt' | 'updatedAt' | 'lastActivityAt' | 'title';
	sortOrder?: 'asc' | 'desc';
}