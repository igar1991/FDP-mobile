import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator
} from "react-native";
import { PodsContext } from "../context/pods/context";
import { RenderDirectory } from "../components/renderDirectory";
import { CircleButton } from "../components/circleButton";
import { ModalWrapper } from "../components/modalWrapper";
import { IconButton } from "../components/iconButton";
import { FontAwesome5 } from "@expo/vector-icons";
import { ModalLittleWrapper } from "../components/modalLittleWrapper";
import { MainButton } from "../components/mainButton";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from 'expo-file-system';

export const CurrentDirectoryScreen = ({ navigation }) => {
  const {
    currentListFiles,
    activePod,
    getDerectoryList,
    createFolder,
    activFolderFile,
    deleteFolder,
    deleteFile,
    statusUpdateItem,
    uploadFile,
    openFile
  } = useContext(PodsContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modaLittlelVisible, setModalLittleVisible] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [modalMenu, setModalMenu] = useState(false);

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
  const buttonClickedHandlerMenu = (ismodal) => {
    setModalMenu(ismodal);
  };

  const createCurrentFolder = (pod, name) => {
    const currentDirectory = getDirectory();
    createFolder(pod, currentDirectory, name);
    setModalLittleVisible(false);
    setFolderName("");
  };

  const deleteCurrentFolderFile = (pod, item) => {
    const currentDirectory = getDirectory();
    if (item.type === "folder") {
      deleteFolder(pod, currentDirectory, item);
    } else {
      deleteFile(pod, currentDirectory, item);
    }
    setModalMenu(false);
  };

  const openFolderFile = async (pod, item) => {
    const currentDirectory = getDirectory();
    if(item.type === "folder") {
      navigation.push("Directory");
    } else {
      openFile(pod, currentDirectory,item.title)
    }
    setModalMenu(false);

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

  const uploadCurrentFile = useCallback(async (pod) => {
    try {
      const currentDirectory = getDirectory();
      const response = await DocumentPicker.getDocumentAsync();
      const resBase64 = await FileSystem.readAsStringAsync(response.uri, {encoding: FileSystem.EncodingType.Base64});
        // const cUti = await FileSystem.getContentUriAsync(response)
        // console.log(cUti)
        // const res = startActivityAsync('android.intent.action.VIEW', {
        //   data: cUti,
        //   flags: 1,
        // })
        setModalVisible(false);
        uploadFile(pod, currentDirectory, resBase64);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {currentListFiles.length !== 0 ? (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={currentListFiles}
            renderItem={({ item }) => (
              <RenderDirectory
                navigation={navigation}
                item={item}
                buttonClickedHandler={buttonClickedHandlerMenu}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      ) : (
        <View style={styles.containerCleen}>
          {statusUpdateItem === "pending" ? (
            <ActivityIndicator size="large" color="#6945f8" />
          ) : (<><FontAwesome5 name="folder-plus" size={100} color="#FF9A22" />
          <Text style={{ marginTop: 10, fontSize: 20 }}>Nothing yet.</Text></>)}
          
        </View>
      )}
      <CircleButton buttonClickedHandler={() => buttonClickedHandler(true)} />
      <ModalWrapper
        modalVisible={modalVisible}
        buttonClickedHandler={buttonClickedHandler}
      >
        <IconButton
          onPress={() => buttonClickedHandlerLittle(true)}
          title={"Create folder"}
        >
          <FontAwesome5 name="folder-plus" size={28} color="#FF9A22" />
        </IconButton>
        <IconButton onPress={()=>uploadCurrentFile(activePod)} title={"Upload file"}>
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
          onPress={() => createCurrentFolder(activePod, folderName)}
        />
      </ModalLittleWrapper>
      <ModalWrapper
        modalVisible={modalMenu}
        buttonClickedHandler={buttonClickedHandlerMenu}
      >
        <IconButton
          onPress={() => openFolderFile(activePod, activFolderFile)}
          title={"Open"}
        >
          <Ionicons name="ios-open-outline" size={28} color="#20B954" />
        </IconButton>
        <IconButton
          onPress={() => deleteCurrentFolderFile(activePod, activFolderFile)}
          title={"Delete"}
        >
          <MaterialIcons name="delete-outline" size={30} color="#ad535f" />
        </IconButton>
      </ModalWrapper>
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
  containerCleen: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});
