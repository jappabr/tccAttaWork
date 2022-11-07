import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  btnPDF:{
    flexDirection:'row',
    backgroundColor:'#0066cc',
    width:'90%',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 15,
    marginVertical: 10,
    height: 55,
    margin: "5%",
  },
  textPDF:{
    padding: 10,
    color: '#fff',
    fontSize: 18
  },
  fundoPerfil:{
    backgroundColor: '#0066cc',
    flex: 1,
    alignItems:'center',
    paddingBottom: 10
  },
  pictureView:{
    backgroundColor: "gray",
    alignItems: 'center',
  },
  profilePicture:{
    backgroundColor: "gray",
    height: 150,
    width: 150,
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {width: 5, height:5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  textTitulo:{
    color: '#000',
    fontSize: 17,
    textTransform: "uppercase"
  },
  header:{
    color: '#fff',
    fontSize: 15,
    fontFamily: "notoserif",
  },
  headerNome:{
    color: '#fff',
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "notoserif"
  },
  separa:{
    height: 1,
    width: "100%",
    backgroundColor: "gray",

  },
  separa2:{
   height: 1,
   width: "90%",
   backgroundColor: "#777"
  }
})
