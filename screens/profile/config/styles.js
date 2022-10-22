import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%'
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
  viewInput:{
    marginTop: 20
  },
  textAtualizar:{
    padding: 10,
    color: '#fff',
    fontSize: 18
  },
  btnAtualizar:{
    flexDirection:'row',
    backgroundColor:'#0066cc',
    width:'90%',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 15,
    marginVertical: 10,
    height: 50,
    margin: "5%"
  },
  input: {
    flexDirection: 'row',
  }
});