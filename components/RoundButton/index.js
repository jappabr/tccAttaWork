import { useRef, useCallback } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';

export function RoundButton({name, size, color, onPress}) {
    const scale = useRef(new Animated.Value(1)).current;
    const animateScale = useCallback((newValue: number) => {
        Animated.spring(scale, {
            toValue: newValue,
            friction: 4,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <TouchableWithoutFeedback
            onPressIn={() => animateScale(0.8)}
            delayPressIn={0}
            onPressOut={() => {
                animateScale(1),
                onPress()
            }}
            delayPressOut={110}
        >
            <Animated.View style={[styles.container, {transform: [{ scale }]}]}>
                <MaterialCommunityIcons name={name} size={size} color={color} />
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}