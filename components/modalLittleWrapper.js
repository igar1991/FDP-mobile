import { Modal, Pressable, StyleSheet, View } from "react-native";

export const ModalLittleWrapper = ({
  children,
  modalVisible,
  buttonClickedHandler,
  style
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        buttonClickedHandler(false);
      }}
    >
      <Pressable
        style={{...styles.centeredView, ...style}}
        onPress={() => buttonClickedHandler(false)}
      >
        <Pressable style={styles.modalView}>
          <View
            style={{
              width: "100%",
            }}
          >
            {children}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
