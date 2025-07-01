export interface State {
	toggleOption: number;
	currentWeek: number;
	currentDay: number;
	swappedRecipe: number;
	currentShopMeal: number;
	repeatRecipeDays: string[];
	meats: string[];
	dairy: string[];
	fruits: string[];
	vegetables: string[];
	pantry: string[];
	skipDays: string[];
	repeatDays: string[];
	mealLog: { [key: string]: string | boolean }[];
}
