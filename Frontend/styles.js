import { StyleSheet } from "react-native";
export  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: 'grey',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    fridgeContainer: {
      flex: 1,
      backgroundColor: 'grey',
      justifyContent: 'space-between',
      paddingBottom: '10%',
      paddingHorizontal: '5%',
    },
    recipeContainer: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'space-between',
    },
    imageBackground: {
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: '10%',
      paddingHorizontal: '5%',
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
      fontSize: 15,
    },
    title: {
      fontSize: 15,
      fontStyle: 'italic',
      fontWeight: 'bold',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 50,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 20,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    },
    signInButton: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginBottom: 10,
      marginTop: 10,
    },
    button: {
      width: '30%',
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
    buttonConsume: {
      backgroundColor: 'green',
    },  
    buttonCancel: {
      backgroundColor: 'red',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    confirm: {
      color: 'green',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 150,
      fontSize: 20,
    },
    method: {
      height: 100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 150,
      fontSize: 15,
    },
    nameTitle: {
      fontSize: 25,
      fontStyle: 'italic',
      fontWeight: 'bold',
    }
  });