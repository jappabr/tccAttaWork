import { View, Text } from 'react-native';
import { THEME } from '../../theme';

import { styles } from './styles';


export function Choice({chat, text}) {
    const color = chat ? THEME.COLORS.SUCCESS : THEME.COLORS.DANGER;
    return (
        <View style={[styles.container, { borderColor: color }]}>
            <Text style={[styles.text, { color }]}>
                {text}
            </Text>
        </View>
    );
}