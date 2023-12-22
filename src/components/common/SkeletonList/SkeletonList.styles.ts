import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    skeletonContainer: {
      flexDirection: 'row',
      marginTop: 20,
      height: 120
    },
    skeletonItem: {
      backgroundColor: '#2e2e2e',
      padding: 10,
      justifyContent: 'center',
      marginHorizontal: 5,
      borderRadius: 5,
      width: 120, 
    },
    skeletonText: {
      height: 10,
      backgroundColor: '#3d3d3d',
      marginBottom: 5,
      borderRadius: 4,
    },
  });