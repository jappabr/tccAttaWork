import {View, TextInput, Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

const {width, height} = Dimensions.get("screen");

const Input = ({icon, size, placeholder, onChangeText, secureTextEntry})=>{
  return(
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={icon}
          style={{color:"#0066cc"}}
          size={28}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={{fontSize: 16}}
          placeholder={placeholder}
          placeholderTextColor="gray"
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
      </View>
    </View>
  )
}
export default Input;