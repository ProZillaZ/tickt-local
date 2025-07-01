import { getAnalytics } from '@react-native-firebase/analytics';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { getStorage } from '@react-native-firebase/storage';

export const auth = getAuth();
export const db = getFirestore();
export const storage=getStorage()
export const analyticsMobile=getAnalytics()