import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
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
    const[dataU, setDataU] = useState({})
    const[dataC, setDataC] = useState({})
    const[dataF, setDataF] = useState({})
    useEffect(() => {
    fetch(API + 'formac/' + getUser())
      .then(response => response.json())
      .then(dataF=>{
        setDataF(dataF)
      });
    fetch(API + 'curriculo/' + getUser())
    .then(response => response.json())
      .then(dataC=>{
        setDataC(dataC)
      })
    fetch(API + 'user/' + getUser())
    .then(response => response.json())
      .then(dataU =>{
        setDataU(dataU)
      })
    }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 60}}>
          <Avatar.Image 
            source={{
              uri: dataU.profilePic,
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{dataC.nome}</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#0066CC" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{dataC.cidade} - São Paulo</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#0066CC" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>(11) {dataC.wpp}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#0066CC" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{dataU.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{(String(dataC.dataNasc).split('/')[2]-2022)*-1}</Title>
            <Caption>Anos</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{dataF.length}</Title>
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
        <TouchableRipple onPress={() => {navigation.navigate("profileCompetencia")}}>
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
    </SafeAreaView>
  );
};

export default ProfileScreen;
