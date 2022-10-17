import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        backgroundColor: THEME.COLORS.BACKGROUND,
        elevation: 5,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});