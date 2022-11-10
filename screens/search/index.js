import React, {useEffect, useState} from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import API from '../../utils/API'
import {getUser} from '../../utils/user';
import { styles } from './styles';

export function Search() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(API + 'user')
      .then(response => response.json())
      .then(data => {
        setData(data)
      });
  }, []);
  return (
    <View style={styles.container}>
      <TextInput placeholder='pesquisar'/>

      <ScrollView>
        {data.map((data, index)=>(
          <Text key={index}>{data.id}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

export default Search