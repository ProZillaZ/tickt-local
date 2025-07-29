import { Fragment, useEffect, useRef, useState } from 'react';
import { Text, SafeAreaView, ScrollView, ImageSourcePropType, Platform } from 'react-native';
import { styles } from './home.styles';
import {
    AiCoach,
    ChatBottomModal,
    HeaderContent,
    MealSwapBottomModal,
    Navbar,
    RecipeBottomModal,
    ShopCollapsibles,
    ShowCase,
    Tip,
    WeekDays,
    WeekSlider,
} from 'components/user-stack/home';
import Toggle from 'components/global/toggle/toggle.index';
import { useHome } from './use-home.ts';
import { tipContent, tipContentOrder } from 'app/constants/constants.ts';
import { isTablet } from 'utils/helpers.ts';
import InfoModal from 'components/global/info-modal/info-modal.index.tsx';
import mobileAds from 'react-native-google-mobile-ads';

import { BannerAd, TestIds, useForeground } from 'react-native-google-mobile-ads';
import { Image } from 'expo-image';
import AppLogger from 'app/logger/logger.ts';
import { Recipe } from '@tickt-ltd/types';
import { Meal } from '@tickt-ltd/diet-gen-lib';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

mobileAds()
    .initialize()
    .then((adapterStatuses) => {
        // Initialization complete!
    });

const HomeScreen = () => {
    const {
        state,
        toggleOptions,
        daysOfWeek,
        shopMealsType,
        isSkipDay,
        isRepeatDay,
        isRepeatRecipeDay,
        repeatRecipeModalOpen,
        repeatDaysModalOpen,
        isLoggedMeal,
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
        onUpdateSwappedRecipe,
        onShopMealChange,
        onShopMealDataChange,
        onShowCaseOptionsPress,
        handleRepeatRecipeDays,
        handleRepeatDays,
        onChatModalPress,
        setMealSwapModalOpen,
        recipes,
        todaysMeals,
        todayShoppingList,
    } = useHome();
    const bannerRef = useRef<BannerAd>(null);

    // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
    // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    });
    // const getTrackingPermission = async () => {
    //     try {
    //         const { status } = await getTrackingPermissionsAsync();
    //         if (status === PermissionStatus.UNDETERMINED) {
    //             await requestTrackingPermissionsAsync();
    //         }
    //     } catch (error) {
    //         console.log('error :', error);
    //     }
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
                nestedScrollEnabled={true}>
                <HeaderContent
                    isRepeatDayMode={state.repeatDays?.length > 0}
                    onFilterPress={onFilterPress}
                    onRepeatModePress={() => onRepeatPress(true)}
                    onQuestionPress={() => onQuestionPress(true)}
                />
                {showCarousel && (
                    <WeekSlider
                        weeks={Array.from(String(recipes?.length))}
                        defaultWeek={state.currentWeek}
                        onChangeWeek={onWeekChange}
                    />
                )}
                <Toggle
                    style={styles.toggleContainer}
                    itemStyles={styles.itemsStyles}
                    options={toggleOptions}
                    value={state.toggleOption}
                    onPress={handleToggleOption}
                    itemWidthOffset={isTablet ? 0.85 : 1.3}
                />
                {state.toggleOption == 0 ? (
                    <Fragment>
                        <WeekDays
                            style={styles.weekDaysContainer}
                            daysOfWeek={daysOfWeek as [string | ImageSourcePropType]}
                            defaultDay={state.currentDay}
                            onChangeDay={onDayChange}
                            skipDays={state.skipDays}
                        />
                        {showCarousel && (
                            <ShowCase
                                dayMealPlans={todaysMeals as (Recipe | Meal)[]}
                                isLoggedMeal={isLoggedMeal}
                                isRepeatRecipe={isRepeatRecipeDay}
                                isRepeatDay={isRepeatDay}
                                isSkipDay={isSkipDay}
                                swapedRecipe={state.swappedRecipe}
                                onMealSwapPress={() => setMealSwapModalOpen(true)}
                                onOptionsPress={onShowCaseOptionsPress}
                            />
                        )}
                        <Tip data={tipContent} />
                        <AiCoach onChatPress={onChatStart} />
                    </Fragment>
                ) : (
                    <Fragment>
                        <WeekDays
                            style={styles.weekDaysContainer}
                            daysOfWeek={daysOfWeek as [string | ImageSourcePropType]}
                            defaultDay={state.currentDay}
                            onChangeDay={onDayChange}
                            skipDays={state.skipDays}
                        />
                        <ShopCollapsibles
                            selectedData={state}
                            onUpdate={onShopMealDataChange}
                            todayShoppingList={todayShoppingList}
                        />
                        <Tip
                            data={tipContentOrder}
                            onPress={() => {
                                AppLogger.trackEvent('order_now_clicked', {
                                    total_items: 23,
                                    checked_items: 15,
                                });
                            }}
                            showButton={true}
                        />
                    </Fragment>
                )}
                <RecipeBottomModal
                    onUpdate={repeatDaysModalOpen ? handleRepeatDays : handleRepeatRecipeDays}
                    currentIndex={repeatDaysModalOpen ? 0 : null}
                    defaultValue={repeatDaysModalOpen ? state.repeatDays : undefined}
                    isVisible={repeatRecipeModalOpen || repeatDaysModalOpen}
                    isRepeatDay={repeatDaysModalOpen}
                    onClose={() =>
                        repeatDaysModalOpen ? onRepeatPress(false) : onShowCaseOptionsPress(false)
                    }
                />
                <ChatBottomModal
                    isVisible={chatModalOpen}
                    onClose={() => onChatModalPress(false)}
                />
                <MealSwapBottomModal
                    onUpdate={onUpdateSwappedRecipe}
                    onClose={() => setMealSwapModalOpen(false)}
                    isVisible={mealSwapModalOpen}
                    swapedRecipe={state.swappedRecipe}
                />
                <InfoModal
                    visible={showQuestionModal}
                    setVisible={() => onQuestionPress(false)}
                    heading="what's skip diet days?"
                    description={`this option allows you to skip specific days in your diet plan. use it if it suits your needs!`}
                />
            </ScrollView>
        </SafeAreaView>
    );
};
export default HomeScreen;
