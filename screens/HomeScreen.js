import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { RenderPods } from "../components/renderPods";
import { PodsContext } from "../context/pods/context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CircleButton } from "../components/circleButton";
import { ModalWrapper } from "../components/modalWrapper";

export function HomeScreen({ navigation }) {
  const { getListPods, podsList } = useContext(PodsContext);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getListPods();
  }, []);

  const buttonClickedHandler = (ismodal)=>{
    setModalVisible(ismodal)
  }

  return (
    <>
      {podsList.length !== 0 && (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={podsList}
            renderItem={({ item }) => (
              <RenderPods navigation={navigation} item={item} buttonClickedHandler={buttonClickedHandler} />
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
      <CircleButton buttonClickedHandler={buttonClickedHandler}/>
      <ModalWrapper modalVisible={modalVisible} buttonClickedHandler={buttonClickedHandler} />
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
});
