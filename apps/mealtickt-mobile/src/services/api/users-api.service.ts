import { OnboardingState } from '../../contexts/onboarding/onboarding.types';
import { API } from '../../constants/api.constants';

export class UsersApiService {
	private baseUrl: string;

	constructor() {
		this.baseUrl = `${API.BASE_URL}/users`;
	}

	async createUser(userData: Partial<OnboardingState>): Promise<any> {
		try {
			// Extract onboarding-specific fields that don't belong in user profile
			const { currentStep, isCompleted, ...userProfile } = userData as any;

			const response = await fetch(this.baseUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userProfile),
			});

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Failed to create user:', error);
			throw error;
		}
	}

	async updateUser(userId: string, userData: Partial<OnboardingState>): Promise<any> {
		try {
			// Extract onboarding-specific fields that don't belong in user profile
			const { currentStep, isCompleted, ...userProfile } = userData as any;

			const response = await fetch(`${this.baseUrl}/${userId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userProfile),
			});

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Failed to update user:', error);
			throw error;
		}
	}

	async getUser(userId: string): Promise<any> {
		try {
			const response = await fetch(`${this.baseUrl}/${userId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`);
			}

			return await response.json();
		} catch (error) {
			console.error('Failed to get user:', error);
			throw error;
		}
	}
}
