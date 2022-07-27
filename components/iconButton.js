import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const IconButton = ({ children, title, onPress }) => {
  return (
    <View style={styles.containercircleButton}>
      <TouchableOpacity style={styles.circleButton} onPress={onPress}>
        {children}
      </TouchableOpacity>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    borderColor: "gray",
    borderRadius: 100,
    borderWidth: 1,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  containercircleButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});
