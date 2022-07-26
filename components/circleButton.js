import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const CircleButton = ({buttonClickedHandler}) => {
  return (
    <TouchableOpacity
      onPress={()=>buttonClickedHandler(true)}
      style={styles.roundButton}
    >
      <AntDesign name="plus" size={34} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roundButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#bb97e6',
    position: 'absolute',
    bottom: 20,
    right: 20
  }
});
