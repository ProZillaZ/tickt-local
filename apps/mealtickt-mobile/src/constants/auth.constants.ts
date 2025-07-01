export const authToggleOptions = {
	default: 0,
	options: ['new user', 'returning user'],
};

export const authenticateThroughOptions = [
	{ icon: require('../assets/icons/mail.png'), text: 'continue with email' },
	{
		icon: require('../assets/icons/facebook.png'),
		text: 'continue with facebook',
	},
	{
		icon: require('../assets/icons/apple.png'),
		text: 'continue with apple id',
	},
	{
		icon: require('../assets/icons/google.png'),
		text: 'continue with google',
	},
]; 