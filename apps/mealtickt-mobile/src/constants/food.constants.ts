import { getCardIcon } from '../utils/helpers';
// import {
// 	ingredientMenu as ingredientMenuData,
// } from '@tickt-ltd/diet-gen-lib/src/data/ingredients/ingredient-menu.data';

export const ingredientMenuData = [
{ id: 101, name: 'Chicken Breast' },
{ id: 102, name: 'Turkey Breast' },
{ id: 103, name: 'Sirloin Steak' },
{ id: 106, name: 'Pork Tenderloin' },
{ id: 109, name: 'Salmon' },
{ id: 110, name: 'Tuna' },
{ id: 111, name: 'Cod' },
{ id: 112, name: 'Tilapia' },
{ id: 113, name: 'Halibut' },
{ id: 115, name: 'Mackerel' },
{ id: 116, name: 'Shrimp' },
{ id: 117, name: 'Crab' },
{ id: 118, name: 'Lobster' },
{ id: 119, name: 'Mussels' },
{ id: 120, name: 'Clams' }
];
// Import the ingredient menu from the diet-gen-lib
export const ingredientMenu = ingredientMenuData.map(item => ({
	id: item.id,
	name: item.name.toLowerCase(),
}));

export const allergies = [
	{ id: 'gluten', label: 'gluten' },
	{ id: 'peanuts', label: 'peanuts' },
	{ id: 'treeNuts', label: 'tree nuts' },
	{ id: 'dairy', label: 'dairy' },
	{ id: 'eggs', label: 'eggs' },
	{ id: 'soy', label: 'soy' },
	{ id: 'shellfish', label: 'shellfish' },
	{ id: 'fish', label: 'fish' },
	{ id: 'wheat', label: 'wheat' },
	{ id: 'sesame', label: 'sesame' },
	{ id: 'sulfites', label: 'sulfites' },
	{ id: 'mustard', label: 'mustard' },
	{ id: 'corn', label: 'corn' },
];

export const ingredientOptions = [
	{ id: 'actualWeight', label: 'actual weight' },
	{ id: 'servings', label: 'servings' },
];

export const slide3SingleOption = {
	key: 'ingredientMeasurement',
	label: 'ingredient measurement',
	options: [
		{ id: 'actualWeight', label: 'actual weight' },
		{ id: 'servings', label: 'servings' },
	],
};

export const mealsData = [
	{
		heading: 'meats',
		options: [
			{
				quantity: 1,
				unit: 'kg',
				item: 'chicken breast (boneless, skinless)',
			},
			{ quantity: 200, unit: 'g', item: 'lean ground turkey' },
			{ quantity: 200, unit: 'g', item: 'salmon fillets' },
			{ quantity: 12, unit: '', item: 'eggs' },
		],
	},
	{
		heading: 'dairy',
		options: [
			{ quantity: 1, unit: 'kg', item: 'greek yoghurt (unsweetened)' },
			{ quantity: 250, unit: 'g', item: 'cottage cheest (low-fat)' },
			{ quantity: 200, unit: 'g', item: 'parmesan' },
			{ quantity: 1, unit: 'l', item: 'milk or plant-based alternative' },
		],
	},
	{
		heading: 'fruits',
		options: [
			{ quantity: 5, unit: '', item: 'apples' },
			{ quantity: 7, unit: '', item: 'bananas' },
			{ quantity: 100, unit: 'g', item: 'blueberries (frozen or fresh)' },
			{
				quantity: 100,
				unit: 'g',
				item: 'strawberries (frozen or fresh)',
			},
			{ quantity: 3, unit: '', item: 'oranges' },
			{ quantity: 2, unit: '', item: 'lemons' },
		],
	},
	{
		heading: 'vegetables',
		options: [
			{ quantity: 2, unit: 'head', item: 'broccoli' },
			{ quantity: 300, unit: 'g', item: 'spinach' },
			{ quantity: 200, unit: 'g', item: 'mixed salad greens' },
			{ quantity: 1, unit: 'kg', item: 'bell peppers' },
			{ quantity: 3, unit: '', item: 'zucchini' },
			{ quantity: 1, unit: 'head', item: 'cauliflower' },
			{ quantity: 1, unit: 'kg', item: 'cherry tomatoes' },
		],
	},
	{
		heading: 'pantry',
		options: [
			{ quantity: 500, unit: 'g', item: 'oats (rolled or steel cut)' },
			{ quantity: 500, unit: 'g', item: 'brown rice' },
			{
				quantity: 1,
				unit: ' loaf',
				otherQuantity: 6,
				otherUnit: ' wraps',
				item: 'whole grain bread or wraps',
			},
			{
				quantity: 1,
				unit: ' can',
				otherQuantity: 300,
				otherUnit: 'g',
				item: 'chickpeas (canned or dried)',
			},
			{ quantity: 250, unit: 'g', item: 'natural peanut butter' },
			{ quantity: 100, unit: 'g', item: 'almonds (unsalted)' },
			{ quantity: 250, unit: 'ml', item: 'olive oil' },
		],
	},
];

export const shopMealsType = [
	'all meals',
	'breakfast',
	'lunch',
	'dinner',
	'snacks',
];

export const meals = [
	{
		headting: 'garlic herb chicken with quinoa',
		image: require('../assets/images/1.jpeg'),
		heading: 'garlic herb chicken with quinoa',
		mealType: 'breakfast',
		time: '25 min',
		calories: '595 calories',
		chef: 'European',
		serving: '1 serving',
		ingradients: [
			'200g boneless, skinless chicken breast',
			'50g quinoa',
			'1tbsp olive oil',
			'1tbsp garlic powder',
			'1tbsp dried thyme',
			'0.5tbsp salt',
			'0.5tbsp black pepper',
		],
		directions: [
			'preheat a skillet over medium heat with olive oil.',
			'season the chicken breast with garlic powder, thyme, salt, and black pepper.',
			'cook the chicken in the skillet for about 6-8 minutes per side, or until cooked through.',
			'meanwhile, cook the quinoa according to package instructions.',
			'slice the cooked chicken and serve over the cooked quinoa.',
		],
		macros: {
			calories: '595 calories',
			carbs: 68,
			protien: 100,
			fat: 10,
		},
	},
];

export const recipeToggleOptions = ['ingredients', 'directions', 'macros'];

export const recipeMealLogOptions = [
	{ label: 'yes, I\'ve had this meal', icon: getCardIcon('plus') },
	{ label: 'no, i\'ve skipped this meal', icon: getCardIcon('minus') },
];
