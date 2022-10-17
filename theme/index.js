//import { Dimensions } from 'react-native';
//const { width, height } = Dimensions.get('screen');

const { width, height } = {
  width: 333,
  height: 693
}

export const THEME = {
    COLORS: {
        BACKGROUND: '#FFF',

        PRIMARY: '#8B5CF6',
        SECONDARY: '#0066EE',
        SUCCESS: '#204ac8',
        DANGER: '#FF4141',
        ALERT: '#F87171',
    },

    CARD: {
        WIDTH: width * 0.99,
        HEIGHT: height * 0.96,
        BORDER_RADIUS: 20,
        OUT_OF_SCREEN: width * 1.5
    }
};