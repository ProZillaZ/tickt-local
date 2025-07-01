import { useEffect, useState } from 'react';
import { UseDropdownReturn, DropdownItem, Select } from './dropdown.props';

export const useDropdown = (
    onSelect: Select['onSelect'],
    initialValue: { label: string; value: string } | null = null,
): UseDropdownReturn => {
    const [value, setValue] = useState<string | number | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    useEffect(() => {
        if (initialValue) {
            handleChange({ value: initialValue.value, label: initialValue.label });
        }
    }, []);
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);
    const handleChange = (item: DropdownItem) => {
        setValue(item.value);
        setIsFocus(false);
        onSelect(item.label, item.value);
    };

    return { value, isFocus, handleFocus, handleBlur, handleChange };
};
