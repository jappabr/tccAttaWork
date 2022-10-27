import { View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
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
const ProfileScreen = ({ navigation }) => {
  const [dataU, setDataU] = useState({})
  const [dataC, setDataC] = useState({})
  const [dataF, setDataF] = useState({})

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();

  const [cidade, setCidade] = useState();
  const [nome, setNome] = useState();
  const [wpp, setWpp] = useState();
  const [dataNasc, setDataNasc] = useState();

  function loadScreen() {
    fetch(API + 'formac/' + getUser())
      .then(response => response.json())
      .then(dataF => {
        setDataF(dataF)
      })
    fetch(API + 'curriculo/' + getUser())
      .then(response => response.json())
      .then(dataC => {
        setDataC(dataC)
      })
    fetch(API + 'user/' + getUser())
      .then(response => response.json())
      .then(dataU => {
        setDataU(dataU)
      })
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
      setEmail(null);
      setSenha(null);
      fetch(API + 'curriculo/' + dataC.id, {
        method: "PATCH",
        body: JSON.stringify({cidade, nome, wpp, dataNasc, userId: getUser()}),
        headers: {
            'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(() => {
        setCidade(null);
        setNome(null);
        setWpp(null);
        setDataNasc(null);
        loadScreen();
      });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 60 }}>
            <Avatar.Image
              source={{
                uri: dataU.profilePic,
              }}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}>{dataC.nome}</Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#0066CC" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{dataC.cidade} - São Paulo</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#0066CC" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>(11) {dataC.wpp}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#0066CC" size={20} />
            <Text style={{ color: "#777777", marginLeft: 20 }}>{dataU.email}</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{(String(dataC.dataNasc).split('/')[2] - 2022) * -1}</Title>
            <Caption>Anos</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{dataF.length}</Title>
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
            placeholder="Digite seu telefone"
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