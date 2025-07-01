import { Platform, Dimensions } from 'react-native';
import * as Device from 'expo-device';
// Platform-specific helpers
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = false;
export const isTablet = Device.deviceType === Device.DeviceType.TABLET;

// Add any native-specific utilities here
export const getNativeDimensions = () => {
	return Dimensions.get('window');
};
