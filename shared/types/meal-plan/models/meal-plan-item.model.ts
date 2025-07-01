export interface MealPlanItem {
	recipeId: string;
	recipeName: string;
	servings: number;
	calories: number;
	macros: {
		protein: number;
		carbs: number;
		fat: number;
		fiber?: number;
	};
	notes?: string;
}
