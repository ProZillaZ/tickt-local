import { daysOfWeek, ingredientMenu, homeToggleOptions, shopMealsType } from 'app/constants/constants';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation/navigation.props';
import { State } from './home.props';
import { getCardIcon, getMonthWeeks } from 'utils/helpers.ts';

const initialState = {
	toggleOption: 0,
	currentWeek: 0,
	currentDay: 0,
	swappedRecipe: 0,
	currentShopMeal: 0,
	meats: [],
	dairy: [],
	fruits: [],
	vegetables: [],
	pantry: [],
	skipDays: [],
	repeatRecipeDays: [],
	repeatDays: [],
	mealLog: [],
};

export const useHome = () => {
	const [state, setState] = useState<State>(initialState);
	const [repeatRecipeModalOpen, setRepeatRecipeModalOpen] = useState<boolean>(false);
	const [repeatDaysModalOpen, setRepeatDaysModalOpen] = useState<boolean>(false);
	const [chatModalOpen, setChatModalOpen] = useState<boolean>(false);
	const [mealSwapModalOpen, setMealSwapModalOpen] = useState<boolean>(false);
	const [showCarousel, setShowCarousel] = useState<boolean>(false);
	const [showQuestionModal, setShowQuestionModal] = useState<boolean>(false);
	const { navigate } = useNavigation<NavigationProp<'profile'>>();

	const day = daysOfWeek[state.currentDay];
	const skipDay = state.skipDays.includes(daysOfWeek[state.currentDay]);
	const repeatDay = state.repeatDays.includes(daysOfWeek[state.currentDay]);
	const repeatRecipeDay = state.repeatRecipeDays.includes(daysOfWeek[state.currentDay]);
	const loggedMeal = state.mealLog.find(entry => entry.day == day);
	const repeatRecipeDays = daysOfWeek.map(day =>
		state.repeatRecipeDays.includes(day) || state.repeatDays.includes(day) ? getCardIcon('repeat') : day,
	);

	const updateState = (field: string, value: any) => setState(s => ({ ...s, [field]: value }));
	const handleToggleOption = (id: number) => updateState('toggleOption', id);
	const onWeekChange = (id: number) => updateState('currentWeek', id);
	const onDayChange = (id: number) => updateState('currentDay', id);
	const onShopMealChange = (id: number) => updateState('currentShopMeal', id);
	const onShopMealDataChange = (field: string, value: number[]) => updateState(field, value);
	const onUpdateSwappedRecipe = (field: string, value: string | number) => updateState(field, value);
	const onUpdateSkipDays = (field: string, value: string[]) => updateState(field, value);
	const onFilterPress = () => navigate('diet', { skipDays: state.skipDays, onUpdate: onUpdateSkipDays });
	const onRepeatPress = (type: boolean) => setRepeatDaysModalOpen(type);
	const onQuestionPress = (type: boolean) => setShowQuestionModal(type);
	const onChatStart = (type: string) => {
		onChatModalPress(true);
	};
	const onShowCaseOptionsPress = (type: boolean) => setRepeatRecipeModalOpen(type);
	const onChatModalPress = (type: boolean) => setChatModalOpen(type);
	const handleRepeatDays = (data: string[] | boolean) => updateState('repeatDays', data as string[]);
	const handleCarousel = (type: boolean) => setShowCarousel(type);
	const handleRepeatRecipeDays = (data: string[] | boolean) => {
		if (typeof data == 'boolean') handleMealLog(data);
		else updateState('repeatRecipeDays', data);
	};
	const handleMealLog = (type: boolean) => {
		const updatedMealLog = state.mealLog.some(entry => entry.day === day)
			? state.mealLog.map(entry => (entry.day === day ? { ...entry, log: type } : entry))
			: [...state.mealLog, { day, log: type }];

		updateState('mealLog', updatedMealLog);
	};

	useEffect(() => {
		const d = new Date().getDay();
		onDayChange(d - 1);
	}, []);

	useEffect(() => {
		if (!repeatDaysModalOpen && !repeatRecipeModalOpen && !chatModalOpen && !mealSwapModalOpen) handleCarousel(true);
		else handleCarousel(false);
	}, [repeatDaysModalOpen, repeatRecipeModalOpen, chatModalOpen, mealSwapModalOpen]);

	return {
		state,
		toggleOptions: homeToggleOptions.options,
		daysOfWeek: repeatRecipeDays,
		shopMealsType,
		isSkipDay: skipDay,
		isRepeatDay: repeatDay,
		isRepeatRecipeDay: repeatRecipeDay,
		isLoggedMeal: loggedMeal ? loggedMeal.log : 'none',
		repeatRecipeModalOpen,
		repeatDaysModalOpen,
		chatModalOpen,
		showCarousel,
		mealSwapModalOpen,
		showQuestionModal,
		handleToggleOption,
		onFilterPress,
		onRepeatPress,
		onQuestionPress,
		onWeekChange,
		onDayChange,
		onChatStart,
		onUpdateSwappedRecipe: onUpdateSwappedRecipe,
		onShopMealChange,
		onShopMealDataChange,
		onShowCaseOptionsPress,
		handleRepeatRecipeDays,
		handleRepeatDays,
		handleMealLog,
		onChatModalPress,
		setMealSwapModalOpen,
	};
};
