export class NutritionalInfo {
	id: string;
	calories: number;
	protein: number;
	carbohydrates: number;
	fat: number;
	fiber: number;
	createdAt: Date;
	updatedAt: Date;

	constructor(
		calories: number,
		protein: number,
		carbohydrates: number,
		fat: number,
		fiber: number,
		id?: string,
	) {
		if (calories < 0 || calories > 10000) {
			throw new Error('Calories must be a number between 0 and 10000');
		}

		if (protein < 0 || protein > 1000) {
			throw new Error('Protein must be a number between 0 and 1000 grams');
		}

		if (carbohydrates < 0 || carbohydrates > 1000) {
			throw new Error('Carbohydrates must be a number between 0 and 1000 grams');
		}

		if (fat < 0 || fat > 1000) {
			throw new Error('Fat must be a number between 0 and 1000 grams');
		}

		if (fiber < 0 || fiber > 100) {
			throw new Error('Fiber must be a number between 0 and 100 grams');
		}

		this.id = id || '';
		this.calories = Math.round(calories * 10) / 10; // Round to 1 decimal
		this.protein = Math.round(protein * 10) / 10;
		this.carbohydrates = Math.round(carbohydrates * 10) / 10;
		this.fat = Math.round(fat * 10) / 10;
		this.fiber = Math.round(fiber * 10) / 10;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
}
