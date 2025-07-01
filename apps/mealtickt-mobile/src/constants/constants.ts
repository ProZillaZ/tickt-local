import { Platform } from 'react-native';
import { getCardIcon } from '../utils/helpers';
// import {
// 	ingredientMenu as ingredientMenuData,
// } from '@tickt-engineering/diet-gen-lib/src/data/ingredients/ingredient-menu.data';
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
    { id: 120, name: 'Clams' },
];
// Import the ingredient menu from the diet-gen-lib
export const ingredientMenu = ingredientMenuData.map((item) => ({
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
    { id: 'mustard', label: 'mustard' },
    { id: 'corn', label: 'corn' },
];

export const days = [
    { id: 'mon', label: 'mon' },
    { id: 'tue', label: 'tue' },
    { id: 'wed', label: 'wed' },
    { id: 'thu', label: 'thu' },
    { id: 'fri', label: 'fri' },
    { id: 'sat', label: 'sat' },
    { id: 'sun', label: 'sun' },
];

export const ingredientOptions = [
    { id: 'actualWeight', label: 'actual weight' },
    { id: 'servings', label: 'servings' },
];

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

export const slide3SingleOption = {
    key: 'ingredientMeasurement',
    label: 'ingredient measurement',
    options: [
        { id: 'actualWeight', label: 'actual weight' },
        { id: 'servings', label: 'servings' },
    ],
};

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

export const loadingContent = [
    {
        title: 'creating your personalized diet plan',
        description: 'this can take a few moments',
    },
    {
        title: 'loading your diet plan',
        description: 'this can take a few moments',
    },
];

export const authLoadingContent = [
    {
        title: 'thank you',
        description: `the reset password email should be in your inbox in a few minutes.\n\nplease check your spam folder if it doesn't arrive in your inbox.`,
    },
];

export const authToggleOptions = {
    default: 0,
    options: ['new user', 'returning user'],
};

export const authenticateThroughOptions = [
    { id: 'email', icon: require('../assets/icons/mail.png'), text: 'continue with email' },
    // {
    // 	icon: require('../assets/icons/facebook.png'),
    // 	text: 'continue with facebook',
    // },
    Platform.OS === 'ios' && {
        id: 'apple',
        icon: require('../assets/icons/apple.png'),
        text: 'continue with apple id',
    },
    {
        id: 'google',
        icon: require('../assets/icons/google.png'),
        text: 'continue with google',
    },
].filter(Boolean);

export const weeks = [
    'dec 2nd - 8th',
    'dec 9th - 15th',
    'dec 16th - 22nd',
    'dec 23rd - 29th',
    'dec 30th - jan 5th',
];

export const homeToggleOptions = {
    default: 0,
    options: ['recipes', 'shopping list'],
};

export const showcaseContent = [
    {
        id: 5,
        image: require('../assets/images/4.jpeg'),
        title: 'high-protein breakfast scramble',
        type: 'ad',
        time: '25 mins',
    },
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
    options: ['log your meals', 'rate recipes', 'swap to get the recipes you love'],
};

export const tipContentOrder = {
    title: 'one click order',
    subTitle: 'order everything in your shopping list with 1 click, right here.',
    buttonText: 'order now',
};

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

export const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const shopMealsType = ['all meals', 'breakfast', 'lunch', 'dinner', 'snacks'];

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

export const userInfoContent = [
    {
        type: 'radio',
        title: 'measurement system',
        key: 'measurement-system',
        options: [
            { id: 'cmKg', label: 'cmkg' },
            { id: 'ftlbs', label: 'ftlbs' },
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

export const planContent = [
    { duration: '1 month', price: 14.99 },
    { duration: '3 months', price: 39.99 },
    { duration: '1 year', price: 119.99 },
];

export const notificationContent = {
    key: 'notification',
    label: 'notifications',
    options: [
        { id: 'on', label: 'on' },
        { id: 'off', label: 'off' },
    ],
};

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
        'sedentary (little to no activity)',
        'lightly active (1–2 times per week)',
        'active (3-4 times per week)',
        'very active (daily intense activity)',
    ],
};

export const swapMeal = [
    { label: 'grilled chicken and vegetable skewers', duration: '25 min' },
    { label: 'grilled chicken and quinoa bowl', duration: '25 min' },
    { label: 'grilled chicken with quinoa and vegetables', duration: '25 min' },
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

export const recipeOtherOptions = ['repeat recipe', 'log meal'];

export const recipeMealLogOptions = [
    { label: "yes, I've had this meal", icon: getCardIcon('plus') },
    { label: "no, i've skipped this meal", icon: getCardIcon('minus') },
];

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
        msg: "here's what you should know about selecting recipes for your health in the long run",
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

export const loadingAnimation = require('../../assets/animations/loading.json');

export const logo = require('../../assets/logo4x.png');
