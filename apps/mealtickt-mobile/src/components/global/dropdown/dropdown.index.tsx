import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "./dropdown.props";
import styles from "./dropdown.styles";
import { useDropdown } from "./use-dropdown.ts";

const DropdownComponent: React.FC<DropdownProps> = ({
	data,
	placeholder,
	onSelect,
	label,
	validate = false,
	onValidateClick = () => {},
	initialValue
	
}) => {
	const { value, isFocus, handleFocus, handleBlur, handleChange } =
		useDropdown(onSelect,initialValue); 
	const renderItem = (item: DropdownProps) => {
		return (
			<View style={styles.selectionContainer}>
				<Text style={styles.selectedTextContainer}>{item.label}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				{label && <Text style={styles.label}>{label}</Text>}
				{validate && (
					<TouchableOpacity onPress={() => onValidateClick()}>
						<Image
							source={require("../../../assets/icons/warning.png")}
							style={styles.validationIcon}
						/>
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.dropDownContainer}>
				<Dropdown
					placeholderStyle={styles.selectedText}
					selectedTextStyle={styles.selectedText}
					iconStyle={styles.icon}
					data={data}
					maxHeight={300}
					labelField="label"
					valueField="value"
					placeholder={!isFocus ? placeholder || "select" : "..."}
					value={value}
					onFocus={() => handleFocus()}
					onBlur={() => handleBlur()}
					onChange={(e) => handleChange(e)}
					renderItem={renderItem}
					renderRightIcon={() => (
						<Image
							source={require("../../../assets/icons/arrowDown.png")}
							style={styles.icon}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export default DropdownComponent;
