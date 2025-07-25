import { Ingredient } from '../../models/ingredients/ingredient';
import { Macro, MealType, DietType, Cuisine } from '@tickt-ltd/types';
import { IngredientCategory } from '../../models/ingredients/ingredient-category.enum';
import { CookingMethod } from '../../models/ingredients/cooking-method.enum';
import { Season } from '../../models/ingredients/season.enum';
import { FlavourProfile } from '../../models/ingredients/flavour-profile.enum';

export const veggieSources: Ingredient[] = [
	{
		id: 401,
		name: 'Spinach',
		macro: Macro.VEGGIE,
		minQuantity: 30,
		maxQuantity: 150,
		protein: 2.9,
		carbs: 3.6,
		fat: 0.4,
		quantity: 100,
		calories: 23,
		categories: [IngredientCategory.LEAFY_GREENS],
		mealTypes: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.AMERICAN, Cuisine.INDIAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.SAUTE],
		seasonality: [Season.SPRING, Season.AUTUMN],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.BITTER]
	},
	{
		id: 402,
		name: 'Kale',
		macro: Macro.VEGGIE,
		minQuantity: 30,
		maxQuantity: 150,
		protein: 4.3,
		carbs: 8.8,
		fat: 0.9,
		quantity: 100,
		calories: 49,
		categories: [IngredientCategory.LEAFY_GREENS],
		mealTypes: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.AMERICAN, Cuisine.EUROPEAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.STEAM, CookingMethod.SAUTE, CookingMethod.ROAST],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.UMAMI]
	},
	{
		id: 403,
		name: 'Rocket',
		macro: Macro.VEGGIE,
		minQuantity: 20,
		maxQuantity: 100,
		protein: 2.6,
		carbs: 3.7,
		fat: 0.7,
		quantity: 100,
		calories: 25,
		categories: [IngredientCategory.LEAFY_GREENS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.ITALIAN, Cuisine.FRENCH],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.SPICY]
	},
	{
		id: 404,
		name: 'Lettuce',
		macro: Macro.VEGGIE,
		minQuantity: 30,
		maxQuantity: 150,
		protein: 1.4,
		carbs: 2.9,
		fat: 0.2,
		quantity: 100,
		calories: 15,
		categories: [IngredientCategory.LEAFY_GREENS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.AMERICAN, Cuisine.EUROPEAN, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.UMAMI]
	},
	{
		id: 405,
		name: 'Watercress',
		macro: Macro.VEGGIE,
		minQuantity: 20,
		maxQuantity: 100,
		protein: 2.3,
		carbs: 1.3,
		fat: 0.1,
		quantity: 100,
		calories: 11,
		categories: [IngredientCategory.LEAFY_GREENS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.BRITISH, Cuisine.FRENCH, Cuisine.CHINESE],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.SPICY]
	},
	{
		id: 406,
		name: 'Broccoli',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 2.8,
		carbs: 7.0,
		fat: 0.4,
		quantity: 100,
		calories: 34,
		categories: [IngredientCategory.CRUCIFEROUS_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.CHINESE, Cuisine.AMERICAN, Cuisine.ITALIAN],
		cookingMethods: [CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.ROAST, CookingMethod.RAW],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.BITTER]
	},
	{
		id: 407,
		name: 'Cauliflower',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 1.9,
		carbs: 5.0,
		fat: 0.3,
		quantity: 100,
		calories: 25,
		categories: [IngredientCategory.CRUCIFEROUS_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.INDIAN, Cuisine.AMERICAN, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.ROAST, CookingMethod.RAW],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 408,
		name: 'Brussels Sprouts',
		macro: Macro.VEGGIE,
		minQuantity: 40,
		maxQuantity: 150,
		protein: 3.4,
		carbs: 8.9,
		fat: 0.3,
		quantity: 100,
		calories: 43,
		categories: [IngredientCategory.CRUCIFEROUS_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.EUROPEAN, Cuisine.AMERICAN, Cuisine.BRITISH],
		cookingMethods: [CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.ROAST, CookingMethod.FRY],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.BITTER]
	},
	{
		id: 409,
		name: 'Cabbage',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 1.3,
		carbs: 6.0,
		fat: 0.2,
		quantity: 100,
		calories: 25,
		categories: [IngredientCategory.CRUCIFEROUS_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.EUROPEAN, Cuisine.ASIAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.SAUTE],
		seasonality: [Season.WINTER, Season.SPRING],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SPICY]
	},
	{
		id: 410,
		name: 'Bok Choy',
		macro: Macro.VEGGIE,
		minQuantity: 40,
		maxQuantity: 150,
		protein: 1.5,
		carbs: 2.2,
		fat: 0.2,
		quantity: 100,
		calories: 13,
		categories: [IngredientCategory.CRUCIFEROUS_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.CHINESE, Cuisine.JAPANESE, Cuisine.KOREAN],
		cookingMethods: [CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.SAUTE, CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.AUTUMN],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.BITTER]
	},
	{
		id: 411,
		name: 'Turnip',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 0.9,
		carbs: 6.4,
		fat: 0.1,
		quantity: 100,
		calories: 28,
		categories: [IngredientCategory.ROOT_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.EUROPEAN, Cuisine.MEDITERRANEAN, Cuisine.INDIAN],
		cookingMethods: [CookingMethod.BOIL, CookingMethod.ROAST, CookingMethod.SAUTE],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SWEET]
	},
	{
		id: 412,
		name: 'Tomatoes',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 0.9,
		carbs: 3.9,
		fat: 0.2,
		quantity: 100,
		calories: 18,
		categories: [IngredientCategory.SQUASH],  // botanically a fruit but culinary vegetable
		mealTypes: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.ITALIAN, Cuisine.SPANISH, Cuisine.MEXICAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL],
		seasonality: [Season.SUMMER],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SWEET, FlavourProfile.SOUR]
	},
	{
		id: 413,
		name: 'Bell Peppers',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 1.0,
		carbs: 6.0,
		fat: 0.3,
		quantity: 100,
		calories: 31,
		categories: [IngredientCategory.SQUASH],
		mealTypes: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.MEXICAN, Cuisine.CHINESE],
		cookingMethods: [CookingMethod.RAW, CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL],
		seasonality: [Season.SUMMER, Season.AUTUMN],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SWEET]
	},
	{
		id: 414,
		name: 'Eggplant',
		macro: Macro.VEGGIE,
		minQuantity: 100,
		maxQuantity: 300,
		protein: 1.0,
		carbs: 5.9,
		fat: 0.2,
		quantity: 100,
		calories: 25,
		categories: [IngredientCategory.SQUASH],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.MIDDLE_EASTERN, Cuisine.INDIAN, Cuisine.CHINESE],
		cookingMethods: [CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL, CookingMethod.FRY],
		seasonality: [Season.SUMMER, Season.AUTUMN],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 415,
		name: 'Onions',
		macro: Macro.VEGGIE,
		minQuantity: 30,
		maxQuantity: 150,
		protein: 1.1,
		carbs: 9.3,
		fat: 0.1,
		quantity: 100,
		calories: 40,
		categories: [IngredientCategory.ALLIUMS],
		mealTypes: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.INDIAN, Cuisine.MEDITERRANEAN, Cuisine.FRENCH, Cuisine.CHINESE],
		cookingMethods: [CookingMethod.RAW, CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SPICY]
	},
	{
		id: 416,
		name: 'Garlic',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 30,
		protein: 6.4,
		carbs: 33.1,
		fat: 0.5,
		quantity: 100,
		calories: 149,
		categories: [IngredientCategory.ALLIUMS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.CHINESE, Cuisine.KOREAN, Cuisine.ITALIAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.SAUTE, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SPICY]
	},
	{
		id: 417,
		name: 'Leeks',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 1.5,
		carbs: 14.2,
		fat: 0.3,
		quantity: 100,
		calories: 61,
		categories: [IngredientCategory.ALLIUMS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.BRITISH, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL, CookingMethod.BOIL],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SWEET]
	},
	{
		id: 418,
		name: 'Shallots',
		macro: Macro.VEGGIE,
		minQuantity: 20,
		maxQuantity: 100,
		protein: 2.5,
		carbs: 16.8,
		fat: 0.1,
		quantity: 100,
		calories: 72,
		categories: [IngredientCategory.ALLIUMS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.ASIAN, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.SAUTE, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 419,
		name: 'Spring Onion',
		macro: Macro.VEGGIE,
		minQuantity: 10,
		maxQuantity: 50,
		protein: 1.8,
		carbs: 7.3,
		fat: 0.2,
		quantity: 100,
		calories: 32,
		categories: [IngredientCategory.ALLIUMS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.CHINESE, Cuisine.KOREAN, Cuisine.JAPANESE],
		cookingMethods: [CookingMethod.RAW, CookingMethod.SAUTE, CookingMethod.GRILL],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 420,
		name: 'Cucumbers',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 0.7,
		carbs: 3.6,
		fat: 0.1,
		quantity: 100,
		calories: 15,
		categories: [IngredientCategory.SQUASH],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.MIDDLE_EASTERN, Cuisine.GREEK],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SUMMER],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 421,
		name: 'Celery',
		macro: Macro.VEGGIE,
		minQuantity: 30,
		maxQuantity: 150,
		protein: 0.7,
		carbs: 3.0,
		fat: 0.2,
		quantity: 100,
		calories: 16,
		categories: [IngredientCategory.SQUASH],
		mealTypes: [MealType.LUNCH, MealType.DINNER, MealType.SNACK],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.AMERICAN, Cuisine.EUROPEAN, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.SAUTE],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.BITTER]
	},
	{
		id: 422,
		name: 'Asparagus',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 2.2,
		carbs: 3.9,
		fat: 0.2,
		quantity: 100,
		calories: 20,
		categories: [IngredientCategory.CRUCIFEROUS_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.ITALIAN, Cuisine.AMERICAN],
		cookingMethods: [CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL],
		seasonality: [Season.SPRING],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.BITTER]
	},
	{
		id: 423,
		name: 'Green Beans',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 1.8,
		carbs: 7.0,
		fat: 0.2,
		quantity: 100,
		calories: 31,
		categories: [IngredientCategory.LEGUMES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.AMERICAN, Cuisine.FRENCH, Cuisine.CHINESE],
		cookingMethods: [CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.SAUTE, CookingMethod.ROAST],
		seasonality: [Season.SUMMER, Season.AUTUMN],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SWEET]
	},
	{
		id: 424,
		name: 'Zucchini',
		macro: Macro.VEGGIE,
		minQuantity: 100,
		maxQuantity: 300,
		protein: 1.2,
		carbs: 3.1,
		fat: 0.3,
		quantity: 100,
		calories: 17,
		categories: [IngredientCategory.SQUASH],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.ITALIAN, Cuisine.FRENCH],
		cookingMethods: [CookingMethod.STEAM, CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL, CookingMethod.RAW],
		seasonality: [Season.SUMMER],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 425,
		name: 'Mushrooms',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 3.1,
		carbs: 3.3,
		fat: 0.3,
		quantity: 100,
		calories: 22,
		categories: [IngredientCategory.SQUASH], // Not technically a vegetable but commonly used as one
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.ITALIAN, Cuisine.CHINESE, Cuisine.JAPANESE],
		cookingMethods: [CookingMethod.SAUTE, CookingMethod.ROAST, CookingMethod.GRILL, CookingMethod.RAW],
		seasonality: [Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 426,
		name: 'Carrots',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 0.9,
		carbs: 9.6,
		fat: 0.2,
		quantity: 100,
		calories: 41,
		categories: [IngredientCategory.ROOT_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER, MealType.SNACK],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.AMERICAN, Cuisine.CHINESE, Cuisine.INDIAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.STEAM, CookingMethod.BOIL, CookingMethod.SAUTE, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.SWEET, FlavourProfile.UMAMI]
	},
	{
		id: 427,
		name: 'Beets',
		macro: Macro.VEGGIE,
		minQuantity: 50,
		maxQuantity: 200,
		protein: 1.6,
		carbs: 9.6,
		fat: 0.2,
		quantity: 100,
		calories: 43,
		categories: [IngredientCategory.ROOT_VEGETABLES],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.AMERICAN],
		cookingMethods: [CookingMethod.BOIL, CookingMethod.ROAST, CookingMethod.RAW],
		seasonality: [Season.SUMMER, Season.AUTUMN, Season.WINTER],
		flavourProfiles: [FlavourProfile.SWEET, FlavourProfile.UMAMI]
	}
];

export default veggieSources;
