import { useEffect, useRef, useState } from 'react';
import { option, Slide3Props } from './slide3.props';
import { userInfoContent } from 'app/constants/constants';
import { TextInput } from 'react-native';
import { useAuth } from 'app/contexts/auth/auth';

const initialState = {
    measurement_system: 'ft/lbs',
    height: '178',
    age: '32',
    gender: 'female',
    weight: '60',
};

export const useSlide3 = ({ handleNext }: Partial<Slide3Props>) => {
    const { user } = useAuth();
    const [state, setState] = useState({
        measurement_system: user?.measurementSystem || initialState.measurement_system,
        height: user?.height || initialState.height,
        age: user?.age || initialState.age,
        gender: user?.gender || initialState.gender,
        weight: user?.weight || initialState.weight,
    });
    const [isEditMode, setIsEditMode] = useState({ weight: false, height: false, age: false });
    const inputRef = useRef<TextInput | null>(null);

    const toggleEditMode = (field: string, value: boolean) =>
        setIsEditMode((s) => ({ ...s, [field]: value }));
    const updateState = (field: string, value: string) =>
        setState((s) => ({ ...s, [field]: value }));
    const handleBack = () => handleNext && handleNext(0);
    const getUnit = (item: option) => {
        if (item.key == 'age') return '';
        if (state.measurement_system == 'ftlbs') return item.key == 'height' ? 'ft' : 'lbs';
        return item.key == 'height' ? 'cm' : 'kg';
    };

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 500);
    }, [isEditMode]);

    return {
        state,
        data: userInfoContent,
        isEditMode,
        inputRef,
        toggleEditMode,
        handleBack,
        updateState,
        getUnit,
    };
};
