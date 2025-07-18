/**
 * Auth Service Adapter Hook
 * Creates AuthServices instance with injected UserService
 */

import { AuthServices } from './auth.service';
import { useUserServiceAdapter } from './user.service';

export const useAuthServices = (): AuthServices => {
  const userService = useUserServiceAdapter();
  return new AuthServices(userService);
};