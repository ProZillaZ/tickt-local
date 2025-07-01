import { Image, Text, TextInput, View } from 'react-native';
import React from 'react';
import { defaultInputProps, InputProps } from './input.props';
import { styles } from './input.styles';
import { useInput } from './use-input.ts';

const Input: React.FC<InputProps> = ({
 	mode,
	placeholder,
	value,
	onClear = defaultInputProps.onClear,
	onUpdate = defaultInputProps.onUpdate,
	placeholderTextColor = defaultInputProps.placeholderTextColor,
	cursorColor = defaultInputProps.cursorColor,
	clearIcon = defaultInputProps.clearIcon,
	leftIcon = defaultInputProps.leftIcon,
	verficationIcon = defaultInputProps.verficationIcon,
	label = '',
	isVerfied = defaultInputProps.isVerfied,
	type,
	inputStyle,
	editable = defaultInputProps.editable,
	labelRight,
	inputBoxStyle,
	inputRef,
	onSubmitEditing,
	keyboardType,
}) => {
	const { localValue, handleUpdate } = useInput({ value, onUpdate, onClear, type });
	return (
		<View style={[mode === 'primary' && styles.primaryContainer]}>
			<View style={styles.labelContainer}>
				{label && <Text style={styles.label}>{label}</Text>}
				{labelRight && labelRight}
				{isVerfied && <Image source={verficationIcon} style={[styles.verified]} />}
			</View>
			<View style={[styles.searchBar, mode && styles.primaryInput, inputBoxStyle]}>
				{leftIcon && <Image source={leftIcon} style={styles.searchIcon} />}
				<TextInput
					ref={inputRef}
					editable={editable}
					multiline={false}
					style={[styles.input, inputStyle]}
					placeholder={placeholder}
					value={localValue}
					onChangeText={handleUpdate}
					autoCapitalize="none"
					placeholderTextColor={placeholderTextColor}
					cursorColor={cursorColor}
					selectionColor={cursorColor}
					returnKeyType="next"
					blurOnSubmit={false}
					onSubmitEditing={onSubmitEditing}
					keyboardType={keyboardType}
				/>
			</View>
		</View>
	);
};

export default Input;
