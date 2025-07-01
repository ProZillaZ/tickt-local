export const homeToggleOptions = {
	default: 0,
	options: ['recipes', 'shopping list'],
};

export const showcaseContent = [
	{
		id: 1,
		image: require('../assets/images/1.jpeg'),
		title: 'high-protein breakfast scramble',
		type: 'breakfast',
		time: '15 mins',
	},
	{
		id: 2,
		image: require('../assets/images/2.jpeg'),
		title: 'high-protein breakfast scramble',
		type: 'lunch',
		time: '30 mins',
	},
	{
		id: 3,
		image: require('../assets/images/3.jpeg'),
		title: 'high-protein breakfast scramble',
		type: 'dinner',
		time: '25 mins',
	},
	{
		id: 4,
		image: require('../assets/images/4.jpeg'),
		title: 'high-protein breakfast scramble',
		type: 'snack',
		time: '25 mins',
	},
];

export const tipContent = {
	title: 'the more you engage, the better your diet plan becomes',
	subTitle: 'make sure to:',
	options: [
		'log your meals',
		'rate recipes',
		'swap to get the recipes you love',
	],
};

export const tipContentOrder = {
	title: 'one click order',
	subTitle: 'order everything in your shopping list with 1 click, right here.',
	buttonText: 'order now',
};

export const swapMeal = [
	{ label: 'grilled chicken and vegetable skewers', duration: '25 min' },
	{ label: 'grilled chicken and quinoa bowl', duration: '25 min' },
	{ label: 'grilled chicken with quinoa and vegetables', duration: '25 min' },
];

export const recipeOtherOptions = ['repeat recipe', 'log meal'];

export const profileBtns = [
	{
		title: 'food settings',
		icon: require('../assets/icons/snack.png'),
		id: 1,
	},
	{ title: 'user info', icon: require('../assets/icons/info.png'), id: 2 },
	{
		title: 'subscriptions',
		icon: require('../assets/icons/certificate.png'),
		id: 3,
	},
	{
		title: 'account settings',
		icon: require('../assets/icons/gear.png'),
		id: 4,
	},
];

export const planContent = [
	{ duration: '1 month', price: 14.99 },
	{ duration: '3 months', price: 39.99 },
	{ duration: '1 year', price: 119.99 },
];