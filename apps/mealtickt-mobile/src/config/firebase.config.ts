/**
 * Firebase Configuration for React Native
 * Supports both development and production environments
 */

import { getAnalytics } from '@react-native-firebase/analytics';
import { getAuth } from '@react-native-firebase/auth';
import { getFirestore } from '@react-native-firebase/firestore';
import { getStorage } from '@react-native-firebase/storage';

// Environment detection
const isDev = __DEV__;

// Firebase configuration
export const firebaseConfig = {
  // Firebase is configured via google-services.json/GoogleService-Info.plist
  // Environment switching happens at build time
  projectId: isDev ? 'tickt-90f02' : 'tickt-prod',
  region: isDev ? 'us-central1' : 'europe-west1',
};

// Firebase service instances
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const analytics = getAnalytics();

// Legacy exports for compatibility
export const analyticsMobile = analytics;

export default {
  auth,
  db,
  storage,
  analytics,
  config: firebaseConfig,
};