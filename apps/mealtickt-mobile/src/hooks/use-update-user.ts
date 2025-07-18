import { useAuth } from 'app/contexts/auth/auth';
import { useUserServiceAdapter } from 'app/services/user.service.ts';
import { showSuccess } from 'app/utils/toast-config';

export const useUpdateUser = () => {
	const { user, login } = useAuth();
	const userService = useUserServiceAdapter();

	const isEqual = (a: any, b: any): boolean => {
		if (a === b) return true;

		if (typeof a !== typeof b) return false;

		if (typeof a === 'object' && a !== null && b !== null) {
			const keysA = Object.keys(a);
			const keysB = Object.keys(b);
			if (keysA.length !== keysB.length) return false;

			return keysA.every((key) => isEqual(a[key], b[key]));
		}

		return false;
	};

	const updateUser = async (data: Partial<typeof user>) => {
		try {
			console.log('calling update user', user?.uid, user);
			if (user?.uid) {
				console.log('calling update user1');
				await userService.updateUserData(user.uid, data);
				console.log('calling update user2');
				const res = await userService.getUserData(user.uid);
				console.log('calling update user3');
				await login(res.data());
				console.log('calling update user4');
				showSuccess({ text: 'Changes saved' });
			}
		} catch (error) {
			console.log('error:', error);
			return false;
		}
	};

	return { user, isEqual, updateUser };
};
