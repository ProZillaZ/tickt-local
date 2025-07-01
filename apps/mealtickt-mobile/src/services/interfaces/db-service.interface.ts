import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IDbService {
	getUserData(uid: string): Promise<FirebaseFirestoreTypes.DocumentData>;

	storeUserData(uid: string, data: any): Promise<boolean>;

	completeOnboarding(uid: string, data: any): Promise<FirebaseFirestoreTypes.DocumentData>;
}
