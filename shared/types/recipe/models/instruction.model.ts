export class Instruction {
	id: string;
	stepNumber: number;
	description: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(
		stepNumber: number,
		description: string,
		id?: string,
	) {
		if (!Number.isInteger(stepNumber) || stepNumber < 1 || stepNumber > 100) {
			throw new Error('Step number must be an integer between 1 and 100');
		}

		if (!description) {
			throw new Error('Instruction description is required');
		}

		const trimmedDescription = description.trim();

		if (trimmedDescription.length === 0) {
			throw new Error('Instruction description cannot be empty');
		}

		if (trimmedDescription.length > 2000) {
			throw new Error('Instruction description cannot exceed 2000 characters');
		}

		this.id = id || '';
		this.stepNumber = stepNumber;
		this.description = trimmedDescription;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}
