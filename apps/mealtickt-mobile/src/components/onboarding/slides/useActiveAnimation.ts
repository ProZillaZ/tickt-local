import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export function useActiveAnimation(
    isActive: boolean,
    { duration = 400, initialValue = 0 }: { duration?: number; initialValue?: number } = {},
) {
    const animateValue = useRef(new Animated.Value(initialValue)).current;
    const translateX = animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    });
    useEffect(() => {
        if (!isActive) return; // do nothing if this slide isn’t active

        // reset and replay
        animateValue.setValue(initialValue);
        Animated.timing(animateValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, [isActive, animateValue, duration, initialValue]); // ← listen for isActive!

    return { animateValue, translateX };
}
