import {
    doc,
    FirebaseFirestoreTypes,
    getDoc,
    setDoc,
    updateDoc,
} from '@react-native-firebase/firestore';
import { IDbService } from './interfaces/db-service.interface.ts';
import { db } from 'firebaseConfig';
import { onboarding } from 'app/contexts/auth/auth.types';
import { useAuth } from 'app/contexts/auth/auth';

export class DbService implements IDbService {
    async getUserData(uid: string): Promise<FirebaseFirestoreTypes.DocumentData> {
        const res = await getDoc(doc(db, 'users', uid));
        return res;
    }

    async storeUserData(uid: string, data: any): Promise<boolean> {
        const res = await setDoc(doc(db, 'users', uid), data);
        return true;
    }
    async updateUserData(uid: string, data: any): Promise<boolean> {
        const res = await updateDoc(doc(db, 'users', uid), data);
        return true;
    }

    async completeOnboarding(uid: string, data: any): Promise<FirebaseFirestoreTypes.DocumentData> {
        console.log('UID:', uid);
        console.log('Data:', data);

        await updateDoc(doc(db, 'users', uid), {
            ...data,
            onboarding: onboarding.COMPLETED,
        });
        const user = await this.getUserData(uid);
        return user.data();
    }
}
