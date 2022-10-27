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

export default function App() {
  const [cursoInput, setCursoInput] = useState();
  const [instituicaoInput, setInstituicaoInput] = useState();
  const [formacs, setFormacs] = useState([]);

  async function addForm() {
    Keyboard.dismiss();

    fetch(API + 'formac/' + getUser(), {
      method: "POST",
      body: JSON.stringify({
        desc: cursoInput,
        nomeEscola: instituicaoInput
      }),
      headers: {
          'Content-Type': 'application/json'
      }})
      .then(response => response.json())
      .then(data => {
        setFormacs([...formacs, data]);
      });

      setCursoInput('');
      setInstituicaoInput('');


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
            fetch(API + 'formac/', {
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
                setFormacs(data);
              });
          }
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    fetch(API + 'formac/' + getUser())
      .then(response => response.json())
      .then(data => {
        setFormacs(data)
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
              data={formacs}
              ListEmptyComponent={({item}) => (
                <View>
                  <Empty text="Sem Dados"></Empty>
                </View>
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.FlatList}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  <View style={styles.containerView}>
                    <View style={styles.linhazinha}>
                      <Icon name="school" color="#204ac8" size={25}/>
                      <Text style={styles.Texto}>{item.desc}</Text>
                    </View>
                    
                    <View style={styles.linhazinha}>
                      <Icon name="chart-timeline" color="#204ac8" size={25}/>
                      <Text style={styles.Texto}>{item.nomeEscola}</Text>
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
              value={cursoInput}
              placeholder="Adicione sua formação"
              maxLength={30}
              onChangeText={text => setCursoInput(text)}
            />
            <TextInput
              style={styles.Input}
              placeholderTextColor="gray"
              autoCorrect={true}
              value={instituicaoInput}
              placeholder="Instituicao"
              maxLength={30}
              onChangeText={text => setInstituicaoInput(text)}
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
  