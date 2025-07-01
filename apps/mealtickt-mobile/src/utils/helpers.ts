import { Platform } from 'react-native';
import * as Device from 'expo-device';
import { colors } from './styles';

export const isIOS = Platform.OS === 'ios';
export const isTablet = Device.deviceType === Device.DeviceType.TABLET;
export const isEmail = (email: string) =>
	/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
		email,
	);
export const validatePassword = (password: string) =>
	/^(?=.*[!@#$%^&*(),.?":{}|<>]).{10,}$/.test(password);

export const getCardIcon = (name: string) => {
	if (name == 'breakfast') return require('../assets/icons/cup.png');
	else if (name == 'lunch') return require('../assets/icons/boul.png');
	else if (name == 'dinner') return require('../assets/icons/food.png');
	else if (name == 'snack') return require('../assets/icons/snack.png');
	else if (name == 'fire') return require('../assets/icons/fire.png');
	else if (name == 'chef-hat') return require('../assets/icons/chef-hat.png');
	else if (name == 'timer') return require('../assets/icons/timer.png');
	else if (name == 'dish') return require('../assets/icons/dish.png');
	else if (name == 'bellz') return require('../assets/icons/bellz.png');
	else if (name == 'repeat') return require('../assets/icons/repeat.png');
	else if (name == 'plus') return require('../assets/icons/plus.png');
	else if (name == 'minus') return require('../assets/icons/minus.png');
	else if (name == 'sad') return require('../assets/icons/sad.png');
	else if (name == 'award') return require('../assets/icons/award.png');
	else if (name == 'ai') return require('../assets/icons/ai.png');
	else if (name == 'enter') return require('../assets/icons/enter.png');
};

export const getColor = (type: string) => {
	if (type == 'carbs') return { color: colors.yellowDark };
	else if (type == 'protien') return { color: colors.yellowLight };
	else return { color: colors.neutrals };
};

const formatDay = (date: any) => {
	const day = date.getDate();
	const suffix = ['th', 'st', 'nd', 'rd'][((day % 100) - 20) % 10] || 'th';
	return `${day}${suffix}`;
};

const getCurrentWeek = (weeks: any) => {
	const today = new Date();
	const day = today.getDate();
	return weeks.findIndex((range: any) => {
		const [start, end] = range.match(/\d+/g).map(Number);
		return day >= start && day <= end;
	});
};

export const getMonthWeeks = (year: number, month: number) => {
	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const monthName = firstDay.toLocaleString('en-US', { month: 'short' });

	let weeks = [],
		start = new Date(firstDay);

	while (start <= lastDay) {
		let end = new Date(start);
		end.setDate(start.getDate() + 6);
		if (end > lastDay) end = lastDay;
		weeks.push(
			`${monthName.toLocaleLowerCase()} ${formatDay(start)} - ${formatDay(
				end,
			)}`,
		);
		start.setDate(start.getDate() + 7);
	}

	return {
		weeks,
		currentWeek: getCurrentWeek(weeks),
	};
};
