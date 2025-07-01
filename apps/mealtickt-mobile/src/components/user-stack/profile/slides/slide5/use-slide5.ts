import { useEffect, useRef, useState } from 'react';
import { Slide5Props } from './slide5.props';
import { notificationContent } from 'app/constants/constants';
import { TextInput } from 'react-native';
import { useAuth } from 'app/contexts/auth/auth';

const initialState = { notification: 'off', email: 'john.doe@gmail.com', password: 'mypassword' };
const initialEditable = { email: false, password: false };
export const useSlide5 = ({ handleNext }: Partial<Slide5Props>) => {
    const { user } = useAuth();
    const [state, setState] = useState({
        notification: user?.notification || initialState.notification,
        email: user?.email,
        password: 'mypassword',
    });
    const [editable, setEditable] = useState(initialEditable);
    const inputRef = useRef<TextInput | null>(null);

    const updateState = (field: string, value: string) =>
        setState((s) => ({ ...s, [field]: value }));
    const handleBack = () => handleNext && handleNext(0);
    const handleEditable = (field: string, value: boolean) =>
        setEditable((s) => ({ ...s, [field]: !value }));

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 500);
    }, [editable]);

    return {
        state,
        radioData: notificationContent,
        editable,
        inputRef,
        updateState,
        handleEditable,
        handleBack,
    };
};
