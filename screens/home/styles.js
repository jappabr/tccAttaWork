import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#EBECF4"
  },
  header: {
      paddingTop: 44,
      paddingBottom: 16,
      backgroundColor: "#FFF",
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#EBECF4",
      shadowColor: "#454D65",
      shadowOffset: { height: 5 },
      shadowRadius: 15,
      shadowOpacity: 0.2,
      zIndex: 10
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: "500"
  },
  feed: {
      marginHorizontal: 16
  },
  feedItem: {
      backgroundColor: "#FFF",
      borderRadius: 10,
      padding: 10,
      flexDirection: "row",
      marginVertical: 8
  },
  avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 16
  },
  name: {
      fontSize: 15,
      fontWeight: "500",
      color: "#0066cc"
  },
  timestamp: {
      fontSize: 11,
      color: "#C4C6CE",
      marginTop: 4
  },
  post: {
      marginTop: 16,
      fontSize: 14,
      color: "#838899"
  },
  postImage: {
      width: undefined,
      height: 150,
      borderRadius: 5,
      marginVertical: 16
  }
});