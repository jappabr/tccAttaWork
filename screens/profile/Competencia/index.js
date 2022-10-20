import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from "react-native";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";

import {styles} from './styles';

export default function App() {
  const [form, setForm] = useState([]);
  const [newForm, setNewForm] = useState("");

  async function addForm() {
    const search = form.filter(form => form === newForm);

    if (search.length !== 0) {
      Alert.alert("Atenção", "Nome da formação repetido!");
      return;
    }

    setForm([...form, newForm]);
    setNewForm("");

    Keyboard.dismiss();
  }

  async function removeForm(item) {
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
          onPress: () => setForm(form.filter(forms => forms !== item))
        }
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    async function carregaDados() {
      const form = await AsyncStorage.getItem("form");

      if (form) {
        setForm(JSON.parse(form));
      }
    }
    carregaDados();
  }, []);

  useEffect(() => {
    async function salvaDados() {
      AsyncStorage.setItem("form", JSON.stringify(form));
    }
    salvaDados();
  }, [form]);

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
              data={form}
              keyExtractor={item => item.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.FlatList}
              renderItem={({ item }) => (
                <View style={styles.ContainerView}>
                  <Text style={styles.Texto}>{item}</Text>
                  <TouchableOpacity onPress={() => removeForm(item)}>
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
              value={newForm}
              placeholder="Adicione sua formação"
              maxLength={50}
              onChangeText={text => setNewForm(text)}
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
  