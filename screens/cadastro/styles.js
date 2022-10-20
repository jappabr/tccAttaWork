import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  background:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  logoDiv:{
    justifyContent: 'center',
    alignItems:'center',
    height: '40%'
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
    flexDirection:'row',
    backgroundColor:'#0066cc',
    width:'100%',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 15,
    marginVertical: 10,
    height: '6%'
  },
  txtInput:{
    color: '#fff',
    fontSize: 20
  },
  logo:{
    width:500,
    height:500,
    resizeMode: 'stretch'
  },
  titulo:{
    fontSize: 20,
    fontFamily: 'OpenSans',
    color: '#fff',
  },
  btnCadastro:{
    color:'#0066cc',
    padding:10,
    fontSize: 15,
  },
  textCadastro:{
    padding: 10,
    color: '#fff',
    fontSize: 18
  }
});