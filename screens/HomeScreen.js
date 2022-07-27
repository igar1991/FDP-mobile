import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { RenderPods } from "../components/renderPods";
import { PodsContext } from "../context/pods/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CircleButton } from "../components/circleButton";
import { ModalWrapper } from "../components/modalWrapper";
import { ModalLittleWrapper } from "../components/modalLittleWrapper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MainButton } from "../components/mainButton";

export function HomeScreen({ navigation }) {
  const { getListPods, podsList, inPod, activePod, deletePod, createPod } =
    useContext(PodsContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [modaLittlelVisible, setModalLittleVisible] = useState(false);
  const [newPodName, setNewPodName] = useState("");

  useEffect(() => {
    getListPods();
  }, []);

  const buttonClickedHandler = (ismodal) => {
    setModalVisible(ismodal);
  };

  const buttonClickedHandlerLittle = (ismodal) => {
    setModalLittleVisible(ismodal);
  };

  const openPod = (pod) => {
    setModalVisible(false);
    inPod(pod);
    navigation.push("Directory");
  };

  const deleteCurrentPod = (pod) => {
    setModalVisible(false);
    deletePod(pod);
  };

  const createCurrentPod = (title)=>{
    setModalLittleVisible(false);
    createPod(title);
    setNewPodName("");
  }
  
  return (
    <>
      {podsList.length !== 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={podsList}
            renderItem={({ item }) => (
              <RenderPods
                navigation={navigation}
                item={item}
                buttonClickedHandler={buttonClickedHandler}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      {podsList.length === 0 && (
        <View style={styles.containerCleen}>
          <MaterialCommunityIcons
            name="harddisk-remove"
            size={100}
            color="#6945f8"
          />
          <Text style={{ marginTop: 10, fontSize: 20 }}>
            You don't have any pods yet.
          </Text>
          <Text style={{ marginTop: 10, fontSize: 18 }}>
            Please create a pod for uploading files.
          </Text>
        </View>
      )}
      <CircleButton buttonClickedHandler={buttonClickedHandlerLittle} />

      <ModalWrapper
        modalVisible={modalVisible}
        buttonClickedHandler={buttonClickedHandler}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <View style={styles.containercircleButton}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => openPod(activePod)}
            >
              <Ionicons name="ios-open-outline" size={28} color="#20B954" />
            </TouchableOpacity>
            <Text>Open pod</Text>
          </View>
          <View style={styles.containercircleButton}>
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => deleteCurrentPod(activePod)}
            >
              <MaterialIcons name="delete-outline" size={30} color="#ad535f" />
            </TouchableOpacity>
            <Text>Delete pod</Text>
          </View>
        </View>
      </ModalWrapper>

      <ModalLittleWrapper
        modalVisible={modaLittlelVisible}
        buttonClickedHandler={buttonClickedHandlerLittle}
      >
        <View
          style={{
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Create new pod
          </Text>
          <View style={styles.hairline} />
          <TextInput
            style={styles.input}
            placeholder="My new pod"
            value={newPodName}
            onChangeText={setNewPodName}
          />
          <MainButton
            title="Create"
            backgroundColor={{ backgroundColor: "#20B954" }}
            onPress={() => createCurrentPod(newPodName)}
          />
        </View>
      </ModalLittleWrapper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
  circleButton: {
    borderColor: "gray",
    borderRadius: 100,
    borderWidth: 1,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  containercircleButton: {
    justifyContent: "center",
    alignItems: "center",
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
