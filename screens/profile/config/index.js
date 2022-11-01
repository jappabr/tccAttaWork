import { View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ScrollView, ToastAndroid, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { getUser } from '../../../utils/user';
import API from '../../../utils/API';
import { styles } from './styles'
import Input from '../../../components/input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import mime from "mime";

const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState({})
  
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  
  const [cidade, setCidade] = useState();
  const [nome, setNome] = useState();
  const [wpp, setWpp] = useState();
  const [dataNasc, setDataNasc] = useState();

  function loadScreen() {
    fetch(API + 'alluser/' + getUser())
      .then(res => res.json())
      .then(async (user) => {
        setData(user)
    });
  }

  useEffect(() => {
    loadScreen();
  }, []);

  function updateLogin() {
    fetch(API + 'user/' + getUser(), {
      method: "PATCH",
      body: JSON.stringify({email, senha}),
      headers: {
          'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(() => {
      setEmail('');
      setSenha('');
      fetch(API + 'curriculo/' + data.curriculo?.id, {
        method: "PATCH",
        body: JSON.stringify({cidade, nome, wpp, dataNasc, userId: getUser()}),
        headers: {
            'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(() => {
        setCidade('');
        setNome('');
        setWpp('');
        setDataNasc('');
        loadScreen();
        ToastAndroid.show('Dados atualizados com sucesso!', ToastAndroid.SHORT);
      }).catch((err) => ToastAndroid.show('Banco de dados offline', ToastAndroid.SHORT));
    }).catch((err) => ToastAndroid.show('Banco de dados offline', ToastAndroid.SHORT));
  }

  const upload = async(photo) => {
    const data = new FormData();

    const newImageUri =  "file:///" + photo.uri.split("file:/").join("");
  
    data.append('photo', {
      uri : newImageUri,
      type: mime.getType(newImageUri),
      name: getUser()
    });

    fetch(API + 'upload/' + getUser(), {
      method: 'POST',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => response.json())
      .then((response) => setData({...data, profilePic: response}))
      .catch((error) => console.log('error', error));
  };

  const handleChoosePhoto = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    if (!result.cancelled) {
      upload(result);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 60 }}>
            <TouchableOpacity
              onPress={handleChoosePhoto}>
              <Avatar.Image
                source={{
                  uri: data.profilePic
                }}
                size={80}
              />
            </TouchableOpacity>
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}>{data.curriculo?.nome}</Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#0066CC" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{data.curriculo?.cidade} - São Paulo</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#0066CC" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>(11) {data.curriculo?.wpp}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#0066CC" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{data.email}</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{data.curriculo?.dataNasc ? ((String(data.curriculo?.dataNasc).split('/')[2] - 2022) * -1) : '-'}</Title>
            <Caption>Anos</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{data.formacs?.length}</Title>
            <Caption>Diplomas</Caption>
          </View>
        </View>
        <KeyboardAvoidingView style={styles.viewInput}>
          
          <View style={styles.input}>
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 17, fontWeight: 'bold' }}>Email</Text>
            <MaterialCommunityIcons
              name={"pencil-outline"}
              style={{color:"#0066cc", marginLeft: 10}}
              size={20}
            />
          </View>
          <Input
            placeholder="Editar o email cadastrado"
            value={email}
            onChangeText={(email) => { setEmail(email) }}
            />
          <View style={styles.input}>
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 17, fontWeight: 'bold' }}>Senha</Text>
            <MaterialCommunityIcons
              name={"pencil-outline"}
              style={{color:"#0066cc", marginLeft: 10}}
              size={20}
            />
          </View>
          <Input
            placeholder="Editar a senha cadastrada"
            secureTextEntry={true}
            value={senha}
            onChangeText={(senha) => { setSenha(senha) }}
          />

          <View style={styles.input}>
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 17, fontWeight: 'bold' }}>Nome</Text>
            <MaterialCommunityIcons
              name={"pencil-outline"}
              style={{color:"#0066cc", marginLeft: 10}}
              size={20}
            />
          </View>
          <Input
            placeholder="Digite seu Nome"
            value={nome}
            onChangeText={(value) => { setNome(value) }}
          />
          <View style={styles.input}>
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 17, fontWeight: 'bold' }}>Cidade</Text>
            <MaterialCommunityIcons
              name={"pencil-outline"}
              style={{color:"#0066cc", marginLeft: 10}}
              size={20}
            />
          </View>
          <Input
            placeholder="Digite sua Cidade"
            value={cidade}
            onChangeText={(cidade) => { setCidade(cidade) }}
          />
          <View style={styles.input}>
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 17, fontWeight: 'bold' }}>Data de Nascimento</Text>
            <MaterialCommunityIcons
              name={"pencil-outline"}
              style={{color:"#0066cc", marginLeft: 10}}
              size={20}
            />
          </View>
          <Input
            placeholder="dd/mm/aaaa"
            value={dataNasc}
            onChangeText={(value) => { setDataNasc(value) }}
          />
          <View style={styles.input}>
            <Text style={{ color: "#777777", marginLeft: 10, fontSize: 17, fontWeight: 'bold' }}>Whatsapp</Text>
            <MaterialCommunityIcons
              name={"pencil-outline"}
              style={{color:"#0066cc", marginLeft: 10}}
              size={20}
            />
          </View>
          <Input
            placeholder="Digite seu telefone - sem o DDD"
            value={wpp}
            onChangeText={(value) => { setWpp(value) }}
          />

          <TouchableOpacity
            style={styles.btnAtualizar}
            onPress={updateLogin}
          >
            <Text style={styles.textAtualizar}>Atualizar</Text>
            <Icon name="arrow-right-thick" style={{ color: "#fff" }} size={25} />
            <Icon name="arrow-right-thick" style={{ color: "#fff" }} size={25} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;