import { MessageType } from '../enums';

export class ChatMessage {
	public id: string;
	public sessionId: string;
	public participantId: string;
	public type: MessageType;
	public content: string;
	public timestamp: Date;
	public isEdited: boolean;
	public editedAt?: Date;
	public parentMessageId?: string;
	public reactions: Record<string, string[]>;
	public metadata: Record<string, any>;

	constructor(
		id: string,
		sessionId: string,
		participantId: string,
		type: MessageType,
		content: string,
		timestamp: Date = new Date(),
		parentMessageId?: string,
		metadata: Record<string, any> = {},
	) {
		this.id = id;
		this.sessionId = sessionId;
		this.participantId = participantId;
		this.type = type;
		this.content = content;
		this.timestamp = timestamp;
		this.isEdited = false;
		this.parentMessageId = parentMessageId;
		this.reactions = {};
		this.metadata = metadata;
	}

	public editContent(newContent: string): void {
		this.content = newContent;
		this.isEdited = true;
		this.editedAt = new Date();
	}

	public addReaction(emoji: string, participantId: string): void {
		if (!this.reactions[emoji]) {
			this.reactions[emoji] = [];
		}
		if (!this.reactions[emoji].includes(participantId)) {
			this.reactions[emoji].push(participantId);
		}
	}

	public removeReaction(emoji: string, participantId: string): void {
		if (this.reactions[emoji]) {
			this.reactions[emoji] = this.reactions[emoji].filter(id => id !== participantId);
			if (this.reactions[emoji].length === 0) {
				delete this.reactions[emoji];
			}
		}
	}

	public setMetadata(metadata: Record<string, any>): void {
		this.metadata = { ...this.metadata, ...metadata };
	}

	public isReply(): boolean {
		return !!this.parentMessageId;
	}

	public toJSON(): any {
		const result: any = {
			id: this.id,
			sessionId: this.sessionId,
			participantId: this.participantId,
			type: this.type,
			content: this.content,
			timestamp: this.timestamp.toISOString(),
			isEdited: this.isEdited,
			reactions: this.reactions,
			metadata: this.metadata,
		};

		// Only include optional fields if they're defined
		if (this.editedAt !== undefined) {
			result.editedAt = this.editedAt.toISOString();
		}

		if (this.parentMessageId !== undefined) {
			result.parentMessageId = this.parentMessageId;
		}

		return result;
	}

	public static fromJSON(data: any): ChatMessage {
		const message = new ChatMessage(
			data.id,
			data.sessionId,
			data.participantId,
			data.type,
			data.content,
			data.timestamp ? new Date(data.timestamp) : new Date(),
			data.parentMessageId,
			data.metadata || {},
		);

		message.isEdited = data.isEdited || false;
		message.editedAt = data.editedAt ? new Date(data.editedAt) : undefined;
		message.reactions = data.reactions || {};

		return message;
	}
}
