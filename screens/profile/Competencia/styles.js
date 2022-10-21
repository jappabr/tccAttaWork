import {StyleSheet} from 'react-native'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
    backgroundColor: "#fff"
  },
  Body: {
    flex: 1
  },
  Form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
    paddingTop: 13,
    borderTopWidth: 1,
    borderColor: "#0066cc"
  },
  Input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    flex:1,
    marginLeft: 10,
    padding: 10,
  },
  Button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0066cc",
    borderRadius: 4,
    marginLeft: 10
  },
  FlatList: {
    flex: 1,
    marginTop: 5
  },
  Texto: {
    fontSize: 17,
    color: "gray",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
    paddingLeft: 10
  },
  ContainerView: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#525252"
  },
  
  containerView: {
    marginTop: 5,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  linhazinha: {
    flex: 1,
    flexDirection: "row"
  }
});
