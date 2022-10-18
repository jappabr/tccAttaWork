import { View, Text, KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import API from '../../utils/API';
import {useNavigation, ToastAndroid} from "@react-navigation/native"
import Input from '../../components/input/index'
import {styles} from "./styles"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setUser} from '../../utils/user'

const CadastroScreen = () => {
    const navigation=useNavigation();
    const [senha, setSenha] = useState();
    const [email, setEmail] = useState();
    const [nome, setNome] = useState();
    function cadastro(){
        fetch(API + 'cadastro',{
            method: "POST",
            body: JSON.stringify({nome, email, senha}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => { response.json() })
        .then(data=>{
            if(data){
                setUser(data.id)
                navigation.navigate("TabStack")
            }
        });
    }
    return (
        <KeyboardAvoidingView style={styles.background}>
            <View style={styles.container}>
                <View style={styles.logoDiv}>
                    <Image
                        style={styles.logo}
                        source={require("../../src/logo.png")}
                    /> 
                </View>
                <Input 
                    icon="email-outline" 
                    placeholder="nome"
                    onChangeText={(nome)=>{setNome(nome)}}
                />
                <Input 
                    icon="email-outline" 
                    placeholder="email"
                    onChangeText={(email)=>{setEmail(email)}}
                />
                <Input 
                    icon="key-outline" 
                    placeholder="senha"
                    secureTextEntry={true}
                    onChangeText={(senha)=>{setSenha(senha)}}
                />
                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={cadastro}
                >
                    <Text style={styles.textCadastro}>Cadastrar</Text>
                    <MaterialCommunityIcons name="arrow-right-thick" style={{color:"#fff"}} size={25}/>
                    <MaterialCommunityIcons name="arrow-right-thick" style={{color:"#fff"}} size={25}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> 
                    navigation.navigate("Login")}
                >
                    <Text style={styles.btnCadastro}>Já possui conta? Acesse sua conta.</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default CadastroScreen