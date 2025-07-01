import Login from 'components/auth/login/login.index';
import Register from 'components/auth/register/register.index';

export interface Slide {
	id: string,
	component: React.FC;
}

export const slides: Slide[] = [
	{
		id: '1',
		component: Register, // Dynamically require the Slide2 component
	},
	{
		id: '2',
		component: Login, // Dynamically require the Slide2 component
	},
];
