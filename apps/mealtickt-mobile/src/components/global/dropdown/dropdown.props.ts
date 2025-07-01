export interface DropdownItem {
    label: string;
    value: string | number;
}

export interface Select {
    onSelect: (label: string | number, value: string | number) => void;
}

export interface DropdownProps {
    data: DropdownItem[];
    placeholder?: string;
    onSelect: Select['onSelect'];
    label?: string;
    validate?: boolean;
    onValidateClick?: Function;
    initialValue?: { label: string; value: string } | null;
}

export interface UseDropdownReturn {
    value: string | number | null;
    isFocus: boolean;
    handleFocus: () => void;
    handleBlur: () => void;
    handleChange: (item: DropdownItem) => void;
}
