import { ParticipantType } from '../enums';

export interface CreateChatParticipantDto {
	id: string;
	type: ParticipantType;
	name: string;
	avatarUrl?: string;
	metadata?: Record<string, any>;
}