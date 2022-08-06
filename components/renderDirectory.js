import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { PodsContext } from "../context/pods/context";

export const RenderDirectory = ({ item, navigation, buttonClickedHandler }) => {
  const { chooseFolderFile } = useContext(PodsContext);

  const goToDirectory = () => {
    if (!item.reference) {
      navigation.push("Directory", { dir: item.name });
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    chooseFolderFile(item);
    buttonClickedHandler(true);
  };

  const shortNameFile = (name) => {
    if (name.length < 20) return name;
    const arr = name.split("");
    return `${arr.slice(0, 8).join("")}...${arr.slice(-8).join("")}`;
  };

  return (
    <TouchableOpacity
      onPress={goToDirectory}
      style={styles.item}
      onLongPress={openMenu}
    >
      <View style={styles.container}>
        {!item.reference ? (
          <Entypo name="folder" size={24} color="#FF9A22" />
        ) : (
          <FontAwesome name="file" size={24} color="#6945f8" />
        )}
        <Text style={styles.title}>{shortNameFile(item.name)}</Text>
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
    borderColor: "gray",
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
