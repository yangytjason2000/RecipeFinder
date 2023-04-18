import { StyleSheet } from "react-native";
export  const styles = StyleSheet.create({
    container: {
      flex: 1,
      overflow: 'visible',  
    },
    buttonContainer: {
      height: "15%",
      backgroundColor: '#E8E8E8',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexDirection: 'row',
    },
    fridgeContainer: {
      flex: 1,
      backgroundColor: '#E8E8E8',
      justifyContent: 'space-between',
      paddingBottom: '10%',
      paddingHorizontal: '5%',
    },
    recipeContainer: {
      flex: 1,
      backgroundColor: '#E8E8E8',
      justifyContent: 'space-between',
    },
    mainBackground: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-end',
      paddingBottom: '10%',
      paddingHorizontal: '5%',
    },
    imageContainer: {
      position: 'relative',
      flex: 1,
    },
    fridge: {
      position: 'absolute',
      bottom: '10%',
      right: 0,
    },
    recipe:{
      position:'absolute',
      bottom: '10%',
      right: 0,
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
      textAlign: 'center',
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginBottom: 5,
      marginTop: 5,
    },
    iosbutton: {
      flexDirection: 'row',
      borderRadius: 20,
      padding: 0,
      elevation: 2,
      marginBottom: 5,
      marginTop: 5,
    },
    deleteButton: {
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      width: 80,
      borderRadius: 20,
      padding: 20,
      marginVertical: 8,
    },
    deleteButtonText: {
      color: '#fff',
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
      borderRadius: 20,
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 150,
      fontSize: 20,
    },
    method: {
      borderRadius: 20,
      height: 100,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      width: 150,
      fontSize: 15,
    },
    nameTitle: {
      fontSize: 25,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    addTextStyle: {
      color: '#007AFF',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
    },
    recipeAddIngredientTextSize: {
      fontSize: 15,
    },
    recommendTextStyle: {
      color: 'green',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
    }
  });