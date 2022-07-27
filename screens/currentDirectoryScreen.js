import React, { useContext, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Button,
} from "react-native";
import { PodsContext } from "../context/pods/context";
import { RenderDirectory } from "../components/renderDirectory";

export const CurrentDirectoryScreen = ({ navigation }) => {
  const { currentListFiles, activePod, getDerectoryList } = useContext(PodsContext);
  useEffect(() => {
    navigation.setOptions({
      title: activePod ? activePod.title :  "",
    });
    getDerectoryList(activePod?.title, getDirectory())
  }, [activePod]);

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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={currentListFiles}
        renderItem={({ item }) => (
          <RenderDirectory navigation={navigation} item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
      <Button color="#20B954" title="Sign in" onPress={getDirectory} />
    </SafeAreaView>
  );
};

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
