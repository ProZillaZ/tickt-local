export class Ingredient {
	id: string;
	name: string;
	amount: number;
	unit: string;
	createdAt: Date;
	updatedAt: Date;

	constructor(
		name: string,
		amount: number,
		unit: string,
		id?: string,
	) {
		if (!name) {
			throw new Error('Ingredient name is required');
		}

		const trimmedName = name.trim();

		if (trimmedName.length === 0) {
			throw new Error('Ingredient name cannot be empty');
		}

		if (trimmedName.length > 200) {
			throw new Error('Ingredient name cannot exceed 200 characters');
		}

		if (amount < 0 || amount > 10000) {
			throw new Error('Ingredient amount must be between 0 and 10000');
		}

		if (!unit) {
			throw new Error('Ingredient unit is required');
		}

		const trimmedUnit = unit.trim();

		if (trimmedUnit.length === 0) {
			throw new Error('Ingredient unit cannot be empty');
		}

		if (trimmedUnit.length > 50) {
			throw new Error('Ingredient unit cannot exceed 50 characters');
		}

		this.id = id || '';
		this.name = trimmedName;
		this.amount = Math.round(amount * 100) / 100; // Round to 2 decimals
		this.unit = trimmedUnit;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}
