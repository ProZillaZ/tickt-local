import Toast from 'react-native-toast-message';

export const handleApiError = (error: any): void => {
	console.error('API Error:', error);

	let errorMessage = 'An unexpected error occurred';

	if (error instanceof Error) {
		errorMessage = error.message;
	}

	Toast.show({
		type: 'error',
		text1: 'Error',
		text2: errorMessage,
		position: 'bottom',
	});
};
