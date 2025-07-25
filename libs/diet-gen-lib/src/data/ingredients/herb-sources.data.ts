import { Ingredient } from '../../models/ingredients/ingredient';
import { Macro, MealType, DietType, Cuisine } from '@tickt-ltd/types';
import { IngredientCategory } from '../../models/ingredients/ingredient-category.enum';
import { CookingMethod } from '../../models/ingredients/cooking-method.enum';
import { Season } from '../../models/ingredients/season.enum';
import { FlavourProfile } from '../../models/ingredients/flavour-profile.enum';

export const herbSources: Ingredient[] = [
	{
		id: 501,
		name: 'Basil',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 30,
		protein: 3.2,
		carbs: 2.7,
		fat: 0.6,
		quantity: 100,
		calories: 23,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.ITALIAN, Cuisine.MEDITERRANEAN, Cuisine.THAI],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SUMMER],
		flavourProfiles: [FlavourProfile.SWEET, FlavourProfile.SPICY]
	},
	{
		id: 502,
		name: 'Parsley',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 30,
		protein: 2.9,
		carbs: 6.3,
		fat: 0.8,
		quantity: 100,
		calories: 36,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.MIDDLE_EASTERN, Cuisine.EUROPEAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.BITTER]
	},
	{
		id: 503,
		name: 'Cilantro',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 30,
		protein: 2.1,
		carbs: 3.7,
		fat: 0.5,
		quantity: 100,
		calories: 23,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEXICAN, Cuisine.INDIAN, Cuisine.THAI, Cuisine.VIETNAMESE],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.SPICY]
	},
	{
		id: 504,
		name: 'Mint',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 25,
		protein: 3.3,
		carbs: 8.4,
		fat: 0.7,
		quantity: 100,
		calories: 44,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.BREAKFAST, MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MIDDLE_EASTERN, Cuisine.MEDITERRANEAN, Cuisine.INDIAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.SWEET, FlavourProfile.SPICY]
	},
	{
		id: 505,
		name: 'Rosemary',
		macro: Macro.VEGGIE,
		minQuantity: 2,
		maxQuantity: 15,
		protein: 3.3,
		carbs: 20.7,
		fat: 15.2,
		quantity: 100,
		calories: 131,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.FRENCH, Cuisine.ITALIAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.SPICY]
	},
	{
		id: 506,
		name: 'Thyme',
		macro: Macro.VEGGIE,
		minQuantity: 2,
		maxQuantity: 15,
		protein: 5.6,
		carbs: 24.5,
		fat: 1.7,
		quantity: 100,
		calories: 101,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.MEDITERRANEAN, Cuisine.ITALIAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.BITTER]
	},
	{
		id: 507,
		name: 'Oregano',
		macro: Macro.VEGGIE,
		minQuantity: 2,
		maxQuantity: 15,
		protein: 9.0,
		carbs: 68.9,
		fat: 4.3,
		quantity: 100,
		calories: 265,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.ITALIAN, Cuisine.GREEK, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.SPICY]
	},
	{
		id: 508,
		name: 'Sage',
		macro: Macro.VEGGIE,
		minQuantity: 2,
		maxQuantity: 15,
		protein: 10.6,
		carbs: 60.7,
		fat: 12.8,
		quantity: 100,
		calories: 315,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.ITALIAN, Cuisine.FRENCH, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.UMAMI]
	},
	{
		id: 509,
		name: 'Dill',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 25,
		protein: 3.5,
		carbs: 7.0,
		fat: 1.1,
		quantity: 100,
		calories: 43,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.RUSSIAN, Cuisine.SCANDINAVIAN, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.SWEET]
	},
	{
		id: 510,
		name: 'Chives',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 25,
		protein: 3.3,
		carbs: 4.4,
		fat: 0.7,
		quantity: 100,
		calories: 30,
		categories: [IngredientCategory.HERBS, IngredientCategory.ALLIUMS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.EUROPEAN, Cuisine.AMERICAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.UMAMI]
	},
	{
		id: 511,
		name: 'Tarragon',
		macro: Macro.VEGGIE,
		minQuantity: 2,
		maxQuantity: 15,
		protein: 5.0,
		carbs: 50.0,
		fat: 7.0,
		quantity: 100,
		calories: 295,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.FRENCH, Cuisine.MEDITERRANEAN, Cuisine.EUROPEAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SPRING, Season.SUMMER],
		flavourProfiles: [FlavourProfile.SWEET, FlavourProfile.BITTER]
	},
	{
		id: 512,
		name: 'Bay Leaves',
		macro: Macro.VEGGIE,
		minQuantity: 1,
		maxQuantity: 5,
		protein: 7.6,
		carbs: 48.6,
		fat: 8.4,
		quantity: 100,
		calories: 313,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.FRENCH, Cuisine.INDIAN],
		cookingMethods: [CookingMethod.ROAST, CookingMethod.BOIL],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.BITTER, FlavourProfile.UMAMI]
	},
	{
		id: 513,
		name: 'Marjoram',
		macro: Macro.VEGGIE,
		minQuantity: 2,
		maxQuantity: 15,
		protein: 12.7,
		carbs: 60.6,
		fat: 7.0,
		quantity: 100,
		calories: 271,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MEDITERRANEAN, Cuisine.FRENCH, Cuisine.ITALIAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SUMMER],
		flavourProfiles: [FlavourProfile.BITTER]
	},
	{
		id: 514,
		name: 'Lemongrass',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 30,
		protein: 1.8,
		carbs: 25.3,
		fat: 0.5,
		quantity: 100,
		calories: 99,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.THAI, Cuisine.VIETNAMESE, Cuisine.INDONESIAN],
		cookingMethods: [CookingMethod.BOIL],
		seasonality: [Season.SUMMER],
		flavourProfiles: [FlavourProfile.SOUR, FlavourProfile.SPICY]
	},
	{
		id: 515,
		name: 'Thai Basil',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 30,
		protein: 3.2,
		carbs: 2.7,
		fat: 0.6,
		quantity: 100,
		calories: 23,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.THAI, Cuisine.VIETNAMESE, Cuisine.ASIAN],
		cookingMethods: [CookingMethod.RAW],
		seasonality: [Season.SUMMER],
		flavourProfiles: [FlavourProfile.SWEET, FlavourProfile.SPICY]
	},
	{
		id: 516,
		name: 'Curry Leaves',
		macro: Macro.VEGGIE,
		minQuantity: 5,
		maxQuantity: 25,
		protein: 6.1,
		carbs: 18.7,
		fat: 5.4,
		quantity: 100,
		calories: 203,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.INDIAN, Cuisine.THAI],
		cookingMethods: [CookingMethod.FRY, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.BITTER]
	},
	{
		id: 517,
		name: 'Za\'atar',
		macro: Macro.VEGGIE,
		minQuantity: 2,
		maxQuantity: 15,
		protein: 4.5,
		carbs: 22.0,
		fat: 5.1,
		quantity: 100,
		calories: 178,
		categories: [IngredientCategory.HERBS],
		mealTypes: [MealType.LUNCH, MealType.DINNER],
		dietTypes: [DietType.STANDARD, DietType.VEGETARIAN, DietType.VEGAN, DietType.PESCATARIAN],
		allergens: [],
		cuisine: [Cuisine.MIDDLE_EASTERN, Cuisine.MEDITERRANEAN],
		cookingMethods: [CookingMethod.RAW, CookingMethod.ROAST],
		seasonality: [Season.ALL_YEAR],
		flavourProfiles: [FlavourProfile.UMAMI, FlavourProfile.SPICY]
	}
];

export default herbSources;
