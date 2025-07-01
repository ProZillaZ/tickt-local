import {
	ImageSourcePropType,
	KeyboardTypeOptions,
	TextInput,
} from "react-native";
import { colors } from "utils/styles";

export interface InputProps {
	mode?: string;
	placeholder?: string;
	value?: string;
	onClear?: () => void;
	onUpdate?: (text: string) => void;
	placeholderTextColor?: string;
	clearIcon?: ImageSourcePropType;
	leftIcon?: ImageSourcePropType | null;
	verficationIcon?: ImageSourcePropType;
	isVerfied?: boolean;
	label?: string;
	type?: string;
	inputStyle?: object;
	editable?: boolean | undefined;
	labelRight?: any;
	inputBoxStyle?: object;
	cursorColor?: string;
	inputRef?: React.LegacyRef<TextInput> | undefined;
	onSubmitEditing?: () => void;
	keyboardType?: KeyboardTypeOptions;
}

export const defaultInputProps = {
	clearIcon: require("../../../assets/icons/Cross-inCircle.png"),
	leftIcon: require("../../../assets/icons/search-icon.png"),
	verficationIcon: require("../../../assets/icons/CheckCircle.png"),
	placeholderTextColor: colors.yellowDark,
	cursorColor: colors.yellow,
	onClear: () => {},
	onUpdate: () => {},
	isVerfied: false,
	editable: true,
};

export interface UseInputPros {
	value: string | undefined;
	onUpdate: (text: string) => void;
	onClear: () => void;
	type?: string;
}

export interface UseInputReturn {
	localValue: string | undefined;
	handleUpdate: (text: string) => void;
	handleClear: () => void;
}
