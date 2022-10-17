import { View, Text, KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import {useNavigation} from "@react-navigation/native"
import {styles} from "./styles"

const CadastroScreen = () => {
  const navigation=useNavigation();
  return (
    <KeyboardAvoidingView style={styles.background}>
    <View style={styles.logoDiv}>
      <Image
        style={styles.logo}
        source={require("../../../src/logo.png")}
      />
      <Text style={styles.titulo}>AttaWork</Text>  
    </View>
    <View style={styles.container}>
    <TextInput
        style={styles.input} 
        placeholder='Nome'
        autoCorrect={false}
        onChangeText={()=>{}}
        />
    <TextInput
        style={styles.input} 
        placeholder='Email'
        autoCorrect={false}
        onChangeText={()=>{}}
        />
    <TextInput
        style={styles.input}
        placeholder='Senha'
        autoCorrect={false}
        secureTextEntry="true"
        onChangeText={()=>{}}
        />
    <TouchableOpacity
     style={styles.btnLogin}
     onPress={()=> 
        navigation.navigate("Cadastro2")}
     >
        <Text style={styles.txtInput}>Alterar</Text>
    </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  )
}
export default CadastroScreen