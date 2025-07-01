export interface UpdateChatParticipantDto {
	name?: string;
	avatarUrl?: string;
	isOnline?: boolean;
	metadata?: Record<string, any>;
}