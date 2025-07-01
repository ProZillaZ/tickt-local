export interface MealPlanFilter {
	startDate?: string;
	endDate?: string;
	dateRange?: {
		from: string;
		to: string;
	};
	name?: string;
}
