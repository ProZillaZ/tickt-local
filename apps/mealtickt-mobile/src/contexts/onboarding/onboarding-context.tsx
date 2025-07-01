import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { OnboardingState } from './onboarding.types';
import { OnboardingService } from '../../services/onboarding/onboarding.service';
import { UsersApiService } from '../../services/api/users-api.service';

type OnboardingContextType = {
    onboardingState: Partial<OnboardingState> | null;
    isLoading: boolean;
    error: string | null;
    saveStep: (stepData: Partial<OnboardingState>) => Promise<void>;
    completeOnboarding: () => Promise<string>;
    resetOnboarding: () => Promise<void>;
    lastSlideRef: any;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [onboardingState, setOnboardingState] = useState<Partial<OnboardingState> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const lastSlideRef = useRef<{ targetWeight: number; goal: string; pace: string }>({
        targetWeight: 100,
        goal: 'steady - 0.5kg/week',
        pace: 'lose weight',
    });
    const usersApiService = new UsersApiService();
    const onboardingService = new OnboardingService(usersApiService);

    useEffect(() => {
        // Load onboarding state when the context is initialized
        const loadOnboardingState = async () => {
            try {
                setIsLoading(true);
                const state = await onboardingService.getOnboardingState();
                setOnboardingState(state);
            } catch (err) {
                setError('Failed to load onboarding state');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadOnboardingState();
    }, []);

    const saveStep = async (stepData: Partial<OnboardingState>): Promise<void> => {
        try {
            setIsLoading(true);
            await onboardingService.saveOnboardingState(stepData);
            setOnboardingState((prev) => ({ ...prev, ...stepData }));
            setError(null);
        } catch (err) {
            setError('Failed to save onboarding step');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const completeOnboarding = async (): Promise<string> => {
        try {
            setIsLoading(true);
            const userId = await onboardingService.completeOnboarding();
            // Mark onboarding as completed
            await saveStep({ isCompleted: true });
            return userId;
        } catch (err) {
            setError('Failed to complete onboarding');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const resetOnboarding = async (): Promise<void> => {
        try {
            setIsLoading(true);
            await onboardingService.clearOnboardingData();
            setOnboardingState(null);
            setError(null);
        } catch (err) {
            setError('Failed to reset onboarding');
            console.error(err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OnboardingContext.Provider
            value={{
                onboardingState,
                isLoading,
                error,
                saveStep,
                completeOnboarding,
                resetOnboarding,
                lastSlideRef,
            }}>
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboarding = (): OnboardingContextType => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboarding must be used within an OnboardingProvider');
    }
    return context;
};
