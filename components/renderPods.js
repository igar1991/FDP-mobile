import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { PodsContext } from "../context/pods/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export const RenderPods = ({ item, navigation, buttonClickedHandler }) => {
  const { inPod, choosePod } = useContext(PodsContext);

  const goToDirectory = () => {
    navigation.push("Directory");
    inPod(item);
  };

  const openMenu =()=>{
    choosePod(item);
    buttonClickedHandler(true)
  }
  return (
    <TouchableOpacity onPress={goToDirectory} style={styles.item} onLongPress={()=>buttonClickedHandler(true)}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="harddisk" size={26} color="#6945f8" />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="dots-three-vertical" size={24} color="gray" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 4,
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
