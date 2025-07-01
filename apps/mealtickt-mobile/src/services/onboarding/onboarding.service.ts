import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingState } from '../../contexts/onboarding/onboarding.types';
import { UsersApiService } from '../api/users-api.service';
import { handleApiError } from '../../utils/error-handling';

export class OnboardingService {
	private static STORAGE_KEY = 'onboarding';
	private usersApiService: UsersApiService;

	constructor(usersApiService: UsersApiService) {
		this.usersApiService = usersApiService;
	}

	// Get current onboarding state from local storage
	async getOnboardingState(): Promise<OnboardingState | null> {
		try {
			const data = await AsyncStorage.getItem(OnboardingService.STORAGE_KEY);
			return data ? JSON.parse(data) : null;
		} catch (error) {
			console.error('Failed to get onboarding state:', error);
			return null;
		}
	}

	// Save onboarding state locally
	async saveOnboardingState(state: Partial<OnboardingState>): Promise<void> {
		try {
			const currentState = await this.getOnboardingState() || {};
			const newState = { ...currentState, ...state };
			await AsyncStorage.setItem(
				OnboardingService.STORAGE_KEY,
				JSON.stringify(newState),
			);
		} catch (error) {
			console.error('Failed to save onboarding state:', error);
			throw error;
		}
	}

	// Save completed onboarding data to API
	async completeOnboarding(): Promise<string> {
		try {
			const onboardingData = await this.getOnboardingState();

			if (!onboardingData) {
				throw new Error('No onboarding data found');
			}

			// Create user in the API
			const user = await this.usersApiService.createUser(onboardingData);

			// Save user ID to AsyncStorage for future reference
			await AsyncStorage.setItem('userId', user.uid);

			return user.uid;
		} catch (error) {
			handleApiError(error);
			throw error;
		}
	}

	// Clear onboarding data (useful for testing/logout)
	async clearOnboardingData(): Promise<void> {
		try {
			await AsyncStorage.removeItem(OnboardingService.STORAGE_KEY);
		} catch (error) {
			console.error('Failed to clear onboarding data:', error);
			throw error;
		}
	}
}
