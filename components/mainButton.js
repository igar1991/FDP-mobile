import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

export const MainButton = ({onPress, backgroundColor, title}) => {
  return (
    <TouchableOpacity
    style={[styles.button, backgroundColor]}
    onPress={onPress}
  >
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    marginTop: 6
  },
  text: {
    color: "white",
    fontSize: 18
  }
});
