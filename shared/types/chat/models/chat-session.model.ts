import { SessionStatus } from '../enums';
import { ChatParticipant } from './chat-participant.model';
import { ChatMessage } from './chat-message.model';

export class ChatSession {
	public id: string;
	public userId: string;
	public title: string;
	public status: SessionStatus;
	public participants: ChatParticipant[];
	public messages: ChatMessage[];
	public createdAt: Date;
	public updatedAt: Date;
	public lastActivityAt: Date;
	public context: Record<string, any>;
	public metadata: Record<string, any>;

	constructor(
		id: string,
		userId: string,
		title: string,
		status: SessionStatus = SessionStatus.ACTIVE,
		createdAt: Date = new Date(),
		context: Record<string, any> = {},
		metadata: Record<string, any> = {},
	) {
		this.id = id;
		this.userId = userId;
		this.title = title;
		this.status = status;
		this.participants = [];
		this.messages = [];
		this.createdAt = createdAt;
		this.updatedAt = createdAt;
		this.lastActivityAt = createdAt;
		this.context = context;
		this.metadata = metadata;
	}

	public addParticipant(participant: ChatParticipant): void {
		const existingIndex = this.participants.findIndex(p => p.id === participant.id);
		if (existingIndex >= 0) {
			this.participants[existingIndex] = participant;
		} else {
			this.participants.push(participant);
		}
		this.touch();
	}

	public removeParticipant(participantId: string): void {
		this.participants = this.participants.filter(p => p.id !== participantId);
		this.touch();
	}

	public addMessage(message: ChatMessage): void {
		this.messages.push(message);
		this.lastActivityAt = message.timestamp;
		this.touch();
	}

	public getParticipant(participantId: string): ChatParticipant | undefined {
		return this.participants.find(p => p.id === participantId);
	}

	public getMessage(messageId: string): ChatMessage | undefined {
		return this.messages.find(m => m.id === messageId);
	}

	public getMessagesByParticipant(participantId: string): ChatMessage[] {
		return this.messages.filter(m => m.participantId === participantId);
	}

	public getReplies(parentMessageId: string): ChatMessage[] {
		return this.messages.filter(m => m.parentMessageId === parentMessageId);
	}

	public updateStatus(status: SessionStatus): void {
		this.status = status;
		this.touch();
	}

	public updateTitle(title: string): void {
		this.title = title;
		this.touch();
	}

	public setContext(context: Record<string, any>): void {
		this.context = { ...this.context, ...context };
		this.touch();
	}

	public setMetadata(metadata: Record<string, any>): void {
		this.metadata = { ...this.metadata, ...metadata };
		this.touch();
	}

	public touch(): void {
		this.updatedAt = new Date();
	}

	public isActive(): boolean {
		return this.status === SessionStatus.ACTIVE;
	}

	public isCompleted(): boolean {
		return this.status === SessionStatus.COMPLETED;
	}

	public getMessageCount(): number {
		return this.messages.length;
	}

	public getParticipantCount(): number {
		return this.participants.length;
	}

	public toJSON(): any {
		return {
			id: this.id,
			userId: this.userId,
			title: this.title,
			status: this.status,
			participants: this.participants.map(p => p.toJSON()),
			messages: this.messages.map(m => m.toJSON()),
			createdAt: this.createdAt.toISOString(),
			updatedAt: this.updatedAt.toISOString(),
			lastActivityAt: this.lastActivityAt.toISOString(),
			context: this.context,
			metadata: this.metadata,
		};
	}

	public static fromJSON(data: any): ChatSession {
		const session = new ChatSession(
			data.id,
			data.userId,
			data.title,
			data.status || SessionStatus.ACTIVE,
			data.createdAt ? new Date(data.createdAt) : new Date(),
			data.context || {},
			data.metadata || {},
		);

		session.updatedAt = data.updatedAt ? new Date(data.updatedAt) : session.createdAt;
		session.lastActivityAt = data.lastActivityAt ? new Date(data.lastActivityAt) : session.createdAt;

		if (data.participants) {
			session.participants = data.participants.map((p: any) => ChatParticipant.fromJSON(p));
		}

		if (data.messages) {
			session.messages = data.messages.map((m: any) => ChatMessage.fromJSON(m));
		}

		return session;
	}
}
