import {
    daysOfWeek,
    ingredientMenu,
    homeToggleOptions,
    shopMealsType,
} from 'app/constants/constants';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from 'app/navigation/navigation.props';
import { State } from './home.props';
import { getCardIcon, getMonthWeeks } from 'utils/helpers.ts';
import {
    GoalPace,
    UnitSystem,
    WeekMealPlan,
    DietGoal,
    DietType,
    ActivityLevel,
    Gender,
} from '@tickt-ltd/types';
import { useAxios } from 'app/hooks/useAxios';
import { useAuth } from 'app/contexts/auth/auth';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import {
    DataItem,
    ShopOption,
} from 'app/components/user-stack/home/shop-collapsibles/shop-collapsibles.props';
import { TargetWeightService } from '@tickt-ltd/diet-gen-lib';

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

    const { axiosInstance } = useAxios();
    const { user } = useAuth();

    const day = daysOfWeek[state.currentDay];
    const skipDay = state.skipDays.includes(daysOfWeek[state.currentDay]);
    const repeatDay = state.repeatDays.includes(daysOfWeek[state.currentDay]);
    const repeatRecipeDay = state.repeatRecipeDays.includes(daysOfWeek[state.currentDay]);
    const loggedMeal = state.mealLog.find((entry) => entry.day == day);
    const repeatRecipeDays = daysOfWeek.map((day) =>
        state.repeatRecipeDays.includes(day) || state.repeatDays.includes(day)
            ? getCardIcon('repeat')
            : day,
    );

    const updateState = (field: string, value: any) => setState((s) => ({ ...s, [field]: value }));
    const handleToggleOption = (id: number) => updateState('toggleOption', id);
    const onWeekChange = (id: number) => updateState('currentWeek', id);
    const onDayChange = (id: number) => updateState('currentDay', id);
    const onShopMealChange = (id: number) => updateState('currentShopMeal', id);
    const onShopMealDataChange = (field: string, value: number[]) => updateState(field, value);
    const onUpdateSwappedRecipe = (field: string, value: string | number) =>
        updateState(field, value);
    const onUpdateSkipDays = (field: string, value: string[]) => updateState(field, value);
    const onFilterPress = () =>
        navigate('diet', { skipDays: state.skipDays, onUpdate: onUpdateSkipDays });
    const onRepeatPress = (type: boolean) => setRepeatDaysModalOpen(type);
    const onQuestionPress = (type: boolean) => setShowQuestionModal(type);
    const onChatStart = (type: string) => {
        onChatModalPress(true);
    };
    const onShowCaseOptionsPress = (type: boolean) => setRepeatRecipeModalOpen(type);
    const onChatModalPress = (type: boolean) => setChatModalOpen(type);
    const handleRepeatDays = (data: string[] | boolean) =>
        updateState('repeatDays', data as string[]);
    const handleCarousel = (type: boolean) => setShowCarousel(type);
    const handleRepeatRecipeDays = (data: string[] | boolean) => {
        if (typeof data == 'boolean') handleMealLog(data);
        else updateState('repeatRecipeDays', data);
    };
    const handleMealLog = (type: boolean) => {
        const updatedMealLog = state.mealLog.some((entry) => entry.day === day)
            ? state.mealLog.map((entry) => (entry.day === day ? { ...entry, log: type } : entry))
            : [...state.mealLog, { day, log: type }];

        updateState('mealLog', updatedMealLog);
    };

    useEffect(() => {
        const d = new Date().getDay();
        onDayChange(d - 1);
    }, []);

    useEffect(() => {
        if (!repeatDaysModalOpen && !repeatRecipeModalOpen && !chatModalOpen && !mealSwapModalOpen)
            handleCarousel(true);
        else handleCarousel(false);
    }, [repeatDaysModalOpen, repeatRecipeModalOpen, chatModalOpen, mealSwapModalOpen]);

    const getRecipesQuery = useQuery({
        queryKey: ['recipes'],
        queryFn: () =>
            axiosInstance
                .get<WeekMealPlan[]>(`/meal-plans/user/${user?.uid}`)
                .then((res) => res.data), // unwrap the array
    });
    // once the query has data, pull out the dayPlans
    const allDayPlans = getRecipesQuery.data?.[0]?.dayPlans ?? [];
    // find the plan whose date is “today”
    const todayPlan = allDayPlans.find(
        (plan) => moment(plan.date).isoWeekday() - 1 === state.currentDay,
    );
    // if you just want the meals for today:
    const todaysMeals = todayPlan?.meals ?? [];

    const flatIngredients = todaysMeals.flatMap((meal) => meal.ingredients);

    const options: ShopOption[] = flatIngredients.map((ing, idx) => ({
        id: idx,
        item: ing.name,
        quantity: ing.amount,
        unit: ing.unit,
        // if you ever have otherQuantity/otherUnit you can add them here
    }));

    // wrap that single DataItem in an array, since your component
    // does todayShoppingList?.map(...)
    const todayShoppingList: DataItem[] = [
        {
            heading: 'heading',
            options,
        },
    ];

    const estimateTime = () => {
        const targetWeightService = new TargetWeightService();
        return targetWeightService.calculateTimeToReachGoal(
            Number(user?.weight),
            Number(user?.targetWeight),
            user?.pace as GoalPace,
            user?.measurementSystem === 'cmKg' ? UnitSystem.METRIC : UnitSystem.IMPERIAL,
        );
    };

    // Helper function to map app activity levels to service enum
    const mapActivityLevel = (activityLevel?: string): ActivityLevel => {
        switch (activityLevel?.toLowerCase()) {
            case 'sedentary':
                return ActivityLevel.SEDENTARY;
            case 'light':
                return ActivityLevel.LIGHTLY_ACTIVE;
            case 'moderate':
                return ActivityLevel.MODERATELY_ACTIVE;
            case 'very active':
                return ActivityLevel.VERY_ACTIVE;
            default:
                return ActivityLevel.LIGHTLY_ACTIVE;
        }
    };

    const generateMealPlans = async (startDate?: Date, endDate?: Date): Promise<WeekMealPlan[]> => {
        const userProfile = {
            id: user?.uid || 'temp-user-id',
            email: user?.email || 'temp@example.com',
            age: Number(user?.age) || 25,
            gender: user?.gender === 'male' ? Gender.MALE : Gender.FEMALE,
            heightCm: Number(user?.height) || 170,
            weightKg: Number(user?.weight) || 70,
            activityLevel: mapActivityLevel(user?.activityLevel),
            goal: (user?.goal as DietGoal) || DietGoal.WEIGHT_LOSS,
            dietType: DietType.STANDARD,
            unitSystem:
                user?.measurementSystem === 'cmKg' ? UnitSystem.METRIC : UnitSystem.IMPERIAL,
            dietFilters: {
                pace: (user?.pace as GoalPace) || GoalPace.MODERATE,
                mealCount: user?.mealCount || 3,
                foodMeasurement: 'actualWeight',
                favoriteCuisines: ['italian', 'mediterranean'],
                allergies: user?.allergies || [],
            },
        };

        const now = startDate || new Date();
        const end = endDate || new Date(now);
        if (!endDate) {
            end.setDate(now.getDate() + 6); // 7 days including start
        }

        const res = await axiosInstance.post('/meal-plans/generate', {
            userProfile,
            startDate: now.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0],
            options: {
                includeRecipes: true,
            },
            name: `Meal Plan for ${user?.uid}`,
            description: 'A meal plan generated based on user preferences and goals.',
        });

        // Invalidate and refetch recipes after generating new meal plans
        getRecipesQuery.refetch();

        return res.data;
    };

    // Check if we need to generate more meal plans for the current week
    const checkAndGenerateMealPlans = async (currentWeek: number) => {
        const recipes = getRecipesQuery.data;
        const estimatedWeeks = estimateTime();

        console.log('checkAndGenerateMealPlans called:', {
            currentWeek,
            recipesLength: recipes?.length,
            estimatedWeeks,
            recipes: recipes,
        });

        // If we don't have recipes or not enough weeks of data
        if (!recipes || recipes.length === 0) {
            console.log('No recipes found, generating initial meal plans...');
            // Calculate the start date for week 0 (current week)
            const today = new Date();
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)

            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6); // End of current week (Saturday)

            await generateMealPlans(weekStart, weekEnd);
            return;
        }

        // Check if we have enough weeks of data for the current week
        if (currentWeek >= recipes.length) {
            console.log(`Need more meal plans for week ${currentWeek + 1}, generating...`);

            // Calculate the start date for the specific week that's needed
            const firstRecipe = recipes[0];
            const firstStartDate = new Date(firstRecipe.startDate);

            // Calculate the start date for the missing week
            const targetWeekStart = new Date(firstStartDate);
            targetWeekStart.setDate(firstStartDate.getDate() + currentWeek * 7);

            const targetWeekEnd = new Date(targetWeekStart);
            targetWeekEnd.setDate(targetWeekStart.getDate() + 6);

            console.log(`Generating meal plans for week ${currentWeek + 1}:`, {
                startDate: targetWeekStart.toISOString().split('T')[0],
                endDate: targetWeekEnd.toISOString().split('T')[0],
            });

            await generateMealPlans(targetWeekStart, targetWeekEnd);
        } else {
            console.log(
                `No need to generate - week ${currentWeek + 1}, available weeks: ${recipes.length}`,
            );
        }
    };

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
        todaysMeals: todaysMeals,
        recipes: getRecipesQuery.data,
        loading: getRecipesQuery.isLoading,
        refetchRecipes: getRecipesQuery.refetch,
        todayShoppingList,
        estimateTime: estimateTime(),
        generateMealPlans,
        checkAndGenerateMealPlans,
    };
};
