import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { Image, Text, Animated } from 'react-native';
import { Choice } from '../Choice';

import { styles } from './styles';

export function Card({name, desc, source, isFirst, swipe, tiltSign, ...rest}) {
    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ["8deg", "0deg", "-8deg"]
    });

    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0, 1],
        extrapolate: "clamp"
    });

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1, 0],
        extrapolate: "clamp"
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }
    const renderChoice = useCallback(() => {
        return(
            <>
                <Animated.View style={[styles.choiceContainer, styles.likeContainer, {opacity: likeOpacity}]}>
                    <Choice chat={false} text={"Próximo"}/>
                </Animated.View>
                <Animated.View style={[styles.choiceContainer, styles.nopeContainer, {opacity: nopeOpacity}]}>
                    <Choice chat={true} text={"Chat"} />
                </Animated.View>
            </>
        )
    }, [likeOpacity, nopeOpacity]);

    return (
        <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>
            <Image source={{uri: source}} style={styles.image}/>
            <LinearGradient colors={['transparent', '#000D']} style={styles.gradient}/>
            <Text style={styles.name}>
                {name}
            </Text>
            <Text style={styles.desc}>
                {desc}
            </Text>

            {
                isFirst && renderChoice()
            }
        </Animated.View>
    );
}