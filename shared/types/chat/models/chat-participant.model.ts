import { ParticipantType } from '../enums';

export class ChatParticipant {
	public id: string;
	public type: ParticipantType;
	public name: string;
	public avatarUrl?: string;
	public isOnline: boolean;
	public lastSeenAt: Date;
	public metadata: Record<string, any>;

	constructor(
		id: string,
		type: ParticipantType,
		name: string,
		isOnline: boolean = false,
		lastSeenAt: Date = new Date(),
		avatarUrl?: string,
		metadata: Record<string, any> = {},
	) {
		this.id = id;
		this.type = type;
		this.name = name;
		this.isOnline = isOnline;
		this.lastSeenAt = lastSeenAt;
		this.avatarUrl = avatarUrl;
		this.metadata = metadata;
	}

	public markOnline(): void {
		this.isOnline = true;
		this.lastSeenAt = new Date();
	}

	public markOffline(): void {
		this.isOnline = false;
		this.lastSeenAt = new Date();
	}

	public updateLastSeen(): void {
		this.lastSeenAt = new Date();
	}

	public setMetadata(metadata: Record<string, any>): void {
		this.metadata = { ...this.metadata, ...metadata };
	}

	public toJSON(): any {
		const result: any = {
			id: this.id,
			type: this.type,
			name: this.name,
			isOnline: this.isOnline,
			lastSeenAt: this.lastSeenAt.toISOString(),
			metadata: this.metadata,
		};

		// Only include avatarUrl if it's defined
		if (this.avatarUrl !== undefined) {
			result.avatarUrl = this.avatarUrl;
		}

		return result;
	}

	public static fromJSON(data: any): ChatParticipant {
		return new ChatParticipant(
			data.id,
			data.type,
			data.name,
			data.isOnline || false,
			data.lastSeenAt ? new Date(data.lastSeenAt) : new Date(),
			data.avatarUrl,
			data.metadata || {},
		);
	}
}
