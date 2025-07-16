import {
	ChatSession,
	ChatMessage,
	ChatParticipant,
	CreateChatSessionDto,
	UpdateChatSessionDto,
	CreateChatMessageDto,
	CreateChatParticipantDto,
	ChatSessionFilter,
	SessionStatus,
} from '@tickt-ltd/types';
import { IDatabaseAdapter, IChatSessionService, DEFAULT_DATABASE_CONFIG } from '../interfaces';

export class FirestoreChatSessionService implements IChatSessionService {
	private collectionName = DEFAULT_DATABASE_CONFIG.collections.chatSessions;

	protected constructor(private db: IDatabaseAdapter) {
	}

	public static create(db: IDatabaseAdapter): FirestoreChatSessionService {
		return new FirestoreChatSessionService(db);
	}

	private getUserCollectionPath(userId: string): string {
		return `${this.collectionName}/${userId}`;
	}

	public async createSession(createDto: CreateChatSessionDto): Promise<ChatSession> {
		const sessionId = this.generateId();
		const session = new ChatSession(
			sessionId,
			createDto.userId,
			createDto.title,
			createDto.status,
			new Date(),
			createDto.context,
			createDto.metadata,
		);

		const userCollectionPath = this.getUserCollectionPath(createDto.userId);
		await this.db.create(userCollectionPath, session.toJSON(), sessionId);

		return session;
	}

	public async getSessionById(userId: string, sessionId: string): Promise<ChatSession | null> {
		const userCollectionPath = this.getUserCollectionPath(userId);
		const doc = await this.db.get(userCollectionPath, sessionId);

		if (!doc?.exists) {
			return null;
		}

		return ChatSession.fromJSON(doc.data);
	}

	public async getUserSessions(userId: string, filter?: ChatSessionFilter): Promise<ChatSession[]> {
		const userCollectionPath = this.getUserCollectionPath(userId);

		let queryOptions: any = {
			orderBy: [{ field: 'createdAt', direction: 'desc' }]
		};

		const queryResult = await this.db.query(userCollectionPath, queryOptions);
		let sessions = queryResult.docs.map(doc => ChatSession.fromJSON(doc.data));

		if (filter) {
			sessions = this.applySessionFilter(sessions, filter);
		}

		return sessions;
	}

	public async updateSession(userId: string, sessionId: string, updateDto: UpdateChatSessionDto): Promise<ChatSession | null> {
		const session = await this.getSessionById(userId, sessionId);
		if (!session) {
			return null;
		}

		if (updateDto.title !== undefined) session.updateTitle(updateDto.title);
		if (updateDto.status !== undefined) session.updateStatus(updateDto.status);
		if (updateDto.context !== undefined) session.setContext(updateDto.context);
		if (updateDto.metadata !== undefined) session.setMetadata(updateDto.metadata);

		const userCollectionPath = this.getUserCollectionPath(userId);
		await this.db.update(userCollectionPath, sessionId, session.toJSON());

		return session;
	}

	public async deleteSession(userId: string, sessionId: string): Promise<boolean> {
		const session = await this.getSessionById(userId, sessionId);
		if (!session) {
			return false;
		}

		const userCollectionPath = this.getUserCollectionPath(userId);
		await this.db.delete(userCollectionPath, sessionId);
		return true;
	}

	public async addParticipantToSession(userId: string, sessionId: string, participantDto: CreateChatParticipantDto): Promise<ChatSession | null> {
		const session = await this.getSessionById(userId, sessionId);
		if (!session) {
			return null;
		}

		const participant = new ChatParticipant(
			participantDto.id,
			participantDto.type,
			participantDto.name,
			false,
			new Date(),
			participantDto.avatarUrl,
			participantDto.metadata,
		);

		session.addParticipant(participant);

		const userCollectionPath = this.getUserCollectionPath(userId);
		await this.db.update(userCollectionPath, sessionId, session.toJSON());

		return session;
	}

	public async removeParticipantFromSession(userId: string, sessionId: string, participantId: string): Promise<ChatSession | null> {
		const session = await this.getSessionById(userId, sessionId);
		if (!session) {
			return null;
		}

		session.removeParticipant(participantId);

		const userCollectionPath = this.getUserCollectionPath(userId);
		await this.db.update(userCollectionPath, sessionId, session.toJSON());

		return session;
	}

	public async addMessageToSession(userId: string, messageDto: CreateChatMessageDto): Promise<ChatMessage | null> {
		const session = await this.getSessionById(userId, messageDto.sessionId);
		if (!session) {
			return null;
		}

		const messageId = this.generateId();
		const message = new ChatMessage(
			messageId,
			messageDto.sessionId,
			messageDto.participantId,
			messageDto.type,
			messageDto.content,
			new Date(),
			messageDto.parentMessageId,
			messageDto.metadata,
		);

		session.addMessage(message);

		const userCollectionPath = this.getUserCollectionPath(userId);
		await this.db.update(userCollectionPath, messageDto.sessionId, session.toJSON());

		return message;
	}

	public async getSessionMessages(userId: string, sessionId: string, limit?: number): Promise<ChatMessage[]> {
		const session = await this.getSessionById(userId, sessionId);
		if (!session) {
			return [];
		}

		let messages = session.messages;
		if (limit) {
			messages = messages.slice(-limit);
		}

		return messages;
	}

	public async archiveSession(userId: string, sessionId: string): Promise<ChatSession | null> {
		return this.updateSession(userId, sessionId, { status: SessionStatus.ARCHIVED });
	}

	public async activateSession(userId: string, sessionId: string): Promise<ChatSession | null> {
		return this.updateSession(userId, sessionId, { status: SessionStatus.ACTIVE });
	}

	public async getSessionCount(userId: string): Promise<number> {
		const userCollectionPath = this.getUserCollectionPath(userId);
		const queryResult = await this.db.query(userCollectionPath, { limit: 1000 });
		return queryResult.docs.length;
	}

	private generateId(): string {
		return Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
	}

	private applySessionFilter(sessions: ChatSession[], filter: ChatSessionFilter): ChatSession[] {
		let filtered = sessions;

		if (filter.status) {
			const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
			filtered = filtered.filter(session => statuses.includes(session.status));
		}

		if (filter.participantId) {
			filtered = filtered.filter(session =>
				session.participants.some(p => p.id === filter.participantId),
			);
		}

		if (filter.participantType) {
			filtered = filtered.filter(session =>
				session.participants.some(p => p.type === filter.participantType),
			);
		}

		if (filter.hasMessages !== undefined) {
			filtered = filtered.filter(session =>
				filter.hasMessages ? session.messages.length > 0 : session.messages.length === 0,
			);
		}

		if (filter.messageType) {
			filtered = filtered.filter(session =>
				session.messages.some(m => m.type === filter.messageType),
			);
		}

		if (filter.createdAfter) {
			filtered = filtered.filter(session => session.createdAt >= filter.createdAfter!);
		}

		if (filter.createdBefore) {
			filtered = filtered.filter(session => session.createdAt <= filter.createdBefore!);
		}

		if (filter.updatedAfter) {
			filtered = filtered.filter(session => session.updatedAt >= filter.updatedAfter!);
		}

		if (filter.updatedBefore) {
			filtered = filtered.filter(session => session.updatedAt <= filter.updatedBefore!);
		}

		if (filter.lastActivityAfter) {
			filtered = filtered.filter(session => session.lastActivityAt >= filter.lastActivityAfter!);
		}

		if (filter.lastActivityBefore) {
			filtered = filtered.filter(session => session.lastActivityAt <= filter.lastActivityBefore!);
		}

		if (filter.titleContains) {
			filtered = filtered.filter(session =>
				session.title.toLowerCase().includes(filter.titleContains!.toLowerCase()),
			);
		}

		if (filter.contextKey) {
			filtered = filtered.filter(session => filter.contextKey! in session.context);
		}

		if (filter.metadataKey) {
			filtered = filtered.filter(session => filter.metadataKey! in session.metadata);
		}

		// Sorting
		if (filter.sortBy) {
			filtered.sort((a, b) => {
				let aValue: any, bValue: any;

				switch (filter.sortBy) {
					case 'createdAt':
						aValue = a.createdAt;
						bValue = b.createdAt;
						break;
					case 'updatedAt':
						aValue = a.updatedAt;
						bValue = b.updatedAt;
						break;
					case 'lastActivityAt':
						aValue = a.lastActivityAt;
						bValue = b.lastActivityAt;
						break;
					case 'title':
						aValue = a.title.toLowerCase();
						bValue = b.title.toLowerCase();
						break;
					default:
						return 0;
				}

				if (aValue < bValue) return filter.sortOrder === 'desc' ? 1 : -1;
				if (aValue > bValue) return filter.sortOrder === 'desc' ? -1 : 1;
				return 0;
			});
		}

		// Pagination
		if (filter.offset || filter.limit) {
			const start = filter.offset || 0;
			const end = filter.limit ? start + filter.limit : undefined;
			filtered = filtered.slice(start, end);
		}

		return filtered;
	}
}
