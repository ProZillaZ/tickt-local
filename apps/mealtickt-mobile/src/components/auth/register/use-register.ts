import { useAuth } from 'app/contexts/auth/auth';
import { AuthServices } from 'app/services/auth.service.ts';
import { showSuccess } from 'app/utils/toast-config';
import { useState } from 'react';

const authServices = new AuthServices();
const initialState = { email: '', password: '' };
export const useRegister = () => {
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const handleChange = (field: string, value: string | number) => {
        setState((s) => ({ ...s, [field]: value }));
    };
    const onSubmit = async () => {
        if (!state.email || !state.password) {
            showSuccess({ text: 'All fields are mandatory!' });
            return;
        }
        if (state.password.length <= 7) {
            showSuccess({ text: 'Password must be 8 characters long' });
            return;
        }

        try {
            setLoading(true);
            const userInfo = await authServices.signUp(state.email, state.password);
            await login(userInfo);
        } catch (error: any) {
            console.log('error :', error);

            let message = 'An unknown error occurred. Please try again.';

            switch (error.code) {
                case 'auth/email-already-in-use':
                    message = 'This email is already in use. Please try logging in.';
                    break;
                case 'auth/invalid-email':
                    message = 'The email address is not valid.';
                    break;
                case 'auth/operation-not-allowed':
                    message = 'Email/password accounts are not enabled.';
                    break;
                case 'auth/weak-password':
                    message = 'The password is too weak. It must be at least 8 characters.';
                    break;
                case 'auth/network-request-failed':
                    message = 'Network error. Please check your connection and try again.';
                    break;
                case 'auth/internal-error':
                    message = 'An internal error occurred. Please try again later.';
                    break;
                default:
                    message = error.message;
                    break;
            }
            showSuccess({ text: message });
        } finally {
            setLoading(false);
        }
    };

    return {
        state,
        handleChange,
        onSubmit,
        loading,
    };
};
