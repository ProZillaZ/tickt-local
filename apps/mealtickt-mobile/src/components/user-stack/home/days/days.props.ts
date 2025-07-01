import { ImageSourcePropType } from 'react-native';

export interface UseWeekDayProps {
	daysOfWeek: [string | ImageSourcePropType];
	defaultDay: number;
	onChangeDay: (id: number) => void;
	skipDays?: string[];
	style?: object;
}
