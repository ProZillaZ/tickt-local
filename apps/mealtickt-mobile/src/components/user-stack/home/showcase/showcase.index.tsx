import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    Pressable,
    Platform,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useShowcase } from './use-showcase.ts';
import { ShowCaseProps, Slide } from './showcase.props';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { styles } from './showcase.styles';
import { configureReanimatedLogger } from 'react-native-reanimated';
import { getCardIcon, isTablet } from 'utils/helpers.ts';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import {
    BannerAd,
    BannerAdSize,
    NativeAd,
    NativeAdView,
    NativeAsset,
    NativeAssetType,
    NativeMediaView,
    TestIds,
    useForeground,
} from 'react-native-google-mobile-ads';
import AppLogger from 'app/logger/logger.ts';

configureReanimatedLogger({
    strict: false,
});
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const ShowCase = ({
    swapedRecipe,
    isSkipDay,
    isRepeatRecipe,
    isRepeatDay,
    isLoggedMeal,
    onOptionsPress,
    onMealSwapPress,
    dayMealPlans,
}: ShowCaseProps) => {
    const { carouselRef, progressPercentage, onChangeIndex, onRecipePress, getSlides } =
        useShowcase();
    const bannerRef = useRef<BannerAd>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const [lastTouchTime, setLastTouchTime] = useState(0);

    // (iOS) WKWebView can terminate if app is in a "suspended state", resulting in an empty banner when app returns to foreground.
    // Therefore it's advised to "manually" request a new ad when the app is foregrounded (https://groups.google.com/g/google-admob-ads-sdk/c/rwBpqOUr8m8).
    useForeground(() => {
        Platform.OS === 'ios' && bannerRef.current?.load();
    });
    const renderItem = ({ item }: { item: Slide }) =>
        item.type === 'ad' && Platform.OS === 'android' ? (
            <View key={item.id} style={[styles.slide, styles.skipDay]}>
                <NativeComponent item={item} />
            </View>
        ) : (
            <Pressable
                onPress={() => {
                    onRecipePress(item);
                    AppLogger.trackEvent('recipe_viewed', {
                        recipe_id: item.id,
                        from_screen: 'diet_plan',
                    });
                }}
                delayLongPress={200}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
                <ImageBackground
                    key={item.id}
                    source={item.image}
                    style={styles.slide}
                    imageStyle={styles.slideImage}>
                    <View style={styles.circleContainer}>
                        <View style={[styles.circle, styles.circle1]} />
                        <View style={[styles.circle, styles.circle2]} />
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardHead}>
                            <TouchableOpacity
                                onPress={onMealSwapPress}
                                style={styles.cardOptContainer}
                                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
                                <Image
                                    style={styles.cardOptLogo}
                                    source={require('../../../../assets/icons/swap.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => onOptionsPress(true)}
                                style={styles.cardOptContainer}
                                hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}>
                                <Image
                                    style={styles.cardOptLogo}
                                    source={require('../../../../assets/icons/dots.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.title}>{item.title}</Text>
                            <View style={styles.sperator} />
                            <View style={styles.footer}>
                                <View style={styles.type}>
                                    <Image style={styles.icon} source={getCardIcon(item.type)} />
                                    <Text style={styles.text}>{item.type}</Text>
                                </View>
                                <View style={[styles.dot]} />
                                <View style={styles.type}>
                                    <Image
                                        style={styles.icon}
                                        source={require('../../../../assets/icons/timer.png')}
                                    />
                                    <Text style={styles.text}>{item.time + ' mins'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <LinearGradient
                        key={item.id}
                        colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                        style={styles.gradient}
                    />
                </ImageBackground>
            </Pressable>
        );

    const renderSkipRepeatCard = ({ item }: { item: Slide }) => {
        return item.type === 'ad' && Platform.OS === 'android' ? (
            <View key={item.id} style={[styles.slide, styles.skipDay]}>
                <NativeComponent item={item} />
            </View>
        ) : (
            <View key={item.id} style={[styles.slide, styles.skipDay]}>
                <View style={styles.circleContainer}>
                    <View style={[styles.circle, styles.circle1]} />
                    <View style={[styles.circle, styles.circle2]} />
                </View>
                <View style={[styles.card, styles.skipCard]}>
                    <View style={[styles.cardbody, styles.skipCard]}>
                        <Image
                            style={styles.skipIcon}
                            source={getCardIcon(isSkipDay ? 'bellz' : 'repeat')}
                        />
                        <Text style={styles.skipTitle}>
                            {isSkipDay
                                ? 'skip diet day'
                                : isRepeatDay
                                  ? 'repeat day'
                                  : 'repeat meal/day'}
                        </Text>
                        <Text style={styles.skipText}>
                            {isSkipDay
                                ? 'you selected to skip your diet plan today. enjoy or edit your diet to get more recipes!'
                                : isRepeatDay
                                  ? 'you selected to repeat recipes for this day, this week. check out the previous recipes!'
                                  : 'you selected to repeat recipes for this day, this week. check out the previous recipe!'}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    const renderMealLogCard = ({ item }: { item: Slide }) =>
        item.type === 'ad' && Platform.OS === 'android' ? (
            <View key={item.id} style={[styles.slide, styles.skipDay]}>
                <NativeComponent item={item} />
            </View>
        ) : (
            <View key={item.id} style={[styles.slide, isLoggedMeal ? styles.congrats : styles.sad]}>
                <View style={styles.circleContainer}>
                    <View style={[styles.circle, styles.circle1]} />
                    <View style={[styles.circle, styles.circle2]} />
                </View>
                <View style={[styles.card, styles.skipCard]}>
                    <View style={[styles.cardbody, styles.skipCard]}>
                        <Image
                            style={[isLoggedMeal ? styles.skipIcon : styles.icon]}
                            source={getCardIcon(isLoggedMeal ? 'award' : 'sad')}
                        />
                        <Text style={[isLoggedMeal ? styles.skipTitle : styles.title]}>
                            {isLoggedMeal ? 'congrats!' : 'oh no!'}
                        </Text>
                        <Text style={[isLoggedMeal ? styles.skipText : styles.text]}>
                            {isLoggedMeal
                                ? 'you acquired one ticket for logging your meal! keep it up!'
                                : 'you selected to repeat recipes for this day, this week. check out the previous recipe!'}
                        </Text>
                    </View>
                </View>
            </View>
        );

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                width={wp('100%')}
                height={hp('65%')}
                mode={'parallax'}
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: isTablet ? 100 : 60,
                    parallaxAdjacentItemScale: 0.85,
                }}
                data={getSlides(dayMealPlans)}
                onSnapToItem={(index: number) => onChangeIndex(index)}
                renderItem={
                    isSkipDay || isRepeatRecipe || isRepeatDay
                        ? renderSkipRepeatCard
                        : isLoggedMeal !== 'none'
                          ? renderMealLogCard
                          : renderItem
                }
                loop={false}
                onConfigurePanGesture={(panGesture) => panGesture.activeOffsetX([-15, 15])}
            />
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>
            {Platform.OS === 'ios' && (
                <View
                    style={{
                        flex: 1,
                        alignSelf: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                    <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.LARGE_BANNER} />
                </View>
            )}
        </View>
    );
};
const NativeComponent = ({ item }: { item: Slide }) => {
    const [nativeAd, setNativeAd] = useState<NativeAd>();
    const adId =
        Platform.OS === 'android'
            ? 'ca-app-pub-2914732759227890/1895965161'
            : 'ca-app-pub-2914732759227890/9651166251';
    useEffect(() => {
        NativeAd.createForAdRequest(__DEV__ ? TestIds.NATIVE : adId)
            .then(setNativeAd)
            .catch(console.error);
    }, []);

    if (!nativeAd) {
        return null;
    }
    console.log('native add', nativeAd);

    function AdUi() {
        return (
            <View key={item.id} style={styles.slide}>
                <View style={styles.circleContainer}>
                    <View style={[styles.circle, styles.circle1]} />
                    <View style={[styles.circle, styles.circle2]} />
                </View>
                <View style={styles.card}>
                    <View style={styles.cardHead}>
                        {nativeAd?.icon && (
                            <NativeAsset assetType={NativeAssetType.ICON}>
                                <Image
                                    source={{ uri: nativeAd.icon.url }}
                                    style={{ width: 50, height: 50, borderRadius: 10 }}
                                />
                            </NativeAsset>
                        )}
                    </View>
                    <View style={styles.cardbody}>
                        <NativeAsset assetType={NativeAssetType.HEADLINE}>
                            <Text style={styles.title}>{nativeAd?.headline}</Text>
                        </NativeAsset>
                        <NativeAsset assetType={NativeAssetType.BODY}>
                            <Text style={styles.text}>{nativeAd?.body}</Text>
                        </NativeAsset>
                        <View style={styles.sperator} />
                        <View style={styles.footer}>
                            <View style={styles.type}>
                                <Image style={styles.icon} source={getCardIcon(item.type)} />
                                <Text style={styles.text}>{item.type}</Text>
                            </View>
                            <View style={[styles.dot]} />
                            <View style={styles.type}>
                                {nativeAd?.icon && (
                                    <NativeAsset assetType={NativeAssetType.ICON}>
                                        <Image
                                            source={{ uri: nativeAd.icon.url }}
                                            style={{ width: 20, height: 20, borderRadius: 10 }}
                                        />
                                    </NativeAsset>
                                )}
                                <Text style={styles.text}>Sponsored</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <LinearGradient
                    key={item.id}
                    colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                    style={styles.gradient}
                />
            </View>
        );
    }
    return (
        <NativeAdView nativeAd={nativeAd}>
            <NativeMediaView
                resizeMode="cover"
                style={[
                    styles.slideImage,
                    {
                        position: 'absolute',
                        width: '100%',
                        alignSelf: 'center',
                        height: '90%',

                        overflow: 'hidden',
                    },
                ]}
            />
            <AdUi />
        </NativeAdView>
    );
};
export default ShowCase;
