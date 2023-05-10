import { Modal, Text, View, TouchableOpacity} from 'react-native';
import { styles } from '../styles';

export default function ConfirmModal({prompt,modalVisible,setModalVisible,setIsConfirmed,consumeConfirm}) {
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{prompt}</Text>
        <TouchableOpacity style={[styles.button, styles.buttonClose]} 
        onPress={async ()=>{setIsConfirmed(true);setModalVisible(false);await consumeConfirm();}}>
          <Text style={styles.textStyle}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={()=>setModalVisible(false)}>
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
      </Modal>
  );
}