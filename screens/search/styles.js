import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    paddingTop: 29,
    backgroundColor: '#fff',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  input:{
    flexDirection: 'row',
    maxHeight: 54,
    paddingLeft: 55
  },
  btnPesquisar:{
    paddingLeft: 10,
    color: "#fff",
    backgroundColor: "#fff",
    textAlign: "center",
    height: 59,
    width: "25%",
    justifyContent: 'center'
  },
  cardPerfil:{
    flex: 1,
  },
  card:{
    borderColor:"gray", 
    borderWidth: 1, 
    borderRadius:10, 
    margin: 10,
    alignItems: 'center'
  }
})