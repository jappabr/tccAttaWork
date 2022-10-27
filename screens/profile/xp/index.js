import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import API from '../../../utils/API';
import {getUser} from '../../../utils/user';

import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";

import {styles} from './styles';
import { Empty } from "../../../components/Empty";

export default function App() {
  const [vagaInput, setVagaInput] = useState();
  const [empresaInput, setEmpresaInput] = useState();
  const [xps, setXps] = useState([]);

  async function addForm() {
    Keyboard.dismiss();

    fetch(API + 'xp/' + getUser(), {
      method: "POST",
      body: JSON.stringify({
        vaga: vagaInput,
        nomeEmpresa: empresaInput
      }),
      headers: {
          'Content-Type': 'application/json'
      }})
      .then(response => response.json())
      .then(data => {
        setXps([...xps, data]);
      });

      setVagaInput('');
      setEmpresaInput('');
  }

  async function removeFormac(id) {
    Alert.alert(
      "Deletar formação",
      "Tem certeza que deseja remover esta formação?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            fetch(API + 'xp/', {
              method: "DELETE",
              body: JSON.stringify({
                id: id,
                userId: getUser()
              }),
              headers: {
                  'Content-Type': 'application/json'
              }})
              .then(response => response.json())
              .then(data => {
                setXps(data);
              });
          }
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    fetch(API + 'xp/' + getUser())
      .then(response => response.json())
      .then(data => {
        setXps(data)
      });
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={{ flex: 1 }}
        enabled={Platform.OS === "ios"}
      >
        <View style={styles.container}>
          <View style={styles.Body}>
            <FlatList
              data={xps}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.FlatList}
              ListEmptyComponent={({item}) => (
                <View>
                  <Empty text="Sem Dados"></Empty>
                </View>
              )}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  <View style={styles.containerView}>
                    <View style={styles.linhazinha}>
                      <Icon name="briefcase-outline" color="#204ac8" size={25}/>
                      <Text style={styles.Texto}>{item.vaga}</Text>
                    </View>
                    
                    <View style={styles.linhazinha}>
                      <Icon name="city-variant-outline" color="#204ac8" size={25}/>
                      <Text style={styles.Texto}>{item.nomeEmpresa}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => removeFormac(item.id)}>
                    <MaterialIcons
                      name="delete-forever"
                      size={25}
                      color="#f64c75"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>

          <View style={styles.Form}>
            <TextInput
              style={styles.Input}
              placeholderTextColor="gray"
              autoCorrect={true}
              value={vagaInput}
              placeholder="Cargo"
              maxLength={30}
              onChangeText={text => setVagaInput(text)}
            />
            <TextInput
              style={styles.Input}
              placeholderTextColor="gray"
              autoCorrect={true}
              value={empresaInput}
              placeholder="Empresa"
              maxLength={30}
              onChangeText={text => setEmpresaInput(text)}
            />
            <TouchableOpacity style={styles.Button} onPress={() => addForm()}>
              <Ionicons name="ios-add" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
  