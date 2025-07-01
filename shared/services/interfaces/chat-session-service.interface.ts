import {
	ChatSession,
	ChatMessage,
	CreateChatSessionDto,
	UpdateChatSessionDto,
	CreateChatMessageDto,
	CreateChatParticipantDto,
	ChatSessionFilter,
} from '@tickt-engineering/types';

export interface IChatSessionService {
	createSession(createDto: CreateChatSessionDto): Promise<ChatSession>;

	getSessionById(userId: string, sessionId: string): Promise<ChatSession | null>;

	getUserSessions(userId: string, filter?: ChatSessionFilter): Promise<ChatSession[]>;

	updateSession(userId: string, sessionId: string, updateDto: UpdateChatSessionDto): Promise<ChatSession | null>;

	deleteSession(userId: string, sessionId: string): Promise<boolean>;

	addParticipantToSession(userId: string, sessionId: string, participantDto: CreateChatParticipantDto): Promise<ChatSession | null>;

	removeParticipantFromSession(userId: string, sessionId: string, participantId: string): Promise<ChatSession | null>;

	addMessageToSession(userId: string, messageDto: CreateChatMessageDto): Promise<ChatMessage | null>;

	getSessionMessages(userId: string, sessionId: string, limit?: number): Promise<ChatMessage[]>;

	archiveSession(userId: string, sessionId: string): Promise<ChatSession | null>;

	activateSession(userId: string, sessionId: string): Promise<ChatSession | null>;

	getSessionCount(userId: string): Promise<number>;
}
