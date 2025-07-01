import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { loadingAnimation } from 'app/constants/constants';

export default function LoadingIndicator() {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 8 }}>
			<LottieView
				autoPlay
				style={{
					width: 200,
					height: 120,
				}}
				source={loadingAnimation}
			/>
		</View>
	);
}
