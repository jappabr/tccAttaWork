import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../theme';
import { RoundButton } from '../RoundButton';

import { styles } from './styles';

export function Footer({handleChoice}) {
    return (
        <View style={styles.container}>
            <RoundButton name="close-outline" size={45} color={THEME.COLORS.DANGER} onPress={() => handleChoice(1)}/>
            <RoundButton name="handshake-outline" size={40} color={THEME.COLORS.SUCCESS} onPress={() => handleChoice(-1)}/>
        </View>
    );
}