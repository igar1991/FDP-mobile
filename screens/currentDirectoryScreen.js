import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput } from "react-native";
import { PodsContext } from "../context/pods/context";
import { RenderDirectory } from "../components/renderDirectory";
import { CircleButton } from "../components/circleButton";
import { ModalWrapper } from "../components/modalWrapper";
import { IconButton } from "../components/iconButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { ModalLittleWrapper } from "../components/modalLittleWrapper";
import { MainButton } from "../components/mainButton";

export const CurrentDirectoryScreen = ({ navigation }) => {
  const {
    currentListFiles,
    activePod,
    getDerectoryList,
    createFolder,
    deleteCurrentPod,
  } = useContext(PodsContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modaLittlelVisible, setModalLittleVisible] = useState(false);
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    navigation.setOptions({
      title: activePod ? activePod.title : "",
    });
    getDerectoryList(activePod?.title, getDirectory());
  }, [activePod]);

  const buttonClickedHandler = (ismodal) => {
    setModalVisible(ismodal);
  };
  const buttonClickedHandlerLittle = (ismodal) => {
    setModalLittleVisible(ismodal);
    setModalVisible(false);
  };

  const createCurrentFolder = (pod, name) => {
    const currentDirectory = getDirectory();
    createFolder(pod, currentDirectory, name);
    setModalLittleVisible(false);
    setFolderName("");
  };

  const getDirectory = () => {
    let root = [];
    const arrRoute = navigation.getState().routes;
    arrRoute.forEach((element) => {
      if (element.params?.dir) {
        root.push(element.params.dir);
      }
    });
    return root.length === 0 ? "/" : root.join("/");
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={currentListFiles}
          renderItem={({ item }) => (
            <RenderDirectory navigation={navigation} item={item} />
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <CircleButton buttonClickedHandler={() => buttonClickedHandler(true)} />
      <ModalWrapper
        modalVisible={modalVisible}
        buttonClickedHandler={buttonClickedHandler}
      >
        <IconButton onPress={() => buttonClickedHandlerLittle(true)} title={"Create folder"}>
          <FontAwesome5 name="folder-plus" size={28} color="#FF9A22" />
        </IconButton>
        <IconButton
          onPress={() => deleteCurrentPod(activePod)}
          title={"Upload file"}
        >
          <FontAwesome5 name="file-upload" size={28} color="#6945f8" />
        </IconButton>
      </ModalWrapper>
      <ModalLittleWrapper
        modalVisible={modaLittlelVisible}
        buttonClickedHandler={buttonClickedHandlerLittle}
      >
        <Text
          style={{
            fontSize: 18,
          }}
        >
          Create new folder
        </Text>
        <View style={styles.hairline} />
        <TextInput
          style={styles.input}
          placeholder="My new folder"
          value={folderName}
          onChangeText={setFolderName}
        />
        <MainButton
          title="Create"
          backgroundColor={{ backgroundColor: "#20B954" }}
          onPress={() => createCurrentFolder(activePod, folderName )}
        />
      </ModalLittleWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  containerCleen: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
  },
  hairline: {
    backgroundColor: "#000",
    height: 1,
    width: "100%",
    marginTop: 10,
  },
});
