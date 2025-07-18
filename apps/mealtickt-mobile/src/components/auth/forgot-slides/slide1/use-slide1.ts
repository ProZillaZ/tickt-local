import { useState } from "react";
import { UseSlide1Props } from "./slide1.props";
import { showSuccess } from "app/utils/toast-config";
import { useAuthServices } from "app/services/auth.service.adapter.ts";
const initialState = { email: "" };
export const useSlide1 = ({ handleNext }: UseSlide1Props) => {
    const [state, setState] = useState(initialState);
    const authServices = useAuthServices();

    const onStateChange = (field: string, value: string) => {
        setState((s) => ({ ...s, [field]: value }));
    };

    const onSubmit = async () => {
        if (!state.email) {
            showSuccess({ text: "Enter email!" });
            return;
        }

        try {
            const res = await authServices.forgotPassword(state.email);

            showSuccess({ text: "Password reset email sent!" });
        } catch (error: any) {
            console.log("Error:", error, error.code);
            let errorMessage = "Something went wrong. Please try again.";

            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage = "The email address is not valid.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "No user found with this email.";
                    break;
                case "auth/too-many-requests":
                    errorMessage = "Too many attempts. Try again later.";
                    break;
                default:
                    errorMessage = error.message || errorMessage;
                    break;
            }
            showSuccess({ text: errorMessage });
        }
    };

    return {
        state,
        onStateChange,
        onSubmit,
    };
};
