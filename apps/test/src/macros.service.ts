export class MacroAllocation {
	proteinCalories: number;
	carbCalories: number;
	fatCalories: number;

	/**
	 * Creates an instance of MacroAllocation.
	 * @param proteinCalories - The calories allocated to protein.
	 * @param carbCalories - The calories allocated to carbohydrates.
	 * @param fatCalories - The calories allocated to fats.
	 */
	constructor(proteinCalories: number, carbCalories: number, fatCalories: number) {
		this.proteinCalories = proteinCalories;
		this.carbCalories = carbCalories;
		this.fatCalories = fatCalories;
	}
}

export class MacrosService {
	/**
	 * Calculates the macronutrient allocation in calories based on total daily caloric intake.
	 * @param totalDayCalories - The total daily caloric intake.
	 * @param ratio - The macronutrient ratio to use.
	 * @returns An instance of MacroAllocation containing the calories for each macronutrient.
	 */
	calculateMacroCalories(totalDayCalories: number): MacroAllocation {
		if (totalDayCalories <= 0) {
			throw new Error("Total calories must be a positive value.");
		}

		return new MacroAllocation(
			totalDayCalories * 0.4,
			totalDayCalories * 0.4,
			totalDayCalories * 0.2
		);
	}

	/**
	 * Scales the macronutrient calorie values by the given factor.
	 * @param macroAllocation - The macros in calories to be scaled.
	 * @param factor - The factor to scale the macronutrient calorie values by.
	 * @returns A new MacroAllocation instance with scaled values.
	 */
	scale(macroAllocation: MacroAllocation, factor: number): MacroAllocation {
		return new MacroAllocation(
			macroAllocation.proteinCalories * factor,
			macroAllocation.carbCalories * factor,
			macroAllocation.fatCalories * factor
		);
	}

	/**
	 * Adds the given macronutrient calorie values to the current values.
	 * @param macroAllocation - The current macro allocation where values will be added to.
	 * @param other - The MacroAllocation instance to add to the current values.
	 * @returns A new MacroAllocation instance with added values.
	 */
	add(macroAllocation: MacroAllocation, other: Partial<MacroAllocation>): MacroAllocation {
		return new MacroAllocation(
			macroAllocation.proteinCalories + (other.proteinCalories ?? 0),
			macroAllocation.carbCalories + (other.carbCalories ?? 0),
			macroAllocation.fatCalories + (other.fatCalories ?? 0)
		);
	}

	/**
	 * Distributes the total macronutrient allocation for a day across a specified number of meals.
	 * You can provide a custom meal distribution in percentages, or it will default to an even distribution.
	 * @param totalDayMacroAllocation - The total macronutrient allocation for the day.
	 * @param mealCount - The number of meals to distribute the calories across. Default is set by DEFAULT_MEAL_COUNT.
	 * @param mealDistribution - An optional array of percentages that specifies how to distribute the calories across
	 *                           the meals. If not provided, an even distribution is used.
	 * @returns An array of `MacroAllocation` instances, one for each meal.
	 * @throws {Error} If the meal count is not a positive value.
	 * @throws {Error} If the length of the mealDistribution array does not match the mealCount.
	 * @throws {Error} If the total percentages in the mealDistribution array do not sum to 100.
	 */
	distribute(
		totalDayMacroAllocation: MacroAllocation,
		mealCount: number = 4,
		mealDistribution: number[] = Array(mealCount).fill(100 / mealCount)
	): MacroAllocation[] {
		if (mealCount <= 0) throw new Error("Meal count must be a positive value.");

		// Validate custom distribution if provided
		const totalPercentage = Math.round(mealDistribution.reduce((sum, percentage) => sum + percentage, 0));
		if (mealDistribution.length !== mealCount) {
			throw new Error(`Distribution array length (${mealDistribution.length}) must match meal count (${mealCount}).`);
		}
		if (totalPercentage !== 100) throw new Error("Distribution percentages must sum to 100.");

		// Use distribution percentages to scale the macro allocation
		return mealDistribution.map(percentage => this.scale(totalDayMacroAllocation, percentage / 100));
	}


	/**
	 * Applies adjustments to the distributed macronutrient calorie allocations.
	 * @param macroAllocations - An array of MacroAllocation instances representing the distributed calories.
	 * @param adjustments - An object mapping meal indices to adjustments.
	 * @returns An array of adjusted MacroAllocation instances.
	 */
	applyAdjustments(
		macroAllocations: MacroAllocation[],
		adjustments?: { [mealIndex: number]: Partial<MacroAllocation> }
	): MacroAllocation[] {
		return macroAllocations.map((macroAllocation, index) => {
			const adjustment = adjustments?.[index];
			return adjustment ? this.add(macroAllocation, adjustment) : macroAllocation;
		});
	}
}