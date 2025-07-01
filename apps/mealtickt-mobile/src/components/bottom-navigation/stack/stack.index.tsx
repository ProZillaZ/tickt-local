import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DietPlanScreen, HomeScreen, ProfileScreen, RecipeDetailScreen } from 'screens/index';


const Stack = createNativeStackNavigator();
export default function BottomNavAdditionalStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
			<Stack.Screen name="home" component={HomeScreen} />
			<Stack.Screen name="profile" component={ProfileScreen} />
			<Stack.Screen name="diet" component={DietPlanScreen} />
			<Stack.Screen name="recipe-detail" component={RecipeDetailScreen} />
		</Stack.Navigator>
	);
}
