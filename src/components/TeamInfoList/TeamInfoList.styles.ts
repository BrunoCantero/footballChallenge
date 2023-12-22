import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    playerList: {
      margin: 20, marginBottom: 260
    },
    playerContainer: {
        flexDirection: 'row',
        backgroundColor: '#161B39',
        padding: 12,
        marginVertical: 6,
        borderRadius: 8,
      },
      playerText: {
        color: '#C9D1D9',
        fontSize: 16,
      },
    playerIcon: {
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        marginRight: 10,
    },
  });