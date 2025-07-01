import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { styles } from "./header.styles";
import { HeaderProps } from "./header.props";

const HeaderContent: React.FC<HeaderProps> = ({
	onFilterPress,
	onQuestionPress,
	onRepeatModePress,
	isRepeatDayMode,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.headContainer}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>my diet plan</Text>
					<Text style={styles.description}>
						custom-made for you, based on your profile.
					</Text>
				</View>
				<TouchableOpacity
					onPress={onFilterPress}
					style={styles.filterContainer}
				>
					<Image
						style={styles.filterLogo}
						source={require("../../../../assets/icons/filter.png")}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.subContainer}>
				<View style={styles.leftContainer}>
					<Image
						style={styles.targetLogo}
						source={require("../../../../assets/icons/target.png")}
					/>
					<Text style={styles.text}>56%</Text>
					<Pressable onPress={onQuestionPress}>
						<Text style={styles.question}>what's this?</Text>
					</Pressable>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.text}>repeat days</Text>
					<Pressable onPress={onRepeatModePress}>
						<Text style={styles.repeatMode}>
							{isRepeatDayMode ? "on" : "off"}
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

export default HeaderContent;
