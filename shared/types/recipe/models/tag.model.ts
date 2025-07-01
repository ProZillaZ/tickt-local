export class Tag {
	id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(name: string, id?: string) {
		if (!name) {
			throw new Error('Tag name is required and must be a string');
		}

		const trimmedName = name.trim();

		if (trimmedName.length === 0) {
			throw new Error('Tag name cannot be empty');
		}

		if (trimmedName.length > 50) {
			throw new Error('Tag name cannot exceed 50 characters');
		}

		this.id = id || '';
		this.name = trimmedName;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	updateName(name: string): void {
		if (!name) {
			throw new Error('Tag name is required and must be a string');
		}

		const trimmedName = name.trim();

		if (trimmedName.length === 0) {
			throw new Error('Tag name cannot be empty');
		}

		if (trimmedName.length > 50) {
			throw new Error('Tag name cannot exceed 50 characters');
		}

		this.name = trimmedName;
		this.updatedAt = new Date();
	}
}
