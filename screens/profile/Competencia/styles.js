import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
    background:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#191919'
    },
    logoDiv:{
      flex:1,
      justifyContent: 'center',
      alignItems:'center'
    },
    container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%'
    },
    input:{
      backgroundColor: '#fff',
      width: '90%',
      marginBottom: 15,
      color:'#222',
      fontSize:17,
      borderRadius: 7,
      padding:10,
    },
    btnLogin:{
      backgroundColor:'#35aaff',
      width:'90%',
      height: 45,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 7
    },
    txtInput:{
      color: '#fff',
      fontSize: 18
    },
    logo:{
      width:170,
      height:170,
      resizeMode: 'stretch'
    },
    titulo:{
      fontSize: 20,
      fontFamily: 'OpenSans',
      color: '#fff',
    },
  });