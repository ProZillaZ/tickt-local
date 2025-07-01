import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./selection.styles";
import { useDaySelection } from "./use-day-selection.ts";
import InfoModal from "components/global/info-modal/info-modal.index.tsx";
import { DaySelectionProps, defaultProps } from "./selection.props";

const DaySelection: React.FC<DaySelectionProps> = ({
	style,
	onChange,
	defaultValue,
	showHeader = defaultProps.showHeader,
}) => {
	const { days, selectedDays, visible, setVisible, toggleDay, error } =
		useDaySelection({ onChange, defaultValue });

	return (
		<View style={[styles.container, style]}>
			{showHeader && (
				<View style={styles.headerContainer}>
					<Text style={styles.title}>
						do you want to skip any diet any days?
					</Text>
					<Pressable onPress={() => setVisible(true)}>
						<Image
							source={require("../../../assets/icons/warning.png")}
							style={styles.info}
						/>
					</Pressable>
				</View>
			)}
			<View style={styles.daysContainer}>
				{days.map((day) => (
					<TouchableOpacity
						key={day.id}
						style={[
							styles.dayButton,
							selectedDays.includes(day.id) &&
								styles.selectedDayButton,
						]}
						onPress={() => toggleDay(day.id)}
					>
						<Text
							style={[
								styles.dayText,
								selectedDays.includes(day.id) &&
									styles.selectedDayText,
							]}
						>
							{day.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			{error && (
				<Text style={{ color: 'red', marginTop: 5 }}>
					{error}
				</Text>
			)}
			<InfoModal
				visible={visible}
				setVisible={() => setVisible(false)}
				heading="what's skip diet days?"
				description={`this option allows you to skip specific days in your diet plan. you can select up to 2 days. use it if it suits your needs!`}
			/>
		</View>
	);
};

export default DaySelection;
