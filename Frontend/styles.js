import { StyleSheet } from "react-native";
export  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    fridgeContainer: {
      flex: 1,
      backgroundColor: 'grey',
      justifyContent: 'space-between',
      paddingBottom: '10%',
      paddingHorizontal: '5%',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'center',
    },
    fridge: {
      position:'absolute',
      top: '15%',
      left: '5%'
    },
    recipe:{
      position:'absolute',
      top: '20%',
      left: '30%',
    },
    back:{
      borderWidth:1,
      borderColor:'black',
      backgroundColor: 'red',
    },
    add:{
      justifyContent:'flex-end',
      alignItems:'flex-end',
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 25,
    },
    food: {
      fontSize: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginBottom: 10,
      marginTop: 10,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 100,
    },
  });