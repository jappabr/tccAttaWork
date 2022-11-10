import React, { useEffect, useState } from 'react';
import { TextInput, View, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import API from '../../utils/API'
import { getUser } from '../../utils/user';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Empty } from '../../components/Empty';
export function Search() {
  const [search, setSearch] = useState();
  const [data, setData] = useState([]);
  function pesquisar() {
    fetch(API + 'search/?q=' + search)
      .then(response => response.json())
      .then(data => {
        setData(data)
        console.log(data)
      });
  }
  return (

    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={{ fontSize: 16 }}
          placeholder={"Pesquisar o nome do usuário"}
          placeholderTextColor="gray"
          onChangeText={(search) => setSearch(search)}
        />
        <TouchableOpacity style={styles.btnPesquisar} onPress={pesquisar}>
          <Icon name="magnify" color="#204ac8" size={25} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.FlatList}
        ListEmptyComponent={({ item }) => (
          <View>
            <Empty text="Sem Dados"></Empty>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cardPerfil} onPress={()=>pesquisar()}>
            <View style={styles.card}>
             <Image style={{width: 50, height: 50, borderRadius: 15, marginTop: 10}}source={{uri: item.profilePic}}/>
              <Text style={{color: "#0066cc", fontSize: 15, fontStyle: "italic", fontWeight:"bold"}}>{item.nome}</Text>
              <Text>{item.cidade}</Text>
              <Text style={{marginBottom: 10}}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      >
      </FlatList>
    </View>
  );
}

export default Search