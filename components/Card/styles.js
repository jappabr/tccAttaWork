import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 45,
    },
    image: {
        width: THEME.CARD.WIDTH,
        height: THEME.CARD.HEIGHT,
        borderRadius: THEME.CARD.BORDER_RADIUS
    },
    name: {
        position: 'absolute',
        bottom: 100,
        left: 22,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        borderRadius: THEME.CARD.BORDER_RADIUS
    },
    choiceContainer: {
        position: 'absolute',
        top: 100
    },
    likeContainer: {
        left: 45,
        transform: [{ rotate: '-30deg' }]
    },
    nopeContainer: {
        right: 45,
        transform: [{ rotate: '30deg' }]
    },
    desc:{
        position: 'absolute',
        bottom: 22,
        left: 22,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff'
    }
});