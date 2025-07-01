export const aiCoachContent = {
	title: 'ai diet coach',
	description: 'here are some ideas on what the ai coach can help you out with.',
	options: [
		'need help with recipes',
		'losing motivation to stay on track',
		'learn more about dieting',
	],
	buttonTitle: 'start chatting',
};

export const chatData = [
	{ role: 'user', msg: 'need help about recipes' },
	{
		role: 'ai',
		msg: 'hi there! what would you like to know more about recipes?',
		suggestions: ['cooking tips', 'how it works', 'learn about nutrition'],
	},
	{ role: 'user', msg: 'need help about recipes' },
	{ role: 'ai', msg: 'what would you like to know more exactly?' },
	{
		role: 'user',
		msg: 'I want to learn more about cooking in a short amount of time, how to select more recipes that are better for your health in the long run',
	},
	{
		role: 'ai',
		msg: 'here\'s what you should know about selecting recipes for your health in the long run',
		options: [
			'Choose recipes with simple, whole ingredients that are easy to find and fit your lifestyle.',
			'Opt for balanced meals that include lean proteins, healthy fats, and complex carbohydrates to keep you satisfied.',
			'Select options that can be easily portioned or modified to support your weight loss goals while still being enjoyable.',
		],
		question: 'would you like to know more about this?',
	},
];

export const coachToggleOptions = {
	default: 0,
	options: ['new chat', 'chat history'],
};

export const aiChatHistory = [
	{ id: 1, title: 'ideas for selecting recipes', date: '12.12.2024' },
	{
		id: 2,
		title: 'how to stay motivated while reaching your goals and mpre',
		date: '12.12.2024',
	},
	{ id: 3, title: 'going out and losing weight', date: '12.12.2024' },
	{
		id: 4,
		title: 'vegan diet-friendly recipes for christmas',
		date: '12.12.2024',
	},
	{
		id: 5,
		title: 'learning about macro nutrients and how they impact your ',
		date: '12.12.2024',
	},
	{ id: 6, title: 'high-fat meals', date: '12.12.2024' },
	{ id: 7, title: 'motivation for working out', date: '12.12.2024' },
	{
		id: 8,
		title: 'vegan diet-friendly recipes for christmas',
		date: '12.12.2024',
	},
	{
		id: 9,
		title: 'learning about macro nutrients and how they impact your ',
		date: '12.12.2024',
	},
	{ id: 10, title: 'high-fat meals', date: '12.12.2024' },
	{ id: 11, title: 'motivation for working out', date: '12.12.2024' },
]; 