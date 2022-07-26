import { Modal, Pressable, StyleSheet } from "react-native";

export const ModalLittleWrapper =({children, modalVisible, buttonClickedHandler })=>{
  return (
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      buttonClickedHandler(false)
    }}
  >
    <Pressable  style={styles.centeredView} onPress={() => buttonClickedHandler(false)}>
      <Pressable style={styles.modalView}>
          {children}
      </Pressable>
    </Pressable >
  </Modal>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
    alignItems: "center",
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});