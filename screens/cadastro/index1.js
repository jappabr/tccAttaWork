import { View, Text, KeyboardAvoidingView, StyleSheet, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useState} from 'react'
import API from '../../utils/API';
import {useNavigation} from "@react-navigation/native"
import Input from '../../components/input/index'
import {styles} from "./styles"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setUser} from '../../utils/user'

const CadastroScreen = () => {
    const navigation=useNavigation();
    const [senha, setSenha] = useState();
    const [email, setEmail] = useState();
    const [nome, setNome] = useState();
    function cadastro() {
        if(!email || !senha)
            return ToastAndroid.show('Informe Email e Senha', ToastAndroid.SHORT);
        ToastAndroid.show('Cadastrando...', ToastAndroid.SHORT);
        fetch(API + 'cadastro',{
            method: "POST",
            body: JSON.stringify({nome, email, senha}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if(data) {
                if(data.error)
                    return ToastAndroid.show(data.error, ToastAndroid.SHORT); 
                setUser(data);
                navigation.navigate("TabStack");
                ToastAndroid.show('Conta criada com sucesso! Atualize seus dados nas configurações do perfil.', ToastAndroid.SHORT);
            }
        }).catch(() => ToastAndroid.show('Banco de dados offline', ToastAndroid.SHORT));
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
                    icon="account-outline" 
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