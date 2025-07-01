import { CoachScreen, ProgressScreen } from "screens/index";
import BottomNavAdditionalStack from "./stack/stack.index";

export const useBottomBar = () => {
	const screens = [
		{
			name: "my diet plan",
			Screen: BottomNavAdditionalStack,
			icon: require("../../assets/icons/plan.png"),
		},
		{
			name: "your progress",
			Screen: ProgressScreen,
			icon: require("../../assets/icons/progress.png"),
		},
		{
			name: "ai coach",
			Screen: CoachScreen,
			icon: require("../../assets/icons/ai.png"),
		},
	];
	return {
		screens,
	};
};
