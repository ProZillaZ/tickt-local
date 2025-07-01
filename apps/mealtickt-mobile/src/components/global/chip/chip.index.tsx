import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ChipProps } from "./chip.props";
import { styles } from "./chip.styles";

const Chip: React.FC<ChipProps> = ({ onSelect, onClose, isSelected, item }) => {
	return (
		<TouchableOpacity
			key={item.id}
			style={[
				styles.chipContainer,
				isSelected && styles.selectecdChipContainer,
			]}
			disabled={!onSelect}
			onPress={() => onSelect && onSelect(item.id)}
		>
			<Text
				style={[styles.chipText, isSelected && styles.selectedChipText]}
			>
				{item.label || item.name}
			</Text>
			<TouchableOpacity onPress={() => onClose(item.id)}>
				<Image
					source={require("../../../assets/icons/Cross-inCircle.png")}
					style={[
						styles.crossIcon,
						!isSelected && styles.selectedCrossIcon,
					]}
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);
};

export default Chip;
