import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    alignItems: 'center',
    width: "100%",
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginVertical: 10,
  },
  containerWithIcon:{
    flexDirection:"row",
    alignItems: 'center',
    width: "100%",
    justifyContent: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
    marginVertical: 10,
  },
  icon:{
    flex:0.1,
    padding: 10,
  },
  input:{
    flex:1,
    padding: 10,
  },
  inputWithIcon:{
    flex:0.8,
    marginLeft: 10,
    padding: 10,
  }
});