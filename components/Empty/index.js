import { View, Text } from 'react-native';

import { styles } from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function Empty({text}) {
    return (
        <View style={styles.container}>
            <Icon name="alert-outline" color="#204ac8" size={28}/>
            <Text style={styles.text}>
                {text}
            </Text>
        </View>
    );
}