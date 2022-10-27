import React, { useState, useEffect } from 'react';
import {Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { styles } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../components/input/index'
import {useNavigation} from "@react-navigation/native"
import API from '../../utils/API';
import {setUser} from '../../utils/user'

export default function App() {
    const navigation = useNavigation();
    const [senha, setSenha] = useState();
    const [email, setEmail] = useState();
    function logar() {
        if(!email || !senha)
            return ToastAndroid.show('Informe Email e Senha', ToastAndroid.SHORT);
        ToastAndroid.show('Entrando...', ToastAndroid.SHORT);
        fetch(API + 'login',{
            method: "POST",
            body: JSON.stringify({email, senha}),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data) {
                if(data.error)
                    return ToastAndroid.show(data.error, ToastAndroid.SHORT); 
                setUser(data);
                navigation.navigate("TabStack");
                ToastAndroid.show('Logado com sucesso!', ToastAndroid.SHORT);
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

                <TouchableOpacity style={styles.btnLogin} onPress={logar}>
                    <Text style={styles.textLogin}>Login</Text>
                    <MaterialCommunityIcons name="arrow-right-thick" style={{color:"#fff"}} size={25}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=> 
                    navigation.navigate("Cadastro")}
                >
                    <Text style={styles.btnCadastro}>Não tem conta? Crie agora a sua conta.</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}