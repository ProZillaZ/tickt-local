import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useWeekDays } from './use-days-selection.ts';
import { styles } from './days.styles';
import { UseWeekDayProps } from './days.props';

const WeekDays = ({ daysOfWeek, defaultDay, onChangeDay, skipDays, style }: UseWeekDayProps) => {
	const { activeDay, days, handleDayPress } = useWeekDays({ daysOfWeek, defaultDay, onChangeDay });

	return (
		<View style={[styles.container, style]}>
			{
				days.map((day, index) => (
					<TouchableOpacity key={index} onPress={() => handleDayPress(index)} style={styles.dayContainer}>
						{typeof day === 'string' ?
							<Text
								style={[styles.day, index === activeDay && styles.activeDay, skipDays?.includes(day) && styles.dayStrikeThrough]}>{day}</Text>
							:
							<Image style={[styles.icon, index === activeDay && styles.iconActive]} source={day} />
						}
						<View style={styles.borderBottomContainer}>
							<View style={[styles.borderBottom, index === activeDay && styles.activeBorder]} />
						</View>
					</TouchableOpacity>
				))
			}
		</View>
	);
};

export default WeekDays;
