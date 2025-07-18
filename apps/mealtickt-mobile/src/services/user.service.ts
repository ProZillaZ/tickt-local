/**
 * User Service Adapter for React Native
 * Wraps the shared FirestoreUserService with mobile-specific interfaces
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IUserService } from '@tickt-ltd/services/interfaces';
import { useUserService } from './services.provider';
import { onboarding } from 'app/contexts/auth/auth.types';

export class UserService {
  private userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getUserData(uid: string): Promise<FirebaseFirestoreTypes.DocumentData> {
    const user = await this.userService.getById(uid);
    return {
      id: user?.id || uid,
      data: () => user || null,
      exists: !!user,
    };
  }

  async storeUserData(uid: string, data: any): Promise<boolean> {
    try {
      await this.userService.create({ ...data, id: uid });
      return true;
    } catch (error) {
      console.error('Error storing user data:', error);
      return false;
    }
  }

  async updateUserData(uid: string, data: any): Promise<boolean> {
    try {
      await this.userService.update(uid, data);
      return true;
    } catch (error) {
      console.error('Error updating user data:', error);
      return false;
    }
  }

  async completeOnboarding(uid: string, data: any): Promise<FirebaseFirestoreTypes.DocumentData> {
    console.log('UID:', uid);
    console.log('Data:', data);

    // Update user with onboarding completion
    await this.userService.update(uid, {
      ...data,
      onboarding: onboarding.COMPLETED,
    });

    // Return updated user data
    const user = await this.userService.getById(uid);
    return {
      id: user?.id || uid,
      data: () => user || null,
      exists: !!user,
    };
  }
}

// Hook to get UserService instance
export const useUserServiceAdapter = (): UserService => {
  const userService = useUserService();
  return new UserService(userService);
};