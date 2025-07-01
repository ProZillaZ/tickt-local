export const slide1SingleOption = {
	key: 'measurementSystem',
	label: 'measurement system',
	options: [
		{ id: 'cmKg', label: 'cm/kg' },
		{ id: 'ftLbs', label: 'ft/lbs' },
	],
};

export const step1Options = [
	{
		type: 'input',
		key: 'height',
		label: 'your height',
		placeholder: 'ex: 168cm / 2.2ft',
		options: [],
	},
	{
		type: 'input',
		key: 'weight',
		label: 'your weight',
		placeholder: 'ex: 58kg/ 45lbs',
		options: [],
	},
	{
		type: 'input',
		key: 'age',
		placeholder: 'your age',
		options: [],
	},
	{
		type: 'dropdown',
		key: 'gender',
		placeholder: 'your gender',
		options: [
			{ value: 'male', label: 'male' },
			{ value: 'female', label: 'female' },
			{ value: 'not-specified', label: 'prefer not to say' },
		],
	},
];

export const step5Options = [
	{
		key: 'weight',
		placeholder: 'suggested goal weight',
		options: [],
	},
	{
		key: 'goal',
		placeholder: 'your goal',
		options: [
			{ value: 'lose weight', label: 'lose weight' },
			{ value: 'gain muscle', label: 'gain muscle' },
			{ value: 'healthy balance', label: 'healthy balance' },
		],
	},
	{
		key: 'pace',
		placeholder: 'your pace',
		options: [
			{ value: 'steady - 0.5kg/week', label: 'steady - 0.5kg/week' },
			{ value: 'fast - 1kg/week', label: 'fast - 1kg/week' },
		],
	},
];

export const step2Options = [
	{
		key: 'mealCount',
		placeholder: 'how often do you eat in a day',
		options: [
			{ value: '1 time', label: '1 time' },
			{ value: '2 times', label: '2 times' },
			{ value: '3 times', label: '3 times' },
			{ value: '4 times', label: '4 times' },
			{ value: '5 times', label: '5 times' },
			{ value: '6 times', label: '6 times' },
		],
	},
	{
		// use this in edit diet plan in dietary preferences component too
		key: 'dietaryPreferences',
		placeholder: 'dietary preferences',
		options: [
			{ value: 'omnivore', label: 'omnivore' },
			{ value: 'pescatarian', label: 'pescatarian' },
			{ value: 'vegetarian', label: 'vegetarian' },
			{ value: 'vegan', label: 'vegan' },
		],
	},
	{
		key: 'activityLevel',
		placeholder: 'how active are you',
		options: [
			{
				value: 'sedentary (little to no activity)',
				label: 'sedentary (little to no activity)',
			},
			{
				value: 'lightly active (1–2 times per week)',
				label: 'lightly active (1–2 times per week)',
			},
			{
				value: 'active (3-4 times per week)',
				label: 'active (3-4 times per week)',
			},
			{
				value: 'very active (daily intense activity)',
				label: 'very active (daily intense activity)',
			},
		],
	},
];

export const goalOptions = [
	{
		key: 'goal',
		placeholder: 'your goal',
		options: [
			{ value: 'lose weight', label: 'lose weight' },
			{ value: 'gain muscle', label: 'gain muscle' },
			{ value: 'healthy balance', label: 'healthy balance' },
		],
	},
	{
		key: 'pace',
		placeholder: 'your pace',
		options: [
			{ value: 'steady - 0.5kg/week', label: 'steady - 0.5kg/week' },
			{ value: 'fast - 1kg/week', label: 'fast - 1kg/week' },
		],
	},
];

export const activePace = {
	key: 'active',
	label: 'how active are you',
	options: [
		'sedentary',
		'lightly active (1-2x/ week)',
		'active (3-4x/week)',
		'very active (+4x/week)',
	],
};

export const notificationContent = {
	key: 'notification',
	label: 'notifications',
	options: [
		{ id: 'on', label: 'on' },
		{ id: 'off', label: 'off' },
	],
};

export const userInfoContent = [
	{
		type: 'radio',
		title: 'measurement system',
		key: 'measurement-system',
		options: [
			{ id: 'cm/kg', label: 'cm/kg' },
			{ id: 'ft/lbs', label: 'ft/lbs' },
		],
	},
	{ type: 'input', title: 'your height', key: 'height' },
	{ type: 'input', title: 'your weight', key: 'weight' },
	{ type: 'input', title: 'your age', key: 'age' },
	{
		type: 'gender',
		title: 'your gender',
		options: [
			{ title: 'male', icon: require('../assets/icons/male.png') },
			{
				title: 'female',
				icon: require('../assets/icons/female.png'),
			},
			{
				title: 'prefer not to say',
				icon: require('../assets/icons/none.png'),
			},
		],
		key: 'gender',
	},
]; 