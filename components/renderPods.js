import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { PodsContext } from "../context/pods/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export const RenderPods = ({ item, navigation }) => {
  const { inPod } = useContext(PodsContext);

  const goToDirectory = () => {
    navigation.push("Directory");
    inPod(item.title);
  };
  return (
    <TouchableOpacity onPress={goToDirectory} style={styles.item}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="harddisk" size={26} color="#6945f8" />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={() => console.log(item.id)}>
        <Entypo name="menu" size={26} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    marginLeft: 2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
