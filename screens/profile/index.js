import {View, SafeAreaView, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import API from '../../utils/API';
import {getUser} from '../../utils/user';
import{
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {styles} from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ProfileScreen = ({navigation}) => {
  const[data, setData] = useState({})
  const [refreshing, setRefreshing] = useState(false);
  
  const load = async() => {
    const res = await fetch(API + 'alluser/' + getUser());
    const user = await res.json();
    setRefreshing(false);
    setData(user);
  }

  useEffect(() => {
    load();
  }, [])

  const onRefresh = async() => {
    setRefreshing(true);
    load();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 60}}>
            <Avatar.Image 
              source={{
                uri: data.profilePic,
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>{data.curriculo?.nome}</Title>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#0066CC" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{data.curriculo?.cidade} - São Paulo</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#0066CC" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>(11) {data.curriculo?.wpp}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#0066CC" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{data.email}</Text>
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

        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {navigation.navigate("profileFormac")}}>
            <View style={styles.menuItem}>
              <Icon name="school-outline" color="#204ac8" size={25}/>
              <Text style={styles.menuItemText}>Formação acadêmica</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {navigation.navigate("profileXp")}}>
            <View style={styles.menuItem}>
              <Icon name="folder-account-outline" color="#204ac8" size={25}/>
              <Text style={styles.menuItemText}>Experiência</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {navigation.navigate("profileCurriculo")}}>
            <View style={styles.menuItem}>
              <Icon name="note-outline" color="#204ac8" size={25}/>
              <Text style={styles.menuItemText}>Currículo</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {navigation.navigate("profileConfig");
          }}>
            <View style={styles.menuItem}>
              <Icon name="wrench-outline" color="#204ac8" size={24}/>
              <Text style={styles.menuItemText}>Configurações</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
