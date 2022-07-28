import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { PodsContext } from "../context/pods/context";

export const RenderDirectory = ({ item, navigation, buttonClickedHandler }) => {

  const { inPod, chooseFolderFile } = useContext(PodsContext);

  const goToDirectory = () => {
    if(item.type === "folder") {
      navigation.push("Directory", { dir: item.title });
    } else {
      openMenu();
    }
  };

  const openMenu =()=>{
    chooseFolderFile(item);
    buttonClickedHandler(true)
  }

  return (
    <TouchableOpacity onPress={goToDirectory} style={styles.item} onLongPress={openMenu}>
      <View style={styles.container}>
        {item.type === "folder" ? <Entypo name="folder" size={24} color="#FF9A22" /> : <FontAwesome name="file" size={24} color="#6945f8" />}
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
    marginHorizontal: 10,
    marginVertical: 1,
    backgroundColor: "white",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "gray"

  },
  title: {
    fontSize: 20,
    marginLeft: 2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
